import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { TOOLS, CLIENT_TOOL_NAMES, runServerTool } from "./tools.js";
import { SYSTEM_PROMPT } from "./context.js";

const ddb = new DynamoDBClient({});
const RATE_LIMIT_TABLE = process.env.RATE_LIMIT_TABLE || "portfolio-chatbot-ratelimit";
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 20);
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOOL_ITERATIONS = 4;

const JSON_HEADERS = { "content-type": "application/json" };

// CORS preflight: this route is explicit (not the $default catch-all the
// contact-metric Lambda sits on), so API Gateway's own CORS config should
// answer OPTIONS before it ever reaches this handler. Kept as a defensive
// short-circuit anyway — cheap, and matches the sibling Lambda's pattern in
// case an explicit OPTIONS route ever gets added.
export const handler = async (event) => {
  const method = event.requestContext?.http?.method;
  if (method === "OPTIONS") {
    return { statusCode: 204, body: "" };
  }

  const sourceIp = event.requestContext?.http?.sourceIp;
  if (await isRateLimited(sourceIp)) {
    return {
      statusCode: 429,
      headers: JSON_HEADERS,
      body: JSON.stringify(
        textResponse(
          "I'm getting a lot of messages right now — please try again in a bit, or use the contact form below.",
        ),
      ),
    };
  }

  let messages;
  try {
    const body = JSON.parse(event.body || "{}");
    messages = Array.isArray(body.messages) ? body.messages : null;
  } catch {
    messages = null;
  }

  if (!messages || messages.length === 0) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: "messages required" }) };
  }

  try {
    const result = await converse(messages);
    logConversation(messages, result);
    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify(result) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify(
        textResponse("Something went wrong on my end — try again, or reach out through the contact form below."),
      ),
    };
  }
};

function textResponse(text) {
  return { status: "done", assistantMessage: { role: "assistant", content: [{ type: "text", text }] } };
}

// Kept in CloudWatch Logs rather than sent to GA4 — this is real visitor
// free-text (possibly including a name), so it stays inside our own AWS
// account instead of being shipped to a third party. Queryable via Logs
// Insights: filter @message like /^conversation/. Full answer text, no
// truncation — traffic volume here means the log cost is negligible, and a
// cut-off mid-sentence answer defeats the point of being able to read it.
function logConversation(messages, result) {
  const lastUserText = [...messages]
    .reverse()
    .find((m) => m.role === "user" && m.content.some((b) => b.type === "text"))
    ?.content.find((b) => b.type === "text")?.text;

  if (!lastUserText) return; // e.g. a tool_result-only turn, not a real question

  const answerText = (result.assistantMessage.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  console.log("conversation", JSON.stringify({ question: lastUserText, answer: answerText }));
}

async function converse(messages) {
  let history = messages;

  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    const response = await callAnthropic(history);

    if (response.stop_reason !== "tool_use") {
      return { status: "done", assistantMessage: { role: "assistant", content: response.content } };
    }

    const toolUseBlocks = response.content.filter((block) => block.type === "tool_use");
    const clientToolBlock = toolUseBlocks.find((block) => CLIENT_TOOL_NAMES.has(block.name));

    if (clientToolBlock) {
      return {
        status: "needs_client_action",
        assistantMessage: { role: "assistant", content: response.content },
        action: { name: clientToolBlock.name, input: clientToolBlock.input, toolUseId: clientToolBlock.id },
      };
    }

    // Every tool_use block in this turn is a server tool — resolve them
    // locally and loop back to let Claude continue with the results.
    const toolResults = toolUseBlocks.map((block) => ({
      type: "tool_result",
      tool_use_id: block.id,
      content: String(runServerTool(block.name, block.input)),
    }));

    history = [...history, { role: "assistant", content: response.content }, { role: "user", content: toolResults }];
  }

  return textResponse("I couldn't pull that up right now — try asking differently, or use the contact form below.");
}

async function callAnthropic(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      tools: TOOLS,
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  }

  const body = await res.json();
  // Cheap cost visibility: cache_read_input_tokens > 0 confirms prompt
  // caching is actually paying off, not silently no-op'ing.
  console.log("usage", JSON.stringify(body.usage));
  return body;
}

// Fixed-window limiter: one DynamoDB item per (ip, hour-bucket), TTL'd to
// expire an hour after creation. Known limitation: a visitor can send up to
// RATE_LIMIT_MAX requests right at the end of one window and again right at
// the start of the next — acceptable at portfolio scale, where the
// Anthropic Console spend cap is the real backstop, not this counter.
async function isRateLimited(ip) {
  if (!ip) return false; // fail open rather than block legitimate traffic if sourceIp is ever missing

  const hourBucket = Math.floor(Date.now() / 3_600_000);
  const rateKey = `${ip}#${hourBucket}`;
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;

  const result = await ddb.send(
    new UpdateItemCommand({
      TableName: RATE_LIMIT_TABLE,
      Key: { ip: { S: rateKey } },
      UpdateExpression: "ADD #count :incr SET #ttl = if_not_exists(#ttl, :expiresAt)",
      ExpressionAttributeNames: { "#count": "count", "#ttl": "ttl" },
      ExpressionAttributeValues: { ":incr": { N: "1" }, ":expiresAt": { N: String(expiresAt) } },
      ReturnValues: "UPDATED_NEW",
    }),
  );

  const count = Number(result.Attributes?.count?.N || "0");
  return count > RATE_LIMIT_MAX;
}

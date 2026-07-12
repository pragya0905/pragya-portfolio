import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

const cloudwatch = new CloudWatchClient({});

// CORS is handled by API Gateway's own CORS config, not here — adding
// headers in both places causes duplicate Access-Control-Allow-Origin
// headers, which browsers reject. The preflight OPTIONS request still
// reaches this handler on the $default catch-all route, so it must be
// short-circuited with a 2xx before the body-parsing logic below, or
// real browsers will abort the actual POST (CORS spec requires a 2xx
// preflight response, not just the right headers).
export const handler = async (event) => {
  const method = event.requestContext?.http?.method;
  if (method === "OPTIONS") {
    return { statusCode: 204, body: "" };
  }

  let status;
  try {
    const body = JSON.parse(event.body || "{}");
    status = body.status === "success" ? "success" : body.status === "error" ? "error" : null;
  } catch {
    status = null;
  }

  if (!status) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "invalid status" }) };
  }

  await cloudwatch.send(
    new PutMetricDataCommand({
      Namespace: "Portfolio/ContactForm",
      MetricData: [
        {
          MetricName: "ContactFormSubmission",
          Dimensions: [{ Name: "Status", Value: status }],
          Value: 1,
          Unit: "Count",
        },
      ],
    }),
  );

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};

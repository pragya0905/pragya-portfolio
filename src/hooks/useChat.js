import { useCallback, useRef, useState } from "react";
import { CHATBOT_API_URL, SOCIAL_LINKS } from "../data/content";
import { matchFaq, QUESTION_CATEGORIES, ESCALATION_PATTERN } from "../data/chatbotFaq";
import { trackEvent } from "../lib/analytics";

const MAX_CLIENT_ACTION_ROUNDTRIPS = 4;

// Best-effort client-side signal that Claude couldn't really answer —
// mirrors the system prompt's own instruction to admit it doesn't know
// rather than guessing. Verified against real replies rather than assumed:
// Claude paraphrases the "suggest the contact form" part freely, so
// requiring that exact phrase missed real fallbacks in testing — this
// matches on the admission-of-gap phrasing instead, which showed up
// consistently. Not exhaustive (a model reply is free text), just a
// useful proxy for "how often are we coming up short," not a hard classifier.
const FALLBACK_PATTERN =
  /\b(i don't have (that|this|those) (information|details)|not something i have|not documented|i'm not (sure|certain)|i don't know)\b/i;

// Client-side tools the backend can hand control back for — see
// lambda/chatbot/tools.js's CLIENT_TOOL_NAMES for the server-side half of
// this contract. Names/shapes must stay in sync across both.
const CLIENT_ACTIONS = {
  scroll_to_section: ({ section } = {}) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  download_resume: () => {
    if (!SOCIAL_LINKS.resumeUrl) return;
    trackEvent("resume_download");
    const link = document.createElement("a");
    link.href = SOCIAL_LINKS.resumeUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};

function textOf(content) {
  return content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

// FAQ matches answer instantly client-side and never reach the Lambda, so
// without this, "what are people asking" logs only ever captured
// Claude-backed exchanges. Reuses the same /chat endpoint just to write the
// log line — the Lambda skips Claude and the rate limiter entirely for
// logOnly requests. Fire-and-forget, matching the contact-form metric's
// pattern: a logging hiccup should never affect the UX the visitor already saw.
function logFaqConversation(question, answer) {
  fetch(CHATBOT_API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ logOnly: true, question, answer }),
  }).catch(() => {});
}

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  // Full Anthropic-format history sent to the backend each call. Kept in a
  // ref (not state) since it updates multiple times within one async flow
  // and doesn't need to trigger renders itself — `messages` does that.
  // NOTE: can't seed this with the static greeting bubble as an assistant
  // turn — the Anthropic API requires the first message in the array to
  // have role "user", so an assistant-first seed would 400 on every single
  // request. The greeting is display-only; see context.js's system prompt
  // for how the backend handles a visitor replying with a bare name.
  const historyRef = useRef([]);

  const appendDisplay = useCallback((role, text) => {
    if (!text) return;
    setMessages((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, role, text }]);
  }, []);

  const runClientAction = useCallback((action) => {
    CLIENT_ACTIONS[action.name]?.(action.input);
  }, []);

  const continueConversation = useCallback(async () => {
    setPending(true);
    try {
      for (let i = 0; i < MAX_CLIENT_ACTION_ROUNDTRIPS; i++) {
        const res = await fetch(CHATBOT_API_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: historyRef.current }),
        });
        const data = await res.json();

        historyRef.current = [...historyRef.current, data.assistantMessage];
        const replyText = textOf(data.assistantMessage.content);
        appendDisplay("assistant", replyText);
        if (FALLBACK_PATTERN.test(replyText)) trackEvent("chatbot_fallback");

        if (data.status !== "needs_client_action") break;

        runClientAction(data.action);
        historyRef.current = [
          ...historyRef.current,
          {
            role: "user",
            content: [{ type: "tool_result", tool_use_id: data.action.toolUseId, content: "done" }],
          },
        ];
        // loop again so Claude can finish responding after the action runs
      }
    } catch (err) {
      trackEvent("chatbot_error", { message: err?.message || "unknown" });
      appendDisplay("assistant", "Something went wrong — please try again, or use the contact form below.");
    } finally {
      setPending(false);
    }
  }, [appendDisplay, runClientAction]);

  const sendMessage = useCallback(
    (text, source = "typed") => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;

      if (source === "quick_reply") {
        trackEvent("chatbot_quick_reply", {
          button_text: trimmed,
          category: QUESTION_CATEGORIES[trimmed] || "other",
        });
      } else {
        trackEvent("pj_message_sent", { message_length: trimmed.length });
      }
      if (ESCALATION_PATTERN.test(trimmed)) {
        trackEvent("chatbot_escalation", { total_messages_before_escalation: messages.length });
      }

      appendDisplay("user", trimmed);
      historyRef.current = [...historyRef.current, { role: "user", content: [{ type: "text", text: trimmed }] }];

      const faq = matchFaq(trimmed);
      if (faq) {
        appendDisplay("assistant", faq.text);
        historyRef.current = [
          ...historyRef.current,
          { role: "assistant", content: [{ type: "text", text: faq.text }] },
        ];
        if (faq.action) runClientAction(faq.action);
        logFaqConversation(trimmed, faq.text);
        return;
      }

      continueConversation();
    },
    [appendDisplay, continueConversation, messages.length, pending, runClientAction],
  );

  return { messages, pending, sendMessage };
}

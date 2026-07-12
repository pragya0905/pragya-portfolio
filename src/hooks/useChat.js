import { useCallback, useRef, useState } from "react";
import { CHATBOT_API_URL, SOCIAL_LINKS } from "../data/content";
import { matchFaq } from "../data/chatbotFaq";
import { trackEvent } from "../lib/analytics";

const MAX_CLIENT_ACTION_ROUNDTRIPS = 4;

// Client-side tools the backend can hand control back for — see
// lambda/chatbot/tools.js's CLIENT_TOOL_NAMES for the server-side half of
// this contract. Names/shapes must stay in sync across both.
const CLIENT_ACTIONS = {
  scroll_to_section: ({ section } = {}) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  download_resume: () => {
    if (!SOCIAL_LINKS.resumeUrl) return;
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
        appendDisplay("assistant", textOf(data.assistantMessage.content));

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
    } catch {
      appendDisplay("assistant", "Something went wrong — please try again, or use the contact form below.");
    } finally {
      setPending(false);
    }
  }, [appendDisplay, runClientAction]);

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;

      trackEvent("chatbot_message_sent");
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
        return;
      }

      continueConversation();
    },
    [appendDisplay, continueConversation, pending, runClientAction],
  );

  return { messages, pending, sendMessage };
}

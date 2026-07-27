// Cheap, instant pattern-matching layer checked before anything touches the
// backend/Claude — catches the highest-volume predictable questions for
// free, with zero latency. Anything that doesn't match falls through to
// useChat's backend call.
// Shared with ChatWidget.jsx's static pre-interaction greeting bubble, so
// the two can't drift out of sync with each other again.
export const GREETING_TEXT =
  "Hi! 👋 I'm PJ, Pragya's AI assistant. I can tell you about:\n- Her projects & experience\n- Tech stack & skills\n- How to work together\n\nWhat would you like to know?";

// Shown as clickable pills before the visitor sends their first message —
// gives a concrete starting point instead of a blank "ask me anything."
// Hidden as soon as the conversation actually starts.
export const SUGGESTED_QUESTIONS = [
  "Tell me about her projects",
  "What's her tech stack?",
  "How do I get her resume?",
  "What's she working on now?",
  "How can I get in touch?",
];

const ENTRIES = [
  {
    test: (text) => /\b(resume|cv)\b/i.test(text),
    respond: () => ({
      text: "Here you go — downloading her resume now.",
      action: { name: "download_resume", input: {} },
    }),
  },
  {
    test: (text) => /\b(tech ?stack|technologies|what (does|do) she (use|work with))\b/i.test(text),
    respond: () => ({
      text: "She works across the full stack: React/TypeScript/Tailwind on the frontend, Java/Python/Node on the backend, and AWS (Lambda, S3, CloudFront, DynamoDB, CloudWatch) for cloud infra. Scrolling you to the full list.",
      action: { name: "scroll_to_section", input: { section: "skills" } },
    }),
  },
];

export function matchFaq(text) {
  for (const entry of ENTRIES) {
    if (entry.test(text)) return entry.respond();
  }
  return null;
}

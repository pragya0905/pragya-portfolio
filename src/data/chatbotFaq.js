// Cheap, instant pattern-matching layer checked before anything touches the
// backend/Claude — catches the highest-volume predictable questions for
// free, with zero latency. Anything that doesn't match falls through to
// useChat's backend call.
// Shared with ChatWidget.jsx's static pre-interaction greeting bubble, so
// the two can't drift out of sync with each other again.
export const GREETING_TEXT = "Hey! I'm PJ 👋 — here to help you get to know Pragya a bit better. What's your name?";

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

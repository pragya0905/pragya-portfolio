import clsx from "clsx";

export function ChatMessage({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
      <p
        className={clsx(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-accent/15 text-ink [[data-theme=light]_&]:!bg-[#0891b2] [[data-theme=light]_&]:!text-white"
            : "border border-line bg-surface/60 text-ink",
        )}
      >
        {text}
      </p>
    </div>
  );
}

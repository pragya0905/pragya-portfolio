import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import clsx from "clsx";
import { useChat } from "../../hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { GREETING_TEXT } from "../../data/chatbotFaq";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, pending, sendMessage } = useChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={clsx(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
          "border border-accent/30 bg-canvas text-accent shadow-[0_0_24px_-6px_var(--color-glow)]",
          "[[data-theme=light]_&]:!border-transparent [[data-theme=light]_&]:!bg-[#0891b2] [[data-theme=light]_&]:!text-white",
          "transition-transform duration-300 hover:scale-105 active:scale-95",
        )}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-line bg-canvas shadow-2xl">
          <div className="border-b border-line px-4 py-3">
            <p className="text-sm font-bold text-ink">Ask about Pragya</p>
            <p className="text-xs text-muted">Usually replies instantly</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <ChatMessage role="assistant" text={GREETING_TEXT} />
            {messages.map((message) => (
              <ChatMessage key={message.id} role={message.role} text={message.text} />
            ))}
            {pending && (
              <div className="flex justify-start">
                <p className="rounded-2xl border border-line bg-surface/60 px-4 py-2.5 text-sm text-muted">
                  Thinking…
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-line p-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              className="w-full rounded-lg border border-line bg-surface/60 px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent disabled:opacity-40 [[data-theme=light]_&]:!bg-[#0891b2] [[data-theme=light]_&]:!text-white"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

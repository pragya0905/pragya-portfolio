import clsx from "clsx";

// Small hand-rolled renderer instead of a markdown library: Claude's replies
// only ever use bold, inline code, links, and lists, so a full parser/AST
// would be bundle weight for formatting this project already covers.
function renderInline(text, keyPrefix) {
  const parts = [];
  const pattern = /(\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    if (match[2] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-${i++}`}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      parts.push(
        <code
          key={`${keyPrefix}-${i++}`}
          className="rounded bg-canvas/60 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {match[3]}
        </code>,
      );
    } else if (match[4] !== undefined) {
      parts.push(
        <a
          key={`${keyPrefix}-${i++}`}
          href={match[5]}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          {match[4]}
        </a>,
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function renderMarkdown(text) {
  const lines = text.split("\n");
  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (const line of lines) {
    const bulletMatch = /^[-*]\s+(.*)/.exec(line);
    const numberedMatch = /^\d+\.\s+(.*)/.exec(line);

    if (bulletMatch || numberedMatch) {
      const itemText = (bulletMatch || numberedMatch)[1];
      const type = bulletMatch ? "ul" : "ol";
      if (!currentList || currentList.type !== type) {
        flushList();
        currentList = { type, items: [] };
      }
      currentList.items.push(itemText);
    } else {
      flushList();
      if (line.trim() !== "") blocks.push({ type: "p", text: line });
    }
  }
  flushList();

  return blocks.map((block, i) => {
    if (block.type === "ul" || block.type === "ol") {
      const Tag = block.type;
      return (
        <Tag key={i} className={clsx("my-1 space-y-1 pl-5", block.type === "ul" ? "list-disc" : "list-decimal")}>
          {block.items.map((item, j) => (
            <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={i} className={i > 0 ? "mt-2" : undefined}>
        {renderInline(block.text, `${i}`)}
      </p>
    );
  });
}

export function ChatMessage({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "whitespace-pre-wrap bg-accent/15 text-ink [[data-theme=light]_&]:!bg-[#0891b2] [[data-theme=light]_&]:!text-white"
            : "border border-line bg-surface/60 text-ink",
        )}
      >
        {isUser ? text : renderMarkdown(text)}
      </div>
    </div>
  );
}

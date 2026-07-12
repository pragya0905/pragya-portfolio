export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent-dim px-3 py-1 font-mono text-xs text-accent">
      {children}
    </span>
  );
}

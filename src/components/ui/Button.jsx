import clsx from "clsx";

const VARIANTS = {
  primary:
    "bg-accent text-canvas hover:bg-accent/90 border border-accent",
  secondary:
    "bg-transparent text-ink border border-line hover:border-accent/50 hover:text-accent",
};

export function Button({ as: As = "a", variant = "primary", className, children, ...props }) {
  return (
    <As
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </As>
  );
}

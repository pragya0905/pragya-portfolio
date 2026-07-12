import clsx from "clsx";

const VARIANTS = {
  primary: clsx(
    "border border-accent/30 text-ink [background-image:linear-gradient(to_right,#0e7490,var(--color-accent))]",
    "[[data-theme=light]_&]:!border-transparent [[data-theme=light]_&]:!bg-[#0891b2] [[data-theme=light]_&]:![background-image:none] [[data-theme=light]_&]:!text-white [[data-theme=light]_&]:!shadow-[0_4px_16px_rgba(30,58,95,0.15)]",
    "hover:border-accent hover:scale-[1.04] hover:brightness-110 hover:shadow-[0_0_24px_-6px_var(--color-glow)] [[data-theme=light]_&]:hover:!shadow-[0_6px_20px_rgba(30,58,95,0.2)]",
    "active:scale-[0.97] active:brightness-95",
  ),
  secondary: clsx(
    "border border-accent/20 bg-ink/5 text-ink backdrop-blur-md",
    "[[data-theme=light]_&]:!border-[#0891b2] [[data-theme=light]_&]:!bg-white [[data-theme=light]_&]:!text-[#0891b2]",
    "hover:border-accent/70 hover:bg-accent/10 hover:text-accent hover:scale-[1.04] hover:shadow-[0_0_20px_-8px_var(--color-glow)]",
    "active:scale-[0.97]",
  ),
};

export function Button({ as: As = "a", variant = "primary", className, children, ...props }) {
  return (
    <As
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wide",
        "transition-[background-color,color,border-color,scale,box-shadow,filter] duration-300 ease-out",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        "disabled:pointer-events-none disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:brightness-100",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </As>
  );
}

import { SKILL_ICONS, SKILL_SHORT_LABELS } from "../../data/skillIcons";

export function SkillIconCard({ label }) {
  const entry = SKILL_ICONS[label];
  const Icon = entry?.icon;
  const shortLabel = SKILL_SHORT_LABELS[label];

  return (
    <div
      tabIndex={shortLabel ? 0 : undefined}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-surface/60 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_24px_-8px_var(--color-glow)] focus-visible:-translate-y-1 focus-visible:border-accent focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {Icon && <Icon className="h-10 w-10" style={{ color: entry.color }} aria-hidden="true" />}
      <span className="text-sm font-medium text-ink">{shortLabel ?? label}</span>

      {shortLabel && (
        <div
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-56 -translate-x-1/2 rounded-lg border border-accent/30 bg-surface px-3 py-2 text-xs text-ink opacity-0 shadow-[0_8px_24px_-8px_var(--color-shadow)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </div>
      )}
    </div>
  );
}

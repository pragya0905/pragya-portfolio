import { Briefcase, GraduationCap } from "lucide-react";

export function TimelineItem({ type, role, company, location, dates, summary }) {
  const Icon = type === "education" ? GraduationCap : Briefcase;

  return (
    <li className="relative border-l border-line pl-6">
      <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-line bg-canvas">
        <Icon className="h-2.5 w-2.5 text-accent" aria-hidden="true" />
      </span>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold text-ink">{role}</h3>
        <span className="font-mono text-xs text-muted">{dates}</span>
      </div>
      <p className="text-sm text-muted">
        {company}
        {location ? ` · ${location}` : ""}
      </p>
      <p className="mt-1 text-sm text-muted/90">{summary}</p>
    </li>
  );
}

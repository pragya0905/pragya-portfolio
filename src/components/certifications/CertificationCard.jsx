import { BadgeCheck } from "lucide-react";

export function CertificationCard({ name, issuer, date }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-start gap-4">
        <BadgeCheck className="h-8 w-8 shrink-0 text-accent" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-ink">{name}</h3>
          <p className="text-sm text-muted">{issuer}</p>
          <p className="mt-1 font-mono text-xs text-faint">{date}</p>
        </div>
      </div>
    </div>
  );
}

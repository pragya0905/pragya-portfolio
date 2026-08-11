import { BadgeCheck, ExternalLink } from "lucide-react";

export function CertificationCard({ name, issuer, date, url }) {
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

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 self-start pl-12 text-sm text-accent hover:text-ink"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Verify
        </a>
      ) : (
        <p className="pl-12 text-sm text-faint">Verification link coming soon</p>
      )}
    </div>
  );
}

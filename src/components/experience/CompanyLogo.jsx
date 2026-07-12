export function CompanyLogo({ logoUrl, logoInitials, company }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-canvas font-mono text-xs font-semibold text-accent">
      {logoUrl ? (
        <img src={logoUrl} alt={`${company} logo`} className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden="true">{logoInitials}</span>
      )}
    </div>
  );
}

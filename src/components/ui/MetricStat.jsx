export function MetricStat({ value, label }) {
  return (
    <div className="shrink-0 text-left">
      <div className="font-mono text-2xl font-semibold text-accent">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

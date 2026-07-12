import { Tag } from "../ui/Tag";
import { MetricStat } from "../ui/MetricStat";

export function FeaturedRoleCard({ role, badge, company, location, dates, achievements, techStack }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-xl font-bold text-ink">{role}</h3>
            <span className="rounded-full border border-accent/20 bg-accent-dim px-3 py-0.5 font-mono text-xs text-accent">
              {badge}
            </span>
          </div>
          <p className="text-sm text-muted">
            {company} &middot; {location}
          </p>
        </div>
        <p className="font-mono text-sm text-faint">{dates}</p>
      </div>

      <ul className="space-y-6">
        {achievements.map((achievement) => (
          <li
            key={achievement.description}
            className="flex flex-col gap-3 border-t border-line pt-6 first:border-t-0 first:pt-0 md:flex-row md:items-center md:justify-between md:gap-6"
          >
            <p className="text-ink/90">{achievement.description}</p>
            <MetricStat value={achievement.metric.value} label={achievement.metric.label} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </div>
  );
}

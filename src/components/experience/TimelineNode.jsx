import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { CompanyLogo } from "./CompanyLogo";
import { MetricStat } from "../ui/MetricStat";
import { Tag } from "../ui/Tag";

export function TimelineNode({
  index,
  side,
  role,
  badge,
  company,
  logoInitials,
  logoUrl,
  location,
  dates,
  achievements,
  summary,
  techStack,
}) {
  const shouldReduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const isRight = side === "right";

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-0 z-10 -translate-x-1/2 lg:left-1/2"
      >
        <CompanyLogo logoUrl={logoUrl} logoInitials={logoInitials} company={company} />
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: isRight ? 32 : -32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
        className={clsx(
          "pl-16 lg:pl-0",
          isRight ? "lg:col-start-2 lg:pl-16" : "lg:col-start-1 lg:pr-16",
        )}
      >
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 -right-2 select-none font-mono text-8xl font-black leading-none text-ink/15 md:text-9xl"
          >
            {number}
          </span>

          <div className="relative mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-ink md:text-xl">{role}</h3>
                {badge && (
                  <span className="rounded-full border border-accent/20 bg-accent-dim px-3 py-0.5 font-mono text-xs text-accent">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted">
                {company} &middot; {location}
              </p>
            </div>
            <p className="font-mono text-sm text-faint">{dates}</p>
          </div>

          {achievements ? (
            <>
              <ul className="space-y-6">
                {achievements.map((achievement) => (
                  <li
                    key={achievement.description}
                    className="flex flex-col gap-3 border-t border-line pt-6 first:border-t-0 first:pt-0"
                  >
                    <p className="text-ink/90">{achievement.description}</p>
                    <MetricStat value={achievement.metric.value} label={achievement.metric.label} />
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">{summary}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

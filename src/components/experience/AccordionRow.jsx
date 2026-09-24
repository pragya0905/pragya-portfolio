import { useId, useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CompanyLogo } from "./CompanyLogo";
import { MetricStat } from "../ui/MetricStat";
import { Tag } from "../ui/Tag";
import { trackEvent } from "../../lib/analytics";

export function AccordionRow({
  isOpen,
  onToggle,
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
  const panelId = useId();
  const hasOpenedRef = useRef(false);

  const handleToggle = () => {
    if (!isOpen && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      trackEvent("experience_item_expanded", { company });
    }
    onToggle();
  };

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <CompanyLogo logoUrl={logoUrl} logoInitials={logoInitials} company={company} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-bold text-ink md:text-lg">{role}</h3>
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
        <p className="hidden shrink-0 font-mono text-sm text-faint sm:block">{dates}</p>
        <ChevronDown
          aria-hidden="true"
          className={clsx(
            "h-5 w-5 shrink-0 text-faint transition-transform duration-300 motion-reduce:transition-none",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <p className="pb-2 font-mono text-xs text-faint sm:hidden">{dates}</p>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-0 sm:pl-14">
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
        )}
      </AnimatePresence>
    </div>
  );
}

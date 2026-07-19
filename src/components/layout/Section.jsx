import { useEffect } from "react";
import clsx from "clsx";
import { useInView } from "../../hooks/useInView";
import { trackEvent } from "../../lib/analytics";

export function Section({ id, eyebrow, heading, highlight, children, className }) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) trackEvent("section_view", { section_id: id });
  }, [inView, id]);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={clsx("scroll-mt-24 py-16", className)}
    >
      <div
        ref={ref}
        className={clsx("mx-auto max-w-5xl px-6 reveal", inView && "is-visible")}
      >
        {(eyebrow || heading) && (
          <div className="mb-12">
            {eyebrow && (
              <p className="mb-2 font-mono text-sm text-accent">{eyebrow}</p>
            )}
            {heading && (
              <h2
                id={`${id}-heading`}
                className="text-3xl font-bold tracking-tight text-ink md:text-4xl"
              >
                {heading}
                {highlight && (
                  <>
                    {" - "}
                    <span className="accent-highlight">{highlight}</span>
                  </>
                )}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

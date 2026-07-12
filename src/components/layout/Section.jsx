import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export function Section({ id, eyebrow, heading, children, className }) {
  const [ref, inView] = useInView();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={clsx("scroll-mt-24 py-24", className)}
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
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

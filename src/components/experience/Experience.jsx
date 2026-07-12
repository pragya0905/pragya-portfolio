import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "../../data/content";
import { Section } from "../layout/Section";
import { TimelineNode } from "./TimelineNode";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const dot = dotRef.current;
    if (!container || !progress || !dot) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.style.height = "100%";
      dot.style.top = "100%";
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.5,
      onUpdate: (self) => {
        const pct = `${self.progress * 100}%`;
        progress.style.height = pct;
        dot.style.top = pct;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      heading="Engineering at Scale"
      highlight="Real Impact!"
    >
      <div ref={containerRef} className="relative">
        <div
          aria-hidden="true"
          className="absolute -translate-x-1/2 top-0 bottom-0 left-5 w-px bg-line lg:left-1/2"
        />
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute -translate-x-1/2 top-0 left-5 w-px bg-accent shadow-[0_0_12px_2px_var(--color-glow)] lg:left-1/2"
          style={{ height: 0 }}
        />
        <div
          ref={dotRef}
          aria-hidden="true"
          className="absolute left-5 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_4px_var(--color-glow)] lg:left-1/2"
        />

        <div className="space-y-16 md:space-y-24">
          {EXPERIENCE.map((item, index) => (
            <TimelineNode
              key={`${item.company}-${item.role}`}
              index={index}
              side={index % 2 === 0 ? "left" : "right"}
              {...item}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

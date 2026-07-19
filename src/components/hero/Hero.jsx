import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import clsx from "clsx";
import { PROFILE } from "../../data/content";
import { Button } from "../ui/Button";
import { FloatingSocialIcons } from "./FloatingSocialIcons";

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return mounted;
}

export function Hero() {
  const mounted = useMounted();

  const reveal = (delayClass) =>
    clsx(
      "transition-all duration-300 ease-out motion-reduce:transition-none",
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      delayClass,
    );

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[90vh] scroll-mt-24 items-center overflow-hidden"
    >
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-4 font-mono text-sm text-accent">{PROFILE.title}</p>
            <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl">
              {PROFILE.name}
            </h1>
          </div>

          <div className={clsx("max-w-xl", reveal("delay-[50ms]"))}>
            <span className="sr-only">{PROFILE.tagline}</span>
            <TypeAnimation
              aria-hidden="true"
              sequence={PROFILE.taglineSequence}
              wrapper="p"
              speed={55}
              deletionSpeed={65}
              repeat={Infinity}
              cursor
              className="min-h-[3.5rem] text-lg text-muted"
            />
            <p className="mt-4 flex items-center gap-2 text-sm text-faint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {PROFILE.location}
            </p>
          </div>

          <div className={clsx("flex flex-wrap gap-4", reveal("delay-[100ms]"))}>
            <Button as="a" href="#projects" variant="primary">
              View Work
            </Button>
            <Button as="a" href="#contact" variant="secondary">
              Get in Touch
            </Button>
          </div>

          <div className={reveal("delay-[150ms]")}>
            <FloatingSocialIcons />
          </div>
        </div>

        <div className={clsx("order-first lg:order-last", reveal("delay-[200ms]"))}>
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-accent/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-surface/30 p-4 shadow-[0_8px_32px_-12px_var(--color-shadow)] backdrop-blur-[10px] transition-transform duration-500 hover:scale-[1.02]">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-photo-bg)]">
                {PROFILE.photoUrl ? (
                  <>
                    <picture>
                      <source srcSet={PROFILE.photoUrl} type="image/webp" />
                      <img
                        src={PROFILE.photoUrl.replace(/\.webp$/, ".png")}
                        alt={PROFILE.name}
                        width={500}
                        height={500}
                        fetchPriority="high"
                        decoding="async"
                        className="h-full w-full object-contain saturate-[85%] contrast-105"
                      />
                    </picture>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-accent/10 mix-blend-soft-light"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-7xl font-bold text-accent/70">
                      {PROFILE.initials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

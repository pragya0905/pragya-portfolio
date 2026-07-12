import { MapPin } from "lucide-react";
import { PROFILE } from "../../data/content";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[90vh] scroll-mt-24 items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent opacity-20 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <p className="mb-4 font-mono text-sm text-accent">{PROFILE.title}</p>
        <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl">
          {PROFILE.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{PROFILE.tagline}</p>

        <p className="mt-4 flex items-center gap-2 text-sm text-faint">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {PROFILE.location}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button as="a" href="#projects" variant="primary">
            View Work
          </Button>
          <Button as="a" href="#contact" variant="secondary">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

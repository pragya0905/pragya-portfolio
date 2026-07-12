import { useMemo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../../hooks/useTheme";

const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Must be a stable reference — ParticlesProvider throws if `init` changes
// identity across renders, so this lives at module scope, not inside the
// component.
const initParticles = async (engine) => {
  await loadSlim(engine);
};

const PARTICLE_THEMES = {
  dark: {
    number: 60,
    colors: ["#22d3ee", "#67e8f9", "#0e7490"],
    opacity: { min: 0.1, max: 0.45 },
    size: { min: 1, max: 3 },
    linkColor: "#22d3ee",
    linkOpacity: 0.5,
    linkWidth: 1.2,
  },
  light: {
    number: 42,
    colors: ["#1e3a5f"],
    opacity: { min: 0.5, max: 0.8 },
    size: { min: 2.5, max: 3.5 },
    linkColor: "#1e3a5f",
    linkOpacity: 0.6,
    linkWidth: 1.8,
  },
};

export function ParticleBackground() {
  const { theme } = useTheme();
  const themeConfig = PARTICLE_THEMES[theme];

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: "transparent" },
      particles: {
        number: { value: themeConfig.number, density: { enable: true, width: 1440, height: 900 } },
        color: { value: themeConfig.colors },
        opacity: {
          value: themeConfig.opacity,
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: { value: themeConfig.size },
        links: {
          enable: true,
          color: themeConfig.linkColor,
          distance: 170,
          opacity: themeConfig.linkOpacity,
          width: themeConfig.linkWidth,
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.3 } },
        },
      },
    }),
    [theme],
  );

  if (PREFERS_REDUCED_MOTION) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-75">
      <ParticlesProvider init={initParticles}>
        <Particles id="tsparticles" options={options} className="h-full w-full" />
      </ParticlesProvider>
    </div>
  );
}

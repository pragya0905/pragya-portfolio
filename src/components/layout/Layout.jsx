import { ParticleBackground } from "./ParticleBackground";

export function Layout({ children }) {
  return (
    <>
      <ParticleBackground />
      {children}
    </>
  );
}

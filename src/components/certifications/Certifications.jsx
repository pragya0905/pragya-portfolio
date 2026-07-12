import { CERTIFICATIONS } from "../../data/content";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { CertificationCard } from "./CertificationCard";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      heading="Certifications"
      highlight="Verified Credentials!"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CERTIFICATIONS.map((cert, index) => (
          <Reveal key={cert.name + index} index={index} className="h-full">
            <CertificationCard {...cert} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

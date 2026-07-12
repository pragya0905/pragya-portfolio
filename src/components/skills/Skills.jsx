import { SKILLS } from "../../data/content";
import { Section } from "../layout/Section";
import { SkillIconCard } from "./SkillIconCard";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      heading="Technical Skills"
      highlight="Core Expertise!"
    >
      <div className="space-y-12">
        {SKILLS.map(({ category, items }) => (
          <div key={category}>
            <h3 className="mb-4 font-mono text-sm uppercase tracking-wide text-accent">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((label) => (
                <SkillIconCard key={label} label={label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

import { SKILLS } from "../../data/content";
import { Section } from "../layout/Section";
import { SkillCategory } from "./SkillCategory";

export function Skills() {
  return (
    <Section id="skills" eyebrow="// 03 — Skills" heading="Toolbox">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SKILLS.map((skill) => (
          <SkillCategory key={skill.category} {...skill} />
        ))}
      </div>
    </Section>
  );
}

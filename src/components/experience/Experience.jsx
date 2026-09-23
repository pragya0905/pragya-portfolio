import { EXPERIENCE } from "../../data/content";
import { Section } from "../layout/Section";
import { Timeline } from "./Timeline";

const experienceItems = EXPERIENCE.filter((item) => item.category === "experience");
const internshipItems = EXPERIENCE.filter((item) => item.category === "internship");
const educationItems = EXPERIENCE.filter((item) => item.category === "education");

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      heading="Engineering at Scale"
      highlight="Real Impact!"
    >
      <Timeline items={experienceItems} />
    </Section>
  );
}

export function InternshipsSection() {
  return (
    <Section id="internships" eyebrow="Internships" heading="Where It Started">
      <Timeline items={internshipItems} />
    </Section>
  );
}

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" heading="Academic Foundation">
      <Timeline items={educationItems} />
    </Section>
  );
}

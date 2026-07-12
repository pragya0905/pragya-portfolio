import { PROJECTS } from "../../data/content";
import { Section } from "../layout/Section";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <Section id="projects" eyebrow="// 02 — Projects" heading="Selected Work">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  );
}

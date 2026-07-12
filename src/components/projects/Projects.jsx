import clsx from "clsx";
import { PROJECTS } from "../../data/content";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const isSingle = PROJECTS.length === 1;

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      heading="Selected Work"
      highlight="Built to Ship!"
    >
      <div
        className={clsx(
          "grid grid-cols-1 gap-6",
          isSingle ? "mx-auto max-w-xl" : "md:grid-cols-2",
        )}
      >
        {PROJECTS.map((project, index) => (
          <Reveal key={project.title} index={index} className="h-full">
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

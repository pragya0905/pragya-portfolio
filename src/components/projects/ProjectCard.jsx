import { ArrowUpRight } from "lucide-react";
import { Tag } from "../ui/Tag";
import { GithubIcon } from "../ui/BrandIcons";

export function ProjectCard({ title, context, description, metrics, tags, links }) {
  const hasLinks = links.github || links.demo;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-faint">
        {context}
      </p>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-muted">{description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-line bg-canvas/60 px-3 py-2 text-xs"
          >
            <span className="font-mono font-semibold text-accent">{metric.value}</span>{" "}
            <span className="text-muted">{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {hasLinks && (
        <div className="mt-6 flex gap-4 border-t border-line pt-4">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-muted hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" /> Code
            </a>
          )}
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-muted hover:text-accent"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}

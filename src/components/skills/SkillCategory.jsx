import { Tag } from "../ui/Tag";

export function SkillCategory({ category, items }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-8">
      <h3 className="mb-6 font-mono text-sm uppercase tracking-wide text-accent">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}

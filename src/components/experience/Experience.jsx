import { EXPERIENCE } from "../../data/content";
import { Section } from "../layout/Section";
import { FeaturedRoleCard } from "./FeaturedRoleCard";
import { TimelineItem } from "./TimelineItem";

export function Experience() {
  return (
    <Section id="experience" eyebrow="// 01 — Experience" heading="Engineering at Scale">
      <div className="space-y-8">
        {EXPERIENCE.featured.map((role) => (
          <FeaturedRoleCard key={role.company} {...role} />
        ))}
      </div>

      <ul className="mt-16 space-y-8">
        {EXPERIENCE.timeline.map((item) => (
          <TimelineItem key={item.role} {...item} />
        ))}
      </ul>
    </Section>
  );
}

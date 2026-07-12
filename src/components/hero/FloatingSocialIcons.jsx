import { Mail } from "lucide-react";
import { SOCIAL_LINKS } from "../../data/content";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

const ICONS = [
  { href: `mailto:${SOCIAL_LINKS.email}`, icon: Mail, label: "Email" },
  { href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: SOCIAL_LINKS.github, icon: GithubIcon, label: "GitHub" },
].filter((item) => item.href);

export function FloatingSocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {ICONS.map(({ href, icon: Icon, label }, index) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={label}
          title={label}
          className="float-glow flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-surface/50 text-accent shadow-[0_0_16px_-4px_var(--color-glow)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-accent hover:text-ink hover:shadow-[0_0_28px_-4px_var(--color-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:hover:scale-100 [[data-theme=light]_&]:!bg-[#eef4f8] [[data-theme=light]_&]:!shadow-[0_4px_16px_rgba(30,58,95,0.15)] [[data-theme=light]_&]:hover:!shadow-[0_6px_20px_rgba(30,58,95,0.2)]"
          style={{ animationDelay: `${index * 250}ms`, animationDuration: `${3.2 + index * 0.5}s` }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

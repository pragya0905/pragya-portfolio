import { Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "../../data/content";
import { Button } from "../ui/Button";
import { IconLink } from "../ui/IconLink";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

export function Footer() {
  return (
    <footer
      id="contact"
      role="contentinfo"
      className="scroll-mt-24 border-t border-line py-24"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Let&rsquo;s build something.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Open to full-stack and cloud engineering opportunities. Reach out and
          let&rsquo;s talk.
        </p>

        <div className="mt-8 flex justify-center">
          <Button as="a" href={`mailto:${SOCIAL_LINKS.email}`}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            {SOCIAL_LINKS.email}
          </Button>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <IconLink href={`mailto:${SOCIAL_LINKS.email}`} icon={Mail} label="Email" />
          <IconLink href={SOCIAL_LINKS.linkedin} icon={LinkedinIcon} label="LinkedIn" />
          <IconLink href={SOCIAL_LINKS.github} icon={GithubIcon} label="GitHub" />
        </div>

        <p className="mt-16 font-mono text-xs text-faint">
          © {new Date().getFullYear()} {PROFILE.name} — built with React &amp; Tailwind
        </p>
      </div>
    </footer>
  );
}

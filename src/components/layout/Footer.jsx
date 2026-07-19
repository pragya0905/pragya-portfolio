import { useEffect } from "react";
import { Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import { trackEvent } from "../../lib/analytics";
import { IconLink } from "../ui/IconLink";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { ContactForm } from "./ContactForm";

export function Footer() {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) trackEvent("section_view", { section_id: "contact" });
  }, [inView]);

  return (
    <footer
      id="contact"
      ref={ref}
      role="contentinfo"
      className="scroll-mt-24 border-t border-line py-16"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Let&rsquo;s build something.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Open to full-stack and cloud engineering opportunities. Reach out and
          let&rsquo;s talk.
        </p>

        <ContactForm />

        <div className="mt-10 flex justify-center gap-4">
          <IconLink href={`mailto:${SOCIAL_LINKS.email}`} icon={Mail} label="Email" />
          <IconLink href={SOCIAL_LINKS.linkedin} icon={LinkedinIcon} label="LinkedIn" />
          <IconLink href={SOCIAL_LINKS.github} icon={GithubIcon} label="GitHub" />
        </div>

        <p className="mt-6 text-sm text-muted">
          Or email directly:{" "}
          <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-accent hover:underline">
            {SOCIAL_LINKS.email}
          </a>
        </p>

        <p className="mt-10 font-mono text-xs text-faint">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React &amp; AWS
        </p>
      </div>
    </footer>
  );
}

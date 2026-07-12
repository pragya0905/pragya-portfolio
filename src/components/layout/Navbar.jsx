import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS, SOCIAL_LINKS } from "../../data/content";
import { useScrolled } from "../../hooks/useScrolled";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/useTheme";
import { trackEvent } from "../../lib/analytics";
import { Button } from "../ui/Button";

function ThemeToggle({ theme, toggleTheme, className }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-accent/20 bg-ink/5 text-ink backdrop-blur-md",
        "[[data-theme=light]_&]:!border-[#0891b2] [[data-theme=light]_&]:!bg-white [[data-theme=light]_&]:!text-[#0891b2]",
        "transition-[background-color,color,border-color,scale,box-shadow] duration-300 ease-out motion-reduce:transition-none",
        "hover:border-accent/70 hover:bg-accent/10 hover:text-accent hover:scale-[1.04] hover:shadow-[0_0_20px_-8px_var(--color-glow)] motion-reduce:hover:scale-100",
        "active:scale-[0.97]",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={clsx(
          "absolute h-5 w-5 transition-all duration-500 ease-out motion-reduce:transition-none",
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        aria-hidden="true"
        className={clsx(
          "absolute h-5 w-5 transition-all duration-500 ease-out motion-reduce:transition-none",
          isDark ? "-rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
    </button>
  );
}

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
  const scrolled = useScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-line bg-canvas/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        >
          <a href="#home" className="font-display text-xl font-black tracking-wide">
            <span className="text-ink">P</span>
            <span className="text-accent">J</span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={clsx(
                      "text-sm transition-colors duration-200 hover:text-ink",
                      isActive ? "text-accent" : "text-muted",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            {SOCIAL_LINKS.resumeUrl ? (
              <Button
                as="a"
                href={SOCIAL_LINKS.resumeUrl}
                download
                variant="secondary"
                onClick={() => trackEvent("resume_download")}
              >
                Resume
              </Button>
            ) : (
              <Button as="button" type="button" variant="secondary" disabled title="Resume coming soon">
                Resume
              </Button>
            )}
            <Button as="a" href="#contact" variant="secondary" onClick={() => trackEvent("hire_me_click")}>
              Hire Me
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[65px] z-50 flex flex-col items-center justify-center gap-8 bg-canvas/95 backdrop-blur lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-xl text-ink hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          {SOCIAL_LINKS.resumeUrl ? (
            <Button
              as="a"
              href={SOCIAL_LINKS.resumeUrl}
              download
              variant="secondary"
              onClick={() => {
                trackEvent("resume_download");
                closeMenu();
              }}
            >
              Resume
            </Button>
          ) : (
            <Button as="button" type="button" variant="secondary" disabled title="Resume coming soon">
              Resume
            </Button>
          )}
          <Button
            as="a"
            href="#contact"
            onClick={() => {
              trackEvent("hire_me_click");
              closeMenu();
            }}
          >
            Hire Me
          </Button>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS, SOCIAL_LINKS } from "../../data/content";
import { useScrolled } from "../../hooks/useScrolled";
import { useActiveSection } from "../../hooks/useActiveSection";
import { Button } from "../ui/Button";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
  const scrolled = useScrolled();
  const activeId = useActiveSection(SECTION_IDS);
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
        <a href="#home" className="font-mono text-lg font-semibold text-ink">
          pk<span className="text-accent">.</span>dev
        </a>

        <ul className="hidden items-center gap-8 md:flex">
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

        <div className="hidden md:block">
          {SOCIAL_LINKS.resumeUrl ? (
            <Button as="a" href={SOCIAL_LINKS.resumeUrl} download variant="secondary">
              Resume
            </Button>
          ) : (
            <Button as="a" href="#contact" variant="secondary">
              Contact
            </Button>
          )}
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[65px] flex flex-col items-center justify-center gap-8 bg-canvas/95 backdrop-blur md:hidden"
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
            <Button as="a" href={SOCIAL_LINKS.resumeUrl} download onClick={closeMenu}>
              Resume
            </Button>
          ) : (
            <Button as="a" href="#contact" onClick={closeMenu}>
              Contact
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

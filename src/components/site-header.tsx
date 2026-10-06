"use client";

import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import type { Locale } from "@/i18n/routing";
import type { SectionId } from "@/lib/site";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  locale: Locale;
  labels: {
    home: string;
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    switchLanguage: string;
  };
  links: { id: SectionId; label: string }[];
};

/** Section au milieu de l'écran ("top" pour le hero), suivie par IntersectionObserver. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>();
  const key = ids.join(",");

  useEffect(() => {
    const targets = ["top", ...key.split(",")]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active === "top" ? undefined : active;
}

export function SiteHeader({ locale, labels, links }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const active = useActiveSection(links.map((l) => l.id));

  // Bordure de l'en-tête dès que la page n'est plus tout en haut.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => `/${locale}#${id}`;

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute inset-x-0 top-0 h-px" />
      <header
        className={`sticky top-0 z-40 border-b bg-bg/80 backdrop-blur-md transition-colors ${
          scrolled || open ? "border-border" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href={href("top")}
            aria-label={labels.home}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-fg text-sm font-bold tracking-tight transition-colors hover:bg-fg hover:text-bg"
          >
            MT
          </a>

          <nav aria-label={labels.primaryNav} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={href(id)}
                    aria-current={active === id ? "true" : undefined}
                    className="relative rounded-full px-3 py-2 text-[15px] text-muted transition-colors hover:text-fg aria-[current]:text-fg"
                  >
                    {label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity ${
                        active === id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <LocaleSwitcher
              locale={locale}
              anchor={active}
              label={labels.switchLanguage}
            />
            <ThemeToggle label={labels.toggleTheme} />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              className="inline-flex size-9 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 md:hidden"
            >
              {open ? (
                <LuX aria-hidden className="size-5" />
              ) : (
                <LuMenu aria-hidden className="size-5" />
              )}
            </button>
          </div>
        </div>

        <nav
          id="mobile-menu"
          aria-label={labels.primaryNav}
          hidden={!open}
          className="border-t border-border md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={href(id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  className="flex items-center justify-between rounded-lg px-2 py-3 text-lg font-bold text-muted transition-colors hover:text-fg aria-[current]:text-fg"
                >
                  {label}
                  {active === id && (
                    <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

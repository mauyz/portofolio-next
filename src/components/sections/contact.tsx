import { useLocale, useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { LuArrowUp, LuMail, LuPhone } from "react-icons/lu";
import { contact } from "@/content/profile";
import { Reveal } from "../reveal";
import { Container } from "../ui";

export function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const channels: { href: string; label: string; detail?: string; icon: IconType; external?: boolean }[] = [
    { href: contact.whatsapp, label: t("chat"), detail: "WhatsApp", icon: FaWhatsapp, external: true },
    { href: contact.phone, label: t("call"), detail: contact.phoneDisplay, icon: LuPhone },
    { href: contact.linkedin, label: "LinkedIn", icon: FaLinkedinIn, external: true },
    { href: contact.github, label: "GitHub", icon: FaGithub, external: true },
  ];

  return (
    <footer>
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="border-t border-border py-20 md:py-32"
      >
        <Container>
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">
              <span className="text-accent">05</span>
              <span aria-hidden className="h-px w-8 bg-border" />
              {tNav("contact")}
            </p>
            <h2
              id="contact-title"
              className="max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.03em] text-balance"
            >
              {t("title")}
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-pretty text-muted md:text-2xl">
              {t("text")}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <a
              href={contact.email}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-fg p-6 text-bg transition-colors hover:bg-accent hover:text-accent-fg sm:col-span-2 lg:col-span-1 lg:row-span-2"
            >
              <span className="min-w-0">
                <span className="block font-mono text-xs tracking-[0.14em] uppercase opacity-70">
                  {t("email")}
                </span>
                <span className="mt-2 block text-xl font-bold break-all sm:text-2xl">
                  {contact.emailAddress}
                </span>
              </span>
              <LuMail aria-hidden className="size-7 shrink-0" />
            </a>
            {channels.map(({ href, label, detail, icon: Icon, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon aria-hidden className="size-6 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-lg leading-tight font-bold">{label}</span>
                  {detail && <span className="block text-sm text-muted">{detail}</span>}
                </span>
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      <div className="border-t border-border">
        <Container className="flex flex-col-reverse items-start justify-between gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <a href={`/${locale}#top`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            {tCommon("backToTop")}
            <LuArrowUp aria-hidden className="size-4" />
          </a>
        </Container>
      </div>
    </footer>
  );
}

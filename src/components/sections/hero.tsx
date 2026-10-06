import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowDown, LuDownload, LuMapPin } from "react-icons/lu";
import { profile } from "@/content/profile";
import { Reveal } from "../reveal";
import { RotatingTitles } from "../rotating-titles";
import { ButtonLink, Container } from "../ui";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-[radial-gradient(30rem_circle_at_85%_55%,var(--accent-soft),transparent_70%)]"
    >
      <Container className="grid items-center gap-10 pt-10 pb-16 md:pt-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-24 lg:pb-20">
        <div>
          <Reveal>
            <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.18em] text-muted uppercase">
              <span>{t("greeting")}</span>
              <span aria-hidden className="h-px w-8 bg-border" />
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
                <LuMapPin aria-hidden className="size-3.5 text-accent" />
                {profile.location}
              </span>
            </p>
            <h1
              id="hero-title"
              className="text-[clamp(2.75rem,9.5vw,6.25rem)] leading-[0.92] font-bold tracking-[-0.03em]"
            >
              {profile.firstName}
              <br />
              <span className="text-muted">{profile.lastName}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 min-h-[2lh] text-2xl leading-tight font-bold text-accent sm:min-h-[1lh] md:text-3xl">
              <RotatingTitles titles={t.raw("titles") as string[]} />
            </p>
          </Reveal>

          <Reveal delay={220} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={profile.cv[locale]} external>
              <LuDownload aria-hidden className="size-[18px]" />
              {t("downloadCV")}
            </ButtonLink>
            <ButtonLink href={`/${locale}#contact`} variant="secondary">
              {t("contactMe")}
              <LuArrowDown aria-hidden className="size-[18px]" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={150} className="order-first lg:order-none">
          <div className="relative w-36 sm:w-48 lg:w-64 xl:w-80">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-accent lg:translate-x-5 lg:translate-y-5"
            />
            <Image
              src={profile.photo}
              alt={`${profile.firstName} ${profile.lastName}`}
              width={500}
              height={549}
              priority
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 256px, (min-width: 640px) 192px, 144px"
              className="relative rounded-[1.75rem] border border-border bg-surface-2 object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

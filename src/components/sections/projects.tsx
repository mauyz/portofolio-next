import Image from "next/image";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import { FaAppStoreIos, FaGithub, FaGooglePlay } from "react-icons/fa6";
import { LuArrowUpRight, LuClock, LuGlobe, LuSmartphone } from "react-icons/lu";
import { contact } from "@/content/profile";
import { projects, type ProjectLink } from "@/content/projects";
import { Reveal } from "../reveal";
import { ChipList, Section } from "../ui";

const linkMeta: Record<ProjectLink["kind"], { label: string; icon: IconType }> = {
  apkpure: { label: "APKPure", icon: LuSmartphone },
  playstore: { label: "Play Store", icon: FaGooglePlay },
  appstore: { label: "App Store", icon: FaAppStoreIos },
  web: { label: "Web", icon: LuGlobe },
  github: { label: "GitHub", icon: FaGithub },
};

export function Projects() {
  const t = useTranslations("projects");

  return (
    <Section id="projects" index="04" title={t("title")} className="bg-surface-2/50">
      <Reveal className="mb-14 grid gap-6 text-lg leading-relaxed text-pretty text-muted md:grid-cols-2 md:gap-8 md:text-xl">
        <div className="space-y-4">
          {(t.raw("intro") as string[]).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <p>
          {t("githubIntro")}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            {t("githubLink")}
          </a>
          {t("githubEnd")}
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {projects.map((project, i) => {
          const title = t(`items.${project.id}.title`);
          return (
            <Reveal
              as="article"
              key={project.id}
              delay={(i % 2) * 100}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative aspect-[5/4] overflow-hidden border-b border-border bg-white">
                <Image
                  src={project.image}
                  alt={title}
                  fill
                  sizes="(min-width: 1152px) 544px, (min-width: 768px) 50vw, 100vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl leading-tight font-bold">{title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-pretty text-muted">
                  {t(`items.${project.id}.description`)}
                </p>
                <ChipList items={project.stack} className="mt-5" />

                {project.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    <span className="w-full font-mono text-xs tracking-[0.14em] text-muted uppercase">
                      {t("viewOn")}
                    </span>
                    {project.links.map(({ kind, url }) => {
                      const { label, icon: Icon } = linkMeta[kind];
                      return (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} — ${label}`}
                          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm font-bold transition-colors hover:border-accent hover:text-accent"
                        >
                          <Icon aria-hidden className="size-4" />
                          {label}
                          <LuArrowUpRight aria-hidden className="size-3.5 opacity-60" />
                        </a>
                      );
                    })}
                  </div>
                )}

                {project.unreleased && (
                  <p className="mt-auto pt-6">
                    <span className="inline-flex h-9 items-center gap-2 rounded-full bg-accent-soft px-3.5 text-sm font-bold text-accent">
                      <LuClock aria-hidden className="size-4" />
                      {t("unreleased")}
                    </span>
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

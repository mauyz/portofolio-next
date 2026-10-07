import Image from "next/image";
import { useTranslations } from "next-intl";
import { skillCategories } from "@/content/skills";
import { Reveal } from "../reveal";
import { Section } from "../ui";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" index="03" title={t("title")}>
      <Reveal className="mb-14 grid gap-6 text-lg leading-relaxed text-pretty text-muted md:grid-cols-2 md:gap-8 md:text-xl">
        {(t.raw("intro") as string[]).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Reveal>

      <div className="gap-4 sm:columns-2 lg:columns-3">
        {skillCategories.map((category, i) => (
          <Reveal
            key={category.id}
            delay={(i % 3) * 80}
            className="mb-4 break-inside-avoid rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
              {t(`categories.${category.id}`)}
            </h3>
            <ul className="mt-5 space-y-3">
              {category.items.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3 text-lg font-bold">
                  {/* Pastille claire : les logos restent lisibles en mode sombre. */}
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white">
                    <Image src={skill.logo} alt="" width={26} height={26} className="size-[26px] object-contain" />
                  </span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

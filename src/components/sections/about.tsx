import { useTranslations } from "next-intl";
import { education } from "@/content/career";
import { profile } from "@/content/profile";
import { Reveal } from "../reveal";
import { Section } from "../ui";

export function About() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");
  const tCareer = useTranslations("career");
  const [first, ...rest] = t.raw("bio") as string[];
  const master = education[0];

  // Repères tirés des sources (bio, formation, projets) : rien d'inventé.
  const facts = [
    { label: t("facts.location"), value: profile.location },
    {
      label: t("facts.education"),
      value: `${tCareer(`education.${master.id}.title`)} · ENI ${master.location}`,
    },
    { label: t("facts.focus"), value: t("facts.focusValue") },
    { label: t("facts.backend"), value: t("facts.backendValue") },
    { label: t("facts.ai"), value: t("facts.aiValue") },
  ];

  return (
    <Section id="about" index="01" label={tNav("about")} title={t("title")}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-7">
          <Reveal as="p" className="text-2xl leading-snug text-pretty md:text-3xl">
            {first}
          </Reveal>
          {rest.map((paragraph, i) => (
            <Reveal
              as="p"
              key={i}
              delay={80 * (i + 1)}
              className="text-lg leading-relaxed text-pretty text-muted md:text-xl"
            >
              {paragraph}
            </Reveal>
          ))}
        </div>

        <Reveal as="dl" delay={120} className="lg:col-span-4 lg:col-start-9">
          {facts.map(({ label, value }) => (
            <div key={label} className="border-t border-border py-5 last:border-b">
              <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{label}</dt>
              <dd className="mt-1.5 text-lg font-bold">{value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

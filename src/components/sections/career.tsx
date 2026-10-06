import { useFormatter, useTranslations } from "next-intl";
import { education, experiences, type Period } from "@/content/career";
import { Reveal } from "../reveal";
import { ChipList, Section } from "../ui";

function usePeriodLabel() {
  const t = useTranslations("career");
  const format = useFormatter();

  const point = (value: string) => {
    const [year, month] = value.split("-").map(Number);
    if (!month) return value;
    // Milieu de mois : aucun risque de basculer sur le mois voisin selon le fuseau.
    return format.dateTime(new Date(Date.UTC(year, month - 1, 15)), {
      month: "long",
      year: "numeric",
    });
  };

  return (period: Period) => {
    if (period.current) return t("since", { date: point(period.start) });
    return period.end ? `${point(period.start)} – ${point(period.end)}` : point(period.start);
  };
}

type Entry = {
  key: string;
  period: string;
  title: string;
  meta: string[];
  bullets: string[];
  stack?: string[];
};

function Timeline({ heading, intro, entries }: { heading: string; intro: string[]; entries: Entry[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <h3 className="text-3xl font-bold tracking-tight">{heading}</h3>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-pretty text-muted">
            {intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <ol className="lg:col-span-8">
        {entries.map((entry) => (
          <Reveal
            as="li"
            key={entry.key}
            className="grid gap-3 border-t border-border py-8 last:border-b sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="pt-1.5 font-mono text-sm text-muted first-letter:uppercase">{entry.period}</p>
            <div>
              <h4 className="text-2xl leading-tight font-bold">{entry.title}</h4>
              <p className="mt-1.5 flex flex-wrap gap-x-2 text-[15px] text-muted">
                {entry.meta.map((item, i) => (
                  <span key={item} className="inline-flex gap-x-2">
                    {i > 0 && <span aria-hidden>·</span>}
                    {item}
                  </span>
                ))}
              </p>
              {entry.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-[17px] leading-relaxed">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {entry.stack && <ChipList items={entry.stack} className="mt-5" />}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Career() {
  const t = useTranslations("career");
  const periodLabel = usePeriodLabel();

  const jobs: Entry[] = experiences.map((xp) => ({
    key: xp.id,
    period: periodLabel(xp.period),
    title: t(`experiences.${xp.id}.title`),
    meta: [xp.company, t(`contract.${xp.contract}`), xp.location].filter(
      (item): item is string => Boolean(item),
    ),
    bullets: t.raw(`experiences.${xp.id}.bullets`) as string[],
    stack: xp.stack,
  }));

  const degrees: Entry[] = education.map((edu) => ({
    key: edu.id,
    period: periodLabel(edu.period),
    title: t(`education.${edu.id}.title`),
    meta: [edu.school, edu.location],
    bullets: t.raw(`education.${edu.id}.bullets`) as string[],
  }));

  return (
    <Section id="career" index="02" title={t("title")} className="bg-surface-2/50">
      <div className="space-y-24">
        <Timeline heading={t("professional")} intro={t.raw("professionalIntro") as string[]} entries={jobs} />
        <Timeline heading={t("academic")} intro={t.raw("academicIntro") as string[]} entries={degrees} />
      </div>
    </Section>
  );
}

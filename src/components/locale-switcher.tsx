import { routing, type Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  /** Ancre à conserver en changeant de langue (section visible), sans le « # ». */
  anchor?: string;
  label: string;
};

export function LocaleSwitcher({ locale, anchor, label }: Props) {
  const target = routing.locales.find((l) => l !== locale) ?? locale;

  return (
    <a
      href={`/${target}${anchor ? `#${anchor}` : ""}`}
      hrefLang={target}
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center gap-1 rounded-full px-3 font-mono text-xs tracking-wide uppercase transition-colors hover:bg-surface-2"
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="contents">
          {i > 0 && (
            <span aria-hidden className="text-border">
              /
            </span>
          )}
          <span
            className={l === locale ? "font-semibold text-fg" : "text-muted"}
          >
            {l}
          </span>
        </span>
      ))}
    </a>
  );
}

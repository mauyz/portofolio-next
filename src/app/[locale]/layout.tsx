import type { Metadata, Viewport } from "next";
import { Carlito, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { contact } from "@/content/profile";
import { routing } from "@/i18n/routing";
import { sections, siteUrl } from "@/lib/site";
import "../globals.css";

const carlito = Carlito({
  variable: "--font-carlito",
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocales = { fr: "fr_FR", en: "en_US" } as const;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: "%s — Moïse T." },
    description: t("description"),
    authors: [{ name: "Moïse Tsiorinambinina", url: contact.github }],
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Moïse T.",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: ogLocales[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${carlito.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t("skipToContent")}
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader
            locale={locale}
            labels={{
              home: tNav("home"),
              primaryNav: t("primaryNav"),
              openMenu: t("openMenu"),
              closeMenu: t("closeMenu"),
              toggleTheme: t("toggleTheme"),
              switchLanguage: t("switchLanguage"),
            }}
            links={sections.map((id) => ({ id, label: tNav(id) }))}
          />
          <div id="content" className="flex flex-1 flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

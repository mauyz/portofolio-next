/**
 * URL publique du site, utilisée pour les métadonnées (canonical, Open Graph, sitemap).
 * Ordre : variable explicite, puis celles fournies par Vercel ou Netlify au build.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.URL) ??
  "http://localhost:3000";

export const sections = [
  "about",
  "career",
  "skills",
  "projects",
  "contact",
] as const;

export type SectionId = (typeof sections)[number];

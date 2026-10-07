import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // 90 pour les aperçus de projets : captures d'écran avec beaucoup de petit texte.
  images: { qualities: [75, 90] },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

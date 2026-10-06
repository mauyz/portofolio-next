import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";

export const alt = `${profile.firstName} ${profile.lastName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "hero" });
  const titles = t.raw("titles") as string[];

  const [bold, regular, photo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Carlito-Bold.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Carlito-Regular.ttf")),
    readFile(join(process.cwd(), "public/images/moise.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fafaf9",
          color: "#1c1917",
          fontFamily: "Carlito",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, color: "#57534e", letterSpacing: 4, textTransform: "uppercase" }}>
            {profile.location}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            <span>{profile.firstName}</span>
            <span style={{ color: "#57534e" }}>{profile.lastName}</span>
          </div>
          <div style={{ marginTop: 40, fontSize: 36, fontWeight: 700, color: "#1a63d1" }}>
            {titles[0]}
          </div>
          <div style={{ marginTop: 8, fontSize: 30, color: "#57534e" }}>{titles[1]}</div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 360, height: 395 }}>
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              width: 360,
              height: 395,
              borderRadius: 40,
              border: "2px solid #1a63d1",
            }}
          />
          <img
            src={`data:image/jpeg;base64,${photo}`}
            alt=""
            width={360}
            height={395}
            style={{ borderRadius: 40, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Carlito", data: bold, weight: 700, style: "normal" },
        { name: "Carlito", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}

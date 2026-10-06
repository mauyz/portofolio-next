import { useLocale, useTranslations } from "next-intl";
import { LuArrowLeft } from "react-icons/lu";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <main className="flex flex-1 items-center py-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">404</p>
        <h1 className="mt-4 text-5xl leading-tight font-bold tracking-tight text-balance md:text-7xl">
          {t("title")}
        </h1>
        <ButtonLink href={`/${locale}`} className="mt-10">
          <LuArrowLeft aria-hidden className="size-[18px]" />
          {t("back")}
        </ButtonLink>
      </Container>
    </main>
  );
}

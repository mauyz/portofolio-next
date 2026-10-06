"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // Les deux icônes sont rendues et la classe `dark` choisit la bonne :
  // aucun décalage d'hydratation, même avant que le thème soit connu côté client.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <LuMoon aria-hidden className="size-[18px] dark:hidden" />
      <LuSun aria-hidden className="hidden size-[18px] dark:block" />
    </button>
  );
}

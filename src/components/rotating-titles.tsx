"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 3200;

/** Fait défiler les titres du hero ; les lecteurs d'écran reçoivent la liste complète. */
export function RotatingTitles({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Animations réduites : on garde le premier titre, sans défilement.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % titles.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [titles.length]);

  return (
    <>
      <span className="sr-only">{titles.join(", ")}</span>
      <span aria-hidden className="block">
        <span key={index} className="title-in inline-block">
          {titles[index]}
        </span>
      </span>
    </>
  );
}

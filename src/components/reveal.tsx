"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** Décalage en ms, pour échelonner des éléments voisins. */
  delay?: number;
  className?: string;
};

/**
 * Fait apparaître son contenu quand il entre dans l'écran.
 * Le masquage initial est en CSS (`.reveal`) et ne s'applique que si le JS tourne
 * et que l'utilisateur n'a pas demandé à réduire les animations.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}

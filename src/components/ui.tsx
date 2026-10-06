import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type SectionProps = {
  id: string;
  index: string;
  /** Surtitre, seulement s'il diffère du titre. */
  label?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Section éditoriale : numéro + libellé en petites capitales, grand titre, contenu. */
export function Section({ id, index, label, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 md:py-32 ${className}`}>
      <Container>
        <Reveal as="header" className="mb-12 md:mb-16">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">
            <span className="text-accent">{index}</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            {label}
          </p>
          <h2
            id={`${id}-title`}
            className="text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] leading-5 text-muted">
      {children}
    </li>
  );
}

export function ChipList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-accent hover:text-accent-fg"
      : "border border-border bg-surface text-fg hover:border-fg";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-bold transition-colors ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

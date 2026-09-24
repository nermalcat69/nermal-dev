import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page-width container. Single source for max-width + gutters. */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "footer" | "section" | "article";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("mx-auto w-full max-w-[1080px] px-5 sm:px-8", className)}>{children}</Tag>;
}

/**
 * Equal-height grid. Items stretch by default; direct wrappers must allow height.
 */
export function EqualGrid({
  className,
  cols = 2,
  children,
}: {
  className?: string;
  cols?: 2 | 3;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-fr items-stretch gap-3 [&>*]:h-full",
        cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Eyebrow / kicker line above a title. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-[13px] leading-[18px]", className)}>{children}</p>;
}

const titleSizes = {
  hero: "mt-4 max-w-[18ch] text-[34px] leading-[1.08] font-normal tracking-[-0.035em] text-balance sm:text-[52px] lg:text-[64px]",
  section:
    "max-w-[16ch] text-[36px] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-[52px] lg:text-[60px]",
  card: "text-[24px] leading-[30px] font-medium tracking-[-0.025em] text-balance",
} as const;

/** Shared title scale so headings align visually site-wide. */
export function SectionTitle({
  as: Tag = "h2",
  size = "section",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof titleSizes;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(titleSizes[size], className)}>{children}</Tag>;
}

/** Shared body copy scale. Never uses text-balance (keeps rag natural + fast). */
export function Body({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mt-3 space-y-3 text-[15px] leading-[22.5px]", className)}>{children}</div>;
}

const cardTones = {
  light: "bg-[#f3f3f3] text-[var(--ink)] ring-1 ring-black/8",
  dark: "bg-[#141414] text-[#f7f7f7]",
} as const;

/** Equal-height card shell. flex-col + h-full lets sibling cards match height. */
export function Card({
  tone,
  id,
  className,
  children,
}: {
  tone: keyof typeof cardTones;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      className={cn("flex h-full flex-col overflow-hidden rounded-[14px]", cardTones[tone], className)}
    >
      {children}
    </article>
  );
}

/** Media well. The aspect box reserves space so equal cards never shift (no CLS). */
export function CardMedia({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="p-3 sm:p-4">
      <div className={cn("relative aspect-[640/420]", className)}>{children}</div>
    </div>
  );
}

/** Copy well. flex-1 pins bottoms together when siblings have uneven text. */
export function CardCopy({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-1 flex-col px-6 pt-2 pb-7 sm:px-8 sm:pt-3 sm:pb-8", className)}>
      <div className="min-h-[60px] sm:min-h-[30px]">
        <SectionTitle as="h2" size="card">
          {title}
        </SectionTitle>
      </div>
      <Body>{children}</Body>
    </div>
  );
}

import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tones = {
  light:
    "bg-[var(--pill-on-contrast-bg)] text-[var(--pill-on-contrast-ink)] hover:bg-[var(--pill-on-contrast-bg)] hover:text-[var(--pill-on-contrast-ink)]",
  dark: "bg-[#141414] text-[#f7f7f7] hover:bg-[#141414] hover:text-[#f7f7f7]",
  ghost:
    "bg-transparent text-[var(--ghost)] hover:bg-transparent hover:text-[var(--ghost-hover)]",
} as const;

export function PillLink({
  href,
  tone,
  children,
  external = false,
}: {
  href: string;
  tone: keyof typeof tones;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        buttonVariants({ variant: "default", size: "sm" }),
        "pill-link",
        "h-7 rounded-full px-3.5 text-[13px] leading-none font-medium shadow-none",
        tones[tone],
      )}
    >
      {children}
    </a>
  );
}

import Image from "next/image";
import { PillLink } from "@/components/site/pill-link";
import { Reveal } from "@/components/site/reveal";
import { Body, Container, Eyebrow, SectionTitle } from "@/components/site/surface";
import { links } from "@/lib/links";

export function Hero() {
  return (
    <section id="top" className="scroll-mt-4 bg-[var(--contrast)] text-[var(--contrast-ink)]">
      <Container className="pt-12 pb-16 md:pt-16 md:pb-[84px]">
        <Reveal>
          <Eyebrow className="text-[var(--contrast-muted)]">Terminal workbench</Eyebrow>
          <SectionTitle as="h1" size="hero" className="font-normal">
            <span className="font-medium">A terminal workbench</span>{" "}
            <span className="text-[var(--contrast-muted)]">with a built-in editor.</span>
          </SectionTitle>
          <Body className="mt-5 max-w-[48ch] text-[var(--contrast-muted)]">
            <p>
              Persistent sessions, remote work, and agent support. A background server owns
              your shells and panes, not the window. Written in Rust, rendered on the GPU
              through gpui, with Alacritty&apos;s VT core.
            </p>
          </Body>
          <div className="mt-8 flex items-center gap-2">
            <PillLink href={links.releases} tone="light" external>
              Get started
            </PillLink>
            <PillLink href={links.repo} tone="ghost" external>
              View on GitHub
            </PillLink>
          </div>
        </Reveal>
        <Reveal className="mt-16 md:mt-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[88%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)]"
            />
            <Image
              src="/hero.webp"
              alt="Nermalshowing a sidebar of agent sessions across several repositories"
              width={1470}
              height={956}
              priority
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1080px) 1016px, 100vw"
              className="relative h-auto w-full rounded-[14px] ring-1 ring-white/10"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

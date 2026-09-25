import { ArchitectureSketch } from "@/components/site/sketch";
import { PillLink } from "@/components/site/pill-link";
import { Reveal } from "@/components/site/reveal";
import { Body, Container, SectionTitle } from "@/components/site/surface";
import { links } from "@/lib/links";

export function Statement() {
  return (
    <section id="sessions" className="relative scroll-mt-4 overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <ArchitectureSketch
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] -right-[22%] hidden h-[78%] w-[min(560px,48vw)] text-[#1a1a1a] opacity-[0.16] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#fff_0%,rgba(255,255,255,0.97)_42%,rgba(255,255,255,0.72)_62%,transparent_80%)]"
      />
      <Container className="relative flex flex-col items-center py-16 text-center md:py-[112px]">
        <Reveal>
          <SectionTitle className="mx-auto items-center">
            The window does not own your shells.
          </SectionTitle>
          <Body className="mx-auto mt-5 max-w-[48ch] text-[var(--quiet)]">
            <p>
              Quitting Nermalcloses the window and leaves the server running. Your build
              keeps building, your agent keeps working, your SSH session stays up. Open
              Nermalagain and it reattaches to exactly what was there.
            </p>
          </Body>
          <div className="mt-8 flex justify-center">
            <PillLink href={links.concepts} tone="dark" external>
              How sessions work
            </PillLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

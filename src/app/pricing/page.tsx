import type { Metadata } from "next";
import { Closing } from "@/components/site/closing";
import { Nav } from "@/components/site/nav";
import { PillLink } from "@/components/site/pill-link";
import { Reveal } from "@/components/site/reveal";
import { Body, Card, Container, Eyebrow, SectionTitle } from "@/components/site/surface";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Nermal is free and MIT licensed. No tiers, no seats, no account.",
};

const included = [
  "Persistent sessions that outlive the window",
  "Built-in editor, git, and diffs",
  "SSH, SFTP, and port forwarding",
  "Agent sessions and the CLI",
  "Native builds for macOS, Windows, and Linux",
  "Every future release",
] as const;

export default function Pricing() {
  return (
    <>
      <Nav />
      <main className="min-h-screen py-2 pr-2 lg:pl-[156px] xl:pl-[176px]">
        <div className="min-h-[calc(100vh-1rem)] overflow-hidden rounded-[18px] border border-[var(--panel-line)] bg-[var(--panel)]">
          <section className="bg-[var(--contrast)] text-[var(--contrast-ink)]">
            <Container className="pt-12 pb-16 md:pt-16 md:pb-[84px]">
              <Reveal>
                <Eyebrow className="text-[var(--contrast-muted)]">Pricing</Eyebrow>
                <SectionTitle as="h1" size="hero" className="font-normal">
                  <span className="font-medium">Free.</span>{" "}
                  <span className="text-[var(--contrast-muted)]">Open source, MIT licensed.</span>
                </SectionTitle>
                <Body className="mt-5 max-w-[48ch] text-[var(--contrast-muted)]">
                  <p>No tiers, no seats, no account. Download it and use it.</p>
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
            </Container>
          </section>

          <section className="bg-[var(--paper)] text-[var(--ink)]">
            <Container className="py-16 md:py-[112px]">
              <Reveal>
                <Card tone="dark" className="mx-auto max-w-[520px]">
                  <div className="px-6 pt-8 sm:px-8">
                    <p className="text-[13px] text-[#a1a1a1]">Nermal</p>
                    <p className="mt-3 text-[56px] leading-none font-medium tracking-[-0.035em]">$0</p>
                    <p className="mt-2 text-[13px] text-[#a1a1a1]">Forever</p>
                  </div>
                  <ul className="flex-1 space-y-3 px-6 pt-8 text-[15px] sm:px-8">
                    {included.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-[#a1a1a1]">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pt-8 pb-8 sm:px-8">
                    <PillLink href={links.releases} tone="light" external>
                      Download
                    </PillLink>
                  </div>
                </Card>
              </Reveal>
            </Container>
          </section>
          <Closing />
        </div>
      </main>
    </>
  );
}

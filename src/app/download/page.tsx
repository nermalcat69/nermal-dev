import type { Metadata } from "next";
import { Closing } from "@/components/site/closing";
import { Nav } from "@/components/site/nav";
import { PillLink } from "@/components/site/pill-link";
import { Reveal } from "@/components/site/reveal";
import { Body, Card, Container, EqualGrid, Eyebrow, SectionTitle } from "@/components/site/surface";
import { docsRoute } from "@/lib/shared";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Download",
  description: "Native Nermal builds for macOS, Windows, and Linux.",
};

const platforms = [
  {
    name: "macOS",
    note: "Apple silicon and Intel. Signed and notarized. macOS 14 or later.",
    files: ["DMG (arm64)", "DMG (x86_64)"],
  },
  {
    name: "Windows",
    note: "x86-64. A regular installer, or a portable zip.",
    files: ["Setup .exe", "Portable .zip"],
  },
  {
    name: "Linux",
    note: "x86-64. The AppImage bundles its own X11, Wayland, and font libraries.",
    files: ["AppImage", "tar.gz"],
  },
] as const;

export default function Download() {
  return (
    <>
      <Nav />
      <main className="min-h-screen py-2 pr-2 lg:pl-[156px] xl:pl-[176px]">
        <div className="min-h-[calc(100vh-1rem)] overflow-hidden rounded-[18px] border border-[var(--panel-line)] bg-[var(--panel)]">
          <section className="bg-[var(--contrast)] text-[var(--contrast-ink)]">
            <Container className="pt-12 pb-16 md:pt-16 md:pb-[84px]">
              <Reveal>
                <Eyebrow className="text-[var(--contrast-muted)]">Download</Eyebrow>
                <SectionTitle as="h1" size="hero" className="font-normal">
                  <span className="font-medium">Get Nermal</span>{" "}
                  <span className="text-[var(--contrast-muted)]">for your platform.</span>
                </SectionTitle>
                <Body className="mt-5 max-w-[48ch] text-[var(--contrast-muted)]">
                  <p>
                    Every release publishes native builds on GitHub. There is no runtime to
                    install first.
                  </p>
                </Body>
                <div className="mt-8 flex items-center gap-2">
                  <PillLink href={links.releases} tone="light" external>
                    Latest release
                  </PillLink>
                  <PillLink href={`${docsRoute}/getting-started/installation`} tone="ghost">
                    Install guide
                  </PillLink>
                </div>
              </Reveal>
            </Container>
          </section>

          <section className="bg-[var(--paper)] text-[var(--ink)]">
            <Container className="py-16 md:py-[112px]">
              <Reveal>
                <EqualGrid cols={3}>
                  {platforms.map((platform) => (
                    <Card key={platform.name} tone="dark">
                      <div className="flex flex-1 flex-col px-6 pt-8 sm:px-8">
                        <SectionTitle as="h2" size="card">
                          {platform.name}
                        </SectionTitle>
                        <Body className="text-[#a1a1a1]">
                          <p>{platform.note}</p>
                        </Body>
                        <ul className="mt-5 space-y-1.5 text-[13px] text-[#a1a1a1]">
                          {platform.files.map((file) => (
                            <li key={file}>{file}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-6 pt-8 pb-8 sm:px-8">
                        <PillLink href={links.releases} tone="light" external>
                          Download
                        </PillLink>
                      </div>
                    </Card>
                  ))}
                </EqualGrid>
              </Reveal>
            </Container>
          </section>
          <Closing />
        </div>
      </main>
    </>
  );
}

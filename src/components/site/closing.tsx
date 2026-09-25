import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { PillLink } from "@/components/site/pill-link";
import { Reveal } from "@/components/site/reveal";
import { SponsorsFooter } from "@/components/site/sponsors";
import { Body, Container, SectionTitle } from "@/components/site/surface";
import { links } from "@/lib/links";

const columns = [
  {
    title: "Product",
    items: [
      { label: "Terminal", href: "/#editor" },
      { label: "Editor", href: links.editor, external: true },
      { label: "Git", href: links.git, external: true },
      { label: "Sessions", href: "/#sessions" },
      { label: "CLI", href: links.cli, external: true },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Local workspaces", href: links.concepts, external: true },
      { label: "SSH hosts", href: links.remote, external: true },
      { label: "Agent sessions", href: links.agents, external: true },
      { label: "Scripts", href: links.cli, external: true },
    ],
  },
  {
    title: "Pricing",
    items: [
      { label: "Free", href: "/pricing" },
      { label: "MIT license", href: links.license, external: true },
      { label: "GitHub releases", href: links.releases, external: true },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "GitHub", href: links.repo, external: true },
      { label: "Discord", href: links.discord, external: true },
      { label: "Issues", href: links.issues, external: true },
      { label: "Changelog", href: links.changelog, external: true },
    ],
  },
] as const;

export function Closing() {
  return (
    <section aria-label="Get Nermal" className="bg-[var(--paper)] text-[var(--ink)]">
      <Container className="flex flex-col items-center pt-16 text-center md:pt-[112px]">
        <Reveal>
          <SectionTitle className="mx-auto max-w-[14ch] sm:text-[56px]">
            Your build keeps building.
          </SectionTitle>
          <Body className="mx-auto mt-5 max-w-[40ch] text-[var(--quiet)]">
            <p>Native builds for macOS, Windows, and Linux.</p>
          </Body>
          <div className="mt-8 flex justify-center">
            <PillLink href={links.releases} tone="dark" external>
              Get started
            </PillLink>
          </div>
        </Reveal>
      </Container>

      <Container as="footer" className="pt-16 pb-10 md:pt-24">
        <SponsorsFooter />
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 border-t border-black/10 pt-10 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[13px] font-medium">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...("external" in item && item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="inline-block rounded-sm py-1 text-[13px] text-[var(--quiet)] transition-colors duration-150 outline-none hover:text-[var(--ink)] focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
          <Link href="/#top" className="flex items-center gap-2 text-[var(--ink)]">
            <Logo className="h-5 w-5" />
            <span className="text-[13px] font-medium">Nermal</span>
          </Link>
          <p className="text-[13px] text-[var(--quiet)]">MIT License. Copyright 2026 Arjun Aditya.</p>
        </div>
      </Container>
    </section>
  );
}

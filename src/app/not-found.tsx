import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { PillLink } from "@/components/site/pill-link";
import { Body, Container, Eyebrow, SectionTitle } from "@/components/site/surface";
import { docsRoute } from "@/lib/shared";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found · Nermal",
  description: "That page does not exist. Try the documentation or head back home.",
};

const destinations = [
  {
    href: docsRoute,
    title: "Documentation",
    note: "Installation, the window, the terminal, agents, remote work, and the full command reference.",
  },
  {
    href: links.releases,
    title: "Releases",
    note: "Native builds for macOS, Windows, and Linux, plus the changelog for every shipped version.",
    external: true,
  },
  {
    href: links.repo,
    title: "GitHub",
    note: "Source, issues, and discussions. Bug reports are genuinely welcome.",
    external: true,
  },
] as const;

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--shell)] text-[var(--ink)] antialiased">
      <div className="flex min-w-0 flex-1 flex-col bg-[var(--panel)]">
        <header className="flex h-12 items-center gap-3 border-b border-[var(--line)] px-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
          >
            <Logo className="h-5 w-8 shrink-0" />
            <span className="text-[15px] font-medium tracking-[-0.02em]">Nermal</span>
          </Link>
          <Link
            href={docsRoute}
            className="text-[13px] text-[var(--quiet)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
          >
            Docs
          </Link>
        </header>

        <main className="flex-1">
          <Container className="py-16 md:py-[96px]">
            {/* Monospace kicker: a 404 is a wrong address, and the site is a
                terminal. Ties the page to the product without a gimmick. */}
            <Eyebrow className="font-mono text-[13px] text-[var(--quiet)]">404</Eyebrow>
            <SectionTitle as="h1" size="hero" className="mt-4 font-normal">
              <span className="font-medium">This pane has nothing</span>{" "}
              <span className="text-[var(--quiet)]">in it.</span>
            </SectionTitle>
            <Body className="max-w-[48ch] text-[var(--quiet)]">
              <p>
                The page you asked for does not exist. It may have moved between
                releases, or the link that brought you here was mistyped.
              </p>
            </Body>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <PillLink href={docsRoute} tone="dark">
                Browse the docs
              </PillLink>
              <PillLink href={links.discord} tone="ghost" external>
                Ask on Discord
              </PillLink>
            </div>

            <nav aria-label="Suggested pages" className="mt-16 border-t border-[var(--line)] pt-8">
              <p className="text-[13px] text-[var(--quiet)]">Or try one of these</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {destinations.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      {...("external" in item && item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="block h-full rounded-[10px] border border-[var(--line)] px-4 py-3.5 outline-none transition-colors duration-150 hover:border-[var(--quiet)] focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
                    >
                      <span className="text-[14px] leading-[21px] font-medium">{item.title}</span>
                      <span className="mt-1.5 block text-[14px] leading-[21px] text-[var(--quiet)]">
                        {item.note}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </main>
      </div>
    </div>
  );
}
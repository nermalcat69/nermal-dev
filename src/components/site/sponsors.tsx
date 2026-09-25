import Image from "next/image";
import type { ReactNode } from "react";
import { sponsors, sponsorTiers, sponsorsInTier, type Sponsor } from "@/lib/links";

/**
 * Sponsor surfaces.
 *
 * Every variant returns `null` when there are no sponsors, so the empty state
 * costs nothing on the page. `sponsors` in `lib/links.ts` drives all of them.
 */

/**
 * Docs right rail, rendered into the TOC's `footer` slot so it sits directly
 * under the page outline. That position is deliberate: the eye already travels
 * to the right rail to find the TOC, and the cards land below the fold of a
 * long page, so a sponsor is never between the reader and the thing they came
 * for.
 *
 * Mirrors the tiered treatment used by Drizzle's docs: a small caption bar per
 * tier, a featured card for the paid tiers, and a compact icon grid for the
 * smaller ones.
 */
export function SponsorsAside() {
  if (sponsors.length === 0) return null;

  const tiers = sponsorTiers
    .map((tier) => ({ ...tier, sponsors: sponsorsInTier(tier.id) }))
    .filter((tier) => tier.sponsors.length > 0);

  return (
    <section aria-label="Sponsors" className="mt-8 flex flex-col gap-4">
      {tiers.map((tier) => (
        <div key={tier.id}>
          <p className="rounded-t-lg border border-b-0 border-fd-border bg-fd-muted/60 px-3 py-1.5 text-center text-[10px] font-medium tracking-[0.08em] text-fd-muted-foreground uppercase">
            {tier.label}
          </p>
          <div className="rounded-b-lg border border-fd-border bg-fd-card p-3">
            {"compact" in tier && tier.compact ? (
              <CompactGrid sponsors={tier.sponsors} />
            ) : (
              <ul className="flex flex-col items-center gap-4">
                {tier.sponsors.map((sponsor) => (
                  <li key={sponsor.name}>
                    <SponsorLink sponsor={sponsor} className="px-2 py-1">
                      <Image
                        src={sponsor.src}
                        alt={sponsor.name}
                        width={140}
                        height={28}
                        loading="lazy"
                        className="h-7 w-auto brightness-0 dark:invert"
                      />
                    </SponsorLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

/** Square icon tiles, three across, for the smaller tiers. */
function CompactGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {sponsors.map((sponsor) => (
        <li key={sponsor.name}>
          <SponsorLink
            sponsor={sponsor}
            className="flex aspect-square items-center justify-center rounded-md border border-fd-border transition-colors hover:bg-fd-accent/50"
          >
            {/* Intrinsic size carries the rendering: sizing a square mark with a
                one-sided CSS override triggers a Next.js aspect-ratio warning. */}
            <Image
              src={sponsor.icon ?? sponsor.src}
              alt=""
              width={20}
              height={20}
              loading="lazy"
              className="brightness-0 dark:invert"
            />
          </SponsorLink>
        </li>
      ))}
    </ul>
  );
}

function SponsorLink({
  sponsor,
  className,
  children,
}: {
  sponsor: Sponsor;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noreferrer sponsored"
      title={sponsor.name}
      className={`block rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-fd-ring ${className ?? ""}`}
    >
      <span className="sr-only">{sponsor.name}</span>
      {children}
    </a>
  );
}


/**
 * Footer strip, above the link columns. Sits inside the light "Get nermal"
 * section, so it is styled for the light surface rather than the dark band.
 */
export function SponsorsFooter() {
  if (sponsors.length === 0) return null;

  return (
    <div className="border-t border-black/10 pt-10">
      <h2 className="text-[20px] leading-[26px] font-medium tracking-[-0.02em]">Sponsors</h2>
      <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
        {sponsors.map((sponsor) => (
          <li key={sponsor.name}>
            <a
              href={sponsor.href}
              target="_blank"
              rel="noreferrer sponsored"
              className="inline-block rounded-sm py-1 text-[13px] text-[var(--quiet)] transition-colors duration-150 outline-none hover:text-[var(--ink)] focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            >
              {sponsor.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Below-the-content strip for the docs page.
 *
 * The right rail carrying `SponsorsAside` is `max-xl:hidden`, so on any viewport
 * under 1280px the tiered cards never render. This sits at the end of the
 * article instead, which is the one position visible at every width while still
 * landing after the content rather than in front of it. Hidden on `xl` and up so
 * it never duplicates the rail.
 */
export function SponsorsInline() {
  if (sponsors.length === 0) return null;

  // The wordmarks are wide (120x24); the goodies glyphs are square, so
  // constraining height and letting width auto would distort them. Only the
  // wordmarks belong in a horizontal strip.
  const wordmarks = sponsors.filter((sponsor) => sponsor.tier !== "goodies");

  if (wordmarks.length === 0) return null;

  return (
    <section aria-label="Sponsors" className="mt-12 rounded-xl border border-fd-border p-4 xl:hidden">
      <p className="text-xs tracking-[0.08em] text-fd-muted-foreground uppercase">Sponsored by</p>
      <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        {wordmarks.map((sponsor) => (
          <li key={sponsor.name}>
            <a
              href={sponsor.href}
              target="_blank"
              rel="noreferrer sponsored"
              className="block rounded-sm opacity-80 brightness-0 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-fd-ring dark:invert"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={120}
                height={24}
                loading="lazy"
                className="h-6 w-auto"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Logo wall for the dark "Recognised on sight" band on the landing page. Sits
 * directly under the adoption stats, where the reader's eye is already in
 * logo-scanning mode.
 */
export function SponsorsWall() {
  if (sponsors.length === 0) return null;

  return (
    <div className="mt-14 border-t border-white/10 pt-10">
      <h2 className="text-[13px] leading-[18px] font-normal text-[var(--contrast-muted)]">
        Sponsored by
      </h2>
      <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-5">
        {sponsors.map((sponsor) => (
          <li key={sponsor.name}>
            <a
              href={sponsor.href}
              target="_blank"
              rel="noreferrer sponsored"
              className="block rounded-sm opacity-70 brightness-0 transition-opacity duration-150 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--contrast)] dark:invert"
            >
              {/* Square glyphs and wide wordmarks cannot share one intrinsic
                  size, so the dimensions are declared per aspect. */}
              {sponsor.tier === "goodies" ? (
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={20}
                  height={20}
                  loading="lazy"
                />
              ) : (
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={120}
                  height={24}
                  loading="lazy"
                  className="h-6 w-auto"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
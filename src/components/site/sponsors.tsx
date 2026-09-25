import Image from "next/image";
import { sponsors } from "@/lib/links";

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
  return (
    <section aria-label="Sponsors" className="mt-8">
      <SponsorSlot className="h-28" />
    </section>
  );
}

/** Empty, dashed slot held open for a sponsor. */
function SponsorSlot({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-fd-border text-xs tracking-[0.08em] text-fd-muted-foreground uppercase ${className ?? ""}`}
    >
      Sponsor
    </div>
  );
}

/**
 * Footer strip, above the link columns. Sits inside the light "Get Nermal"
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
  return (
    <section aria-label="Sponsors" className="mt-12 xl:hidden">
      <SponsorSlot className="h-20" />
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
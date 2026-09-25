export const links = {
  repo: "https://github.com/nermalcat69/nermal-ide",
  releases: "https://github.com/nermalcat69/nermal-ide/releases",
  license: "https://github.com/nermalcat69/nermal-ide/blob/main/LICENSE",
  changelog: "https://github.com/nermalcat69/nermal-ide/blob/main/CHANGELOG.md",
  issues: "https://github.com/nermalcat69/nermal-ide/issues",
  discord: "https://discord.gg/s3dethqz2V",
  concepts: "https://github.com/nermalcat69/nermal-ide/blob/main/docs/getting-started/concepts.mdx",
  editor: "https://github.com/nermalcat69/nermal-ide/blob/main/docs/window/side-panel.mdx",
  agents: "https://github.com/nermalcat69/nermal-ide/blob/main/docs/agents/overview.mdx",
  git: "https://github.com/nermalcat69/nermal-ide/blob/main/docs/git/source-control.mdx",
  remote: "https://github.com/nermalcat69/nermal-ide/blob/main/docs/remote/workspaces.mdx",
  cli: "https://github.com/nermalcat69/nermal-ide/blob/main/docs/cli/overview.mdx",
  bench: "https://github.com/nermalcat69/nermal-ide/tree/main/scripts/bench",
} as const;

export const agents = [
  { name: "Claude Code", src: "/agents/claude.svg" },
  { name: "Cursor", src: "/agents/cursor.svg" },
  { name: "Gemini", src: "/agents/gemini.svg" },
  { name: "Grok", src: "/agents/grok.svg" },
  { name: "OpenCode", src: "/agents/opencode.svg" },
  { name: "Kimi", src: "/agents/kimi.svg" },
] as const;

export const bench = [
  {
    label: "11 MB cat",
    note: "lower is better",
    unit: "ms",
    values: [95, 239, 179, 185],
  },
  {
    label: "DOOM-fire",
    note: "higher is better",
    unit: "fps",
    values: [888, 485, 552, 617],
  },
  {
    label: "Cold launch",
    note: "memory",
    unit: "MB",
    values: [116, 105, 128, 130],
  },
] as const;

export const columns = ["nermal", "Alacritty", "Ghostty", "Kitty"] as const;

/**
 * Sponsors.
 *
 * The single source of truth for every sponsor surface. Each entry carries an
 * optional `tier`, which drives the docs right rail; the landing page uses the
 * whole list as a flat logo wall. Empty this array and every surface renders
 * nothing, which is the correct state until there is a real sponsor.
 *
 * - `tier`  groups the sponsor in the docs rail. Featured tiers render a
 *           full-width card; the `goodies` tier renders a compact icon grid.
 * - `icon`  square glyph used by compact tiers. Falls back to `src`.
 * - `src`   monochrome wordmark. Surfaces that need a flat colour apply
 *           `brightness-0 invert`, the same treatment as the agent logos.
 */
export type Sponsor = {
  name: string;
  src: string;
  href?: string;
  tier?: "backer" | "partner" | "goodies";
  icon?: string;
};

export const sponsors: Sponsor[] = [
  // PLACEHOLDERS — replace with real sponsors, then delete this note.
  { name: "Northwind", src: "/sponsors/northwind.svg", href: "https://example.com/northwind", tier: "backer" },
  { name: "Contour", src: "/sponsors/contour.svg", href: "https://example.com/contour", tier: "partner" },
  { name: "Atoll", src: "/sponsors/atoll.svg", href: "https://example.com/atoll", tier: "goodies" },
  { name: "Basalt", src: "/sponsors/basalt.svg", href: "https://example.com/basalt", tier: "goodies" },
  { name: "Cinder", src: "/sponsors/cinder.svg", href: "https://example.com/cinder", tier: "goodies" },
  { name: "Dune", src: "/sponsors/dune.svg", href: "https://example.com/dune", tier: "goodies" },
  { name: "Ember", src: "/sponsors/ember.svg", href: "https://example.com/ember", tier: "goodies" },
  { name: "Fjord", src: "/sponsors/fjord.svg", href: "https://example.com/fjord", tier: "goodies" },
];

/**
 * Tier order and labels for the docs rail. Tier order is the order here, so
 * moving a tier up is a one-line change. Tiers with no sponsors are skipped.
 */
export const sponsorTiers = [
  { id: "backer", label: "Our primary backer" },
  { id: "partner", label: "Our partner" },
  { id: "goodies", label: "Our goodies", compact: true },
] as const satisfies readonly {
  id: NonNullable<Sponsor["tier"]>;
  label: string;
  compact?: boolean;
}[];

/** Sponsors in a tier, in list order. */
export function sponsorsInTier(id: NonNullable<Sponsor["tier"]>) {
  return sponsors.filter((sponsor) => sponsor.tier === id);
}

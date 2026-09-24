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

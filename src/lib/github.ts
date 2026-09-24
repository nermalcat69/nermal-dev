export type RepoStats = {
  stars: number;
  downloads: number;
};

const FALLBACK: RepoStats = { stars: 14, downloads: 6 };

const REPO = "https://api.github.com/repos/nermalcat69/nermal-ide";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readStars(value: unknown): number | null {
  if (!isRecord(value)) return null;
  return typeof value.stargazers_count === "number" ? value.stargazers_count : null;
}

function readDownloads(value: unknown): number | null {
  if (!Array.isArray(value)) return null;
  let sum = 0;
  for (const release of value) {
    if (!isRecord(release) || !Array.isArray(release.assets)) continue;
    for (const asset of release.assets) {
      if (!isRecord(asset)) continue;
      const { name, download_count: count } = asset;
      if (typeof name !== "string" || typeof count !== "number") continue;
      // Installer archives only. Checksums and bundled server binaries are not the app.
      if (name === "checksums.txt" || name.startsWith("nermal-server")) continue;
      sum += count;
    }
  }
  return sum;
}

export async function loadStats(): Promise<RepoStats> {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "nermal-site",
    };
    const [repoRes, releaseRes] = await Promise.all([
      fetch(REPO, { headers, next: { revalidate: 3600 } }),
      fetch(`${REPO}/releases?per_page=10`, { headers, next: { revalidate: 3600 } }),
    ]);
    if (!repoRes.ok || !releaseRes.ok) return FALLBACK;
    const stars = readStars(await repoRes.json());
    const downloads = readDownloads(await releaseRes.json());
    if (stars === null || downloads === null) return FALLBACK;
    return { stars, downloads };
  } catch {
    return FALLBACK;
  }
}

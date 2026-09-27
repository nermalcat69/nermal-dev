// Mirrors GitHub release assets into R2 under stable, version-less names and serves them.
//   stable/nermal-macos-arm64.dmg   <- latest non-prerelease
//   nightly/nermal-macos-arm64.dmg  <- release tagged "nightly"
//   <channel>/state.json            <- change-detection signature + manifest

interface Env {
  BUCKET: R2Bucket;
  REPO: string;
  GITHUB_TOKEN?: string; // optional, lifts the 60 req/hr unauthenticated limit
}

type Asset = { id: number; name: string; updated_at: string; browser_download_url: string; size: number };
type Release = { tag_name: string; published_at: string; assets: Asset[] };

const CHANNELS = { stable: "releases/latest", nightly: "releases/tags/nightly" } as const;
type Channel = keyof typeof CHANNELS;

// nermal-0.0.2-macos-arm64.dmg / nermal-0.0.3-nightly.202609242115-linux-x86_64.AppImage -> nermal-<platform>...
const PLATFORM_FILE = /^nermal-\d+\.\d+\.\d+(?:-[\w.]+?)?-((?:linux|macos|windows)-.+)$/;

function stableName(name: string): string | null {
  if (name === "checksums.txt") return name;
  const m = PLATFORM_FILE.exec(name);
  return m ? `nermal-${m[1]}` : null;
}

async function github(env: Env, path: string): Promise<Release | null> {
  const res = await fetch(`https://api.github.com/repos/${env.REPO}/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "nermal-releases",
      ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.json();
}

async function syncChannel(env: Env, channel: Channel) {
  const release = await github(env, CHANNELS[channel]);
  if (!release) return;

  const files = release.assets.flatMap((a) => {
    const name = stableName(a.name);
    return name ? [{ asset: a, name }] : [];
  });
  const signature = files.map((f) => `${f.asset.id}:${f.asset.updated_at}`).sort().join(",");

  const stateKey = `${channel}/state.json`;
  const prev = await env.BUCKET.get(stateKey);
  if (prev && ((await prev.json()) as { signature: string }).signature === signature) return;

  for (const { asset, name } of files) {
    const res = await fetch(asset.browser_download_url);
    if (!res.ok || !res.body) throw new Error(`download ${asset.name}: ${res.status}`);
    await env.BUCKET.put(`${channel}/${name}`, res.body, {
      httpMetadata: { contentType: res.headers.get("content-type") ?? "application/octet-stream" },
      customMetadata: { source: asset.name, tag: release.tag_name },
    });
  }

  // Drop files the new release no longer ships.
  const keep = new Set(files.map((f) => `${channel}/${f.name}`).concat(stateKey));
  const { objects } = await env.BUCKET.list({ prefix: `${channel}/` });
  await env.BUCKET.delete(objects.map((o) => o.key).filter((k) => !keep.has(k)));

  // Written last: a half-finished sync retries on the next run.
  await env.BUCKET.put(
    stateKey,
    JSON.stringify({
      signature,
      tag: release.tag_name,
      published_at: release.published_at,
      files: files.map((f) => ({ name: f.name, size: f.asset.size })),
    }),
    { httpMetadata: { contentType: "application/json" } },
  );
}

async function sync(env: Env) {
  const results = await Promise.allSettled((Object.keys(CHANNELS) as Channel[]).map((c) => syncChannel(env, c)));
  for (const r of results) if (r.status === "rejected") console.error(r.reason);
}

export default {
  scheduled(_event: unknown, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
    ctx.waitUntil(sync(env));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });

    const key = decodeURIComponent(new URL(request.url).pathname.slice(1));
    if (!/^(stable|nightly)\/[\w.-]+$/.test(key)) return new Response("Not found", { status: 404 });

    const object = await env.BUCKET.get(key, { range: request.headers, onlyIf: request.headers });
    if (!object) return new Response("Not found", { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("accept-ranges", "bytes");
    // Names are stable but contents change per release, so keep the edge TTL short.
    headers.set("cache-control", "public, max-age=300");
    headers.set("access-control-allow-origin", "*");
    if (!key.endsWith("state.json")) headers.set("content-disposition", `attachment; filename="${key.split("/")[1]}"`);

    if (!("body" in object)) return new Response(null, { status: 304, headers }); // onlyIf failed
    return new Response(request.method === "HEAD" ? null : object.body, { status: object.range ? 206 : 200, headers });
  },
};

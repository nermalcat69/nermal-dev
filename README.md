# Nermal

Landing page and docs site for [Nermal](https://github.com/nermalcat69/nermal-ide), a terminal workbench with a built-in editor: persistent sessions, remote work, and AI agent support. Built with Astro; forked from Drizzle's docs site.

## Develop

```sh
pnpm install
pnpm dev
```

## Deploy (Cloudflare Workers static assets)

`wrangler.jsonc` serves the static `dist/` build, including `public/_redirects`.

```sh
pnpm exec wrangler login   # once
pnpm deploy                # PROD_BUILD=true build, then wrangler deploy
```

Or connect the repo in Cloudflare (Workers Builds) with build command `PROD_BUILD=true pnpm build` and deploy command `pnpm exec wrangler deploy`.

## 🚀 Project Structure

MDX files are located in this folder:

```text
├── src/
│   ├── content/
│   │   └── docs
```

Announcements markdown files:

```text
├── src/
│   ├──data/
│   │   └── announcements
```

Roadmap markdown file:

```text
├── src/
│   ├──data/
│   │   └── roadmap.md
```

Shipping section yaml file:

```text
├── src/
│   ├──data/
│   │   └── shipping.yaml
```

```
progress: number
weeks:
  - date:
      start: "YYYY-MM-DD"
    details:
      - string
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
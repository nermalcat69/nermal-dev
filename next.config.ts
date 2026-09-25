import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {async rewrites() {
  return [
    {
      source: '/docs/:slug*.md',
      destination: '/llms.mdx/docs/:slug*/content.md',
    },
  ];
}};

const withMDX = createMDX();

export default withMDX(nextConfig);

initOpenNextCloudflareForDev();

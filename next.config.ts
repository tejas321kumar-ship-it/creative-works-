import type { NextConfig } from "next";

// Static export: every page is prerendered to plain HTML in `out/`.
// Deploys as a Render Static Site (see render.yaml), or to any static host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

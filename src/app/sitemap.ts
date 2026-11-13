import type { MetadataRoute } from "next";
import { projects, site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "work/", "services/", "clients/", "about/", "contact/", ...projects.map((p) => `work/${p.slug}/`)];
  return pages.map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p.startsWith("work/") && p !== "work/" ? 0.6 : 0.8 }));
}

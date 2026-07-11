import type { MetadataRoute } from "next";
import { publishedCrosshairs } from "@/lib/data/crosshairs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/crosshairs", changeFrequency: "weekly", priority: 0.9 },
    { path: "/agents-maps", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 }
  ] as const;

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map(({ path, ...entry }) => ({
    url: `${site.siteUrl}${path}`,
    lastModified: new Date("2026-07-11"),
    ...entry
  }));

  const crosshairRoutes: MetadataRoute.Sitemap = publishedCrosshairs.map((crosshair) => ({
    url: `${site.siteUrl}/crosshairs/${crosshair.id}`,
    lastModified: new Date(crosshair.lastUpdated),
    changeFrequency: "monthly",
    priority: crosshair.featured ? 0.8 : 0.7
  }));

  return [...staticRoutes, ...crosshairRoutes];
}

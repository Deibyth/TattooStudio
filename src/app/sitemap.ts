import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Sitemap del sitio. Hoy la landing es una sola página; cuando existan más
 * rutas (ej. blog, términos) basta con agregarlas al array.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.home,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
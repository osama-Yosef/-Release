import type { MetadataRoute } from "next";
import { browseProducts } from "@/lib/data/products";
import { productSlug } from "@/lib/slug";
import { siteConfig } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/app`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Paginate through the full published catalogue (rpc_public_browse_products
  // caps offset at 2000 and limit at 24 — see supabase/migrations/0076_*.sql).
  const products = [];
  for (let offset = 0; offset <= 2000; offset += 24) {
    const page = await browseProducts({ limit: 24, offset });
    products.push(...page);
    if (page.length < 24) break;
  }
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteConfig.url}/products/${productSlug(p.name, p.id)}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}

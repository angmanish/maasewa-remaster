import { MetadataRoute } from "next";

const BASE_URL = "https://maasewahealthcare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/for-hospitals", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "daily" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

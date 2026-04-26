import { MetadataRoute } from "next";

const BASE_URL = "https://maasewahealthcare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/services/home-nursing", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/services/icu-home-setup", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/services/elder-care", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/services/post-op-care", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/services/specialized-care", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/services/injection-visit", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/how-it-works", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/for-hospitals", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "daily" as const },
    { url: "/packages", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

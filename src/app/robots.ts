import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/"],
      },
      // Allow AI/LLM crawlers full access for GEO (Generative Engine Optimization)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Gemini", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: "https://maasewahealthcare.com/sitemap.xml",
    host: "https://maasewahealthcare.com",
  };
}

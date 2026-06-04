import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: "/private/",
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Extended",
        allow: "/",
      },
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
    host: DATA.url,
  };
}

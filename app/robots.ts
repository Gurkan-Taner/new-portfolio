import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

// Moteurs de recherche et assistants IA (recherche et citation) explicitement
// autorisés : le but du site est d'être trouvé et cité.
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
  };
}

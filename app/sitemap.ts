import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { DATA_BLOG } from "@/data/blog-posts";
import { parseFrenchDate } from "@/lib/date";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url.endsWith("/") ? DATA.url.slice(0, -1) : DATA.url;

  const posts = DATA_BLOG;

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: parseFrenchDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}

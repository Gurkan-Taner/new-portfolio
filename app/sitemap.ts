import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { DATA_BLOG } from "@/data/blog-posts";
import { parseFrenchDate } from "@/lib/date";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = DATA.url.replace(/\/$/, "");
  const posts = DATA_BLOG.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: parseFrenchDate(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
    images: [`${base}/blog/${post.slug}/opengraph-image`],
  }));
  const latestPost = posts.reduce<Date | undefined>(
    (d, p) => (!d || p.lastModified > d ? p.lastModified : d),
    undefined
  );

  const projectImages = DATA.projects
    .map((p) => p.image)
    .filter(Boolean)
    .map((src) => `${base}${src}`);

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${base}/me.png`, ...projectImages],
    },
    {
      url: `${base}/blog`,
      lastModified: latestPost ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}

import { DATA_BLOG } from "@/data/blog-posts";
import { DATA } from "@/data/resume";
import { parseFrenchDate } from "@/lib/date";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = DATA_BLOG.map((post) => {
    const url = `${DATA.url}/blog/${post.slug}`;
    return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(post.excerpt)}</description>
      <category>${esc(post.category)}</category>
      <pubDate>${parseFrenchDate(post.date).toUTCString()}</pubDate>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de ${esc(DATA.name)}</title>
    <link>${DATA.url}/blog</link>
    <description>Retours d'expérience sur Next.js, TypeScript, le DevOps et la culture engineering.</description>
    <language>fr-FR</language>
    <atom:link href="${DATA.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

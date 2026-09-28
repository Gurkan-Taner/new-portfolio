import { ImageResponse } from "next/og";

import { DATA_BLOG } from "@/data/blog-posts";
import { DATA } from "@/data/resume";
import { OG, OgWindow, ogFonts, ogSize } from "@/lib/og";

export const alt = "Article du blog de Gurkan Taner";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return DATA_BLOG.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = DATA_BLOG.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <OgWindow title={`less ${slug}.md`} cmd="gurkan-taner.fr/blog">
        <div style={{ fontSize: 34, color: OG.cyan }}>
          {post ? `${post.category}, ${post.date}, ${post.readTime} de lecture` : "Blog"}
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 0.95,
            color: OG.yellow,
            marginTop: 18,
            maxWidth: 960,
          }}
        >
          {/* Pas de coupure de ligne juste après un « / » (CI/CD) */}
          {(post?.title ?? "Article").replace(/\//g, "/\u2060")}
        </div>
        <div style={{ fontSize: 36, color: OG.fg, marginTop: "auto" }}>
          {`${DATA.name}, software engineer freelance`}
        </div>
      </OgWindow>
    ),
    { ...size, fonts: await ogFonts() }
  );
}

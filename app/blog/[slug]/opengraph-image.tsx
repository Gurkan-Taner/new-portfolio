import { ImageResponse } from "next/og";
import { DATA_BLOG } from "@/data/blog-posts";
import { DATA } from "@/data/resume";

export const alt = "Article de blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const post = DATA_BLOG.find((p) => p.slug === params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.18) 0%, transparent 60%)",
          }}
        />
        {post?.category && (
          <div
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.35)",
              color: "#93c5fd",
              borderRadius: "6px",
              padding: "6px 14px",
              fontSize: "15px",
              marginBottom: "22px",
              display: "flex",
            }}
          >
            {post.category}
          </div>
        )}
        <div
          style={{
            color: "#ffffff",
            fontSize: "52px",
            fontWeight: "bold",
            lineHeight: 1.2,
            marginBottom: "20px",
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {post?.title ?? "Article"}
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: "22px",
            maxWidth: "820px",
            marginBottom: "44px",
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          {post?.excerpt}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#6b7280",
            fontSize: "18px",
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: "600" }}>
            {DATA.name}
          </span>
          <span style={{ color: "#374151" }}>·</span>
          <span>{post?.date}</span>
          <span style={{ color: "#374151" }}>·</span>
          <span>{post?.readTime} de lecture</span>
        </div>
      </div>
    ),
    size
  );
}

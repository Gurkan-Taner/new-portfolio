import { use } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DATA_BLOG } from "@/data/blog-posts";
import BlogPostView from "@/components/blog/blog-post-view";

export async function generateStaticParams() {
  return DATA_BLOG.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = DATA_BLOG.find((p) => p.slug === slug);

  return {
    title: `${post?.title} | Ton Portfolio`,
    description: post?.excerpt,
  };
}

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = DATA_BLOG.find((p) => p.slug === slug);

  if (!post) return notFound();

  return <BlogPostView post={post} />;
}

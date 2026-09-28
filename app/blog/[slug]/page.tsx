import { use } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DATA_BLOG } from "@/data/blog-posts";
import { DATA } from "@/data/resume";
import { parseFrenchDate } from "@/lib/date";
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

  if (!post) return {};

  const postUrl = `${DATA.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category],
    authors: [{ name: DATA.name, url: DATA.url }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: parseFrenchDate(post.date).toISOString(),
      modifiedTime: parseFrenchDate(post.date).toISOString(),
      section: post.category,
      tags: [...post.tags],
      authors: [DATA.url],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
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

  const postUrl = `${DATA.url}/blog/${post.slug}`;

  const published = parseFrenchDate(post.date).toISOString();
  const words = post.content
    .map((c) => c.text)
    .join(" ")
    .split(/\s+/).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    mainEntityOfPage: postUrl,
    image: `${postUrl}/opengraph-image`,
    datePublished: published,
    dateModified: published,
    author: { "@type": "Person", "@id": `${DATA.url}/#person`, name: DATA.name, url: DATA.url },
    publisher: { "@id": `${DATA.url}/#person` },
    isPartOf: { "@id": `${DATA.url}/#website` },
    articleSection: post.category,
    wordCount: words,
    keywords: post.tags.join(", "),
    timeRequired: `PT${parseInt(post.readTime)}M`,
    inLanguage: "fr-FR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: DATA.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${DATA.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostView post={post} />
    </>
  );
}

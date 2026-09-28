import { Metadata } from "next";
import Link from "next/link";

import { DATA_BLOG } from "@/data/blog-posts";
import { DATA } from "@/data/resume";
import { parseFrenchDate } from "@/lib/date";
import Footer from "@/components/tui/footer";
import Window from "@/components/tui/window";

const TITLE = "Blog technique : Next.js, DevOps et architecture";
const DESCRIPTION =
  "Retours d'expérience de Gurkan Taner, software engineer freelance à Strasbourg, sur Next.js, TypeScript, le DevOps et la culture engineering.";
const BLOG_URL = `${DATA.url}/blog`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: BLOG_URL,
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Blog de Gurkan Taner" }] },
  },
  openGraph: {
    title: `${TITLE} | ${DATA.name}`,
    description: DESCRIPTION,
    url: BLOG_URL,
    type: "website",
    locale: "fr_FR",
    siteName: DATA.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${DATA.name}`,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${BLOG_URL}#blog`,
      name: TITLE,
      description: DESCRIPTION,
      url: BLOG_URL,
      inLanguage: "fr-FR",
      author: { "@id": `${DATA.url}/#person` },
      publisher: { "@id": `${DATA.url}/#person` },
      isPartOf: { "@id": `${DATA.url}/#website` },
      blogPost: DATA_BLOG.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `${BLOG_URL}/${post.slug}`,
        datePublished: parseFrenchDate(post.date).toISOString(),
        author: { "@id": `${DATA.url}/#person` },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: DATA.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_URL },
      ],
    },
  ],
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[64rem] px-4 md:px-8 pt-16 md:pt-20 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Window title="~/blog" titleAs="p" cmd="ls -l ~/blog">
        <h1 className="ui text-4xl md:text-5xl leading-none text-yellow mb-4 text-balance">
          {TITLE}
        </h1>
        <p className="max-w-[60ch] text-fg-dim mb-8">
          Retours d&apos;expérience sur le développement web, le DevOps et la
          culture engineering, écrits depuis Strasbourg.
        </p>
        <ul className="flex flex-col">
          {DATA_BLOG.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid md:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-5 border-t-2 border-fg-dim hover:bg-cyan hover:text-ink focus-visible:bg-cyan focus-visible:text-ink px-3 -mx-3"
              >
                <span className="ui text-xl text-fg-dim group-hover:text-ink">
                  <time dateTime={parseFrenchDate(post.date).toISOString().slice(0, 10)}>
                    {post.date}
                  </time>
                  <br className="hidden md:block" />
                  <span className="md:hidden">, </span>
                  {post.readTime} de lecture
                </span>
                <div>
                  <h2 className="ui text-3xl leading-none text-yellow group-hover:text-ink mb-2">
                    {post.title}
                  </h2>
                  <p className="max-w-[65ch]">{post.excerpt}</p>
                  <p className="ui text-xl text-fg-dim group-hover:text-ink">
                    {post.category}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Window>
      <Footer />
    </main>
  );
}

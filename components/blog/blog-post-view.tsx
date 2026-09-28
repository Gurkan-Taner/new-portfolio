"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Footer from "@/components/tui/footer";
import Window from "@/components/tui/window";
import { BlogPost } from "@/data/blog-posts";
import { DATA } from "@/data/resume";
import { parseFrenchDate } from "@/lib/date";
import { isTyping } from "@/lib/sections";

export default function BlogPostView({ post }: { post: BlogPost }) {
  const router = useRouter();

  // Comme dans less : « q » pour quitter la lecture.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "q" && !isTyping(e)) router.push("/blog");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="mx-auto max-w-[56rem] px-4 md:px-8 pt-16 md:pt-20 flex flex-col gap-16">
      <Window as="article" title={`less ${post.slug}.md`} titleAs="p">
        <Link
          href="/blog"
          aria-keyshortcuts="q"
          className="ui text-xl text-fg-dim hover:text-cyan inline-block mb-8"
        >
          ← Retour au blog
        </Link>

        <header className="mb-10">
          <p className="ui text-xl text-cyan mb-2">
            {post.category},{" "}
            <time dateTime={parseFrenchDate(post.date).toISOString().slice(0, 10)}>
              {post.date}
            </time>
            , {post.readTime} de lecture, par{" "}
            <Link href="/" rel="author" className="underline underline-offset-4 hover:text-yellow">
              {DATA.name}
            </Link>
          </p>
          <h1 className="ui text-5xl md:text-6xl leading-[0.95] text-yellow text-balance">
            {post.title}
          </h1>
        </header>

        <div className="flex flex-col gap-6 max-w-[68ch] text-base leading-[1.75]">
          {post.content.map((item, i) => {
            if (item.type === "heading") {
              return (
                <h2 key={i} className="ui text-4xl leading-none text-yellow mt-8">
                  <span className="text-fg-dim" aria-hidden="true">
                    ##{" "}
                  </span>
                  {item.text}
                </h2>
              );
            }
            if (item.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-cyan pl-5 py-1 text-cyan"
                >
                  {item.text}
                </blockquote>
              );
            }
            return <p key={i}>{item.text}</p>;
          })}
        </div>

        <footer className="mt-12 pt-6 border-t-2 border-fg-dim flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-x-4 ui text-xl text-fg-dim">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
          <p className="ui text-xl bg-fg text-ink px-2" aria-hidden="true">
            (END) q pour revenir au blog
          </p>
        </footer>
      </Window>
      <Footer />
    </main>
  );
}

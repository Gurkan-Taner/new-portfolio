"use client";

import { Calendar, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import LenisScroller from "@/components/lenis-scroller";
import Footer from "@/components/sections/footer";
import { BlogPost } from "@/data/blog-posts";

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <LenisScroller>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-600/5 to-transparent blur-[120px]" />
        </div>

        <main className="container mx-auto px-6 relative z-10 pt-32 pb-24">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Retour aux articles
          </Link>

          <article className="max-w-3xl mx-auto">
            <header className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {post.category}
                </span>
                <span className="text-xs font-medium text-gray-500 flex items-center gap-2">
                  <Clock size={14} /> {post.readTime} de lecture
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold leading-[1.1] mb-8 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent"
              >
                {post.title}
              </motion.h1>

              <div className="flex items-center justify-between py-6 border-y border-white/5 text-[11px] font-bold text-gray-500 uppercase">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    G
                  </div>
                  <span className="text-white">Gürkan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500" />
                  {post.date}
                </div>
              </div>
            </header>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {post.content.map((item, index) => {
                if (item.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4"
                    >
                      {item.text}
                    </h2>
                  );
                }
                if (item.type === "quote") {
                  return (
                    <blockquote
                      key={index}
                      className="my-10 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-white font-medium italic relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      "{item.text}"
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-gray-400 leading-loose text-lg"
                  >
                    {item.text}
                  </p>
                );
              })}
            </motion.div>

            <footer className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-gray-500 border border-white/10 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </footer>
          </article>
        </main>
        <Footer />
      </div>
    </LenisScroller>
  );
}

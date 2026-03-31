"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlogCard({ post, index }: { post: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="relative h-full flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/5">
          {/* Glow effect on hover */}
          <div className="absolute -inset-x-20 -top-20 h-40 w-40 bg-purple-600/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Badge Catégorie */}
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {post.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
            {post.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
              <Calendar size={13} className="text-blue-500" />
              {post.date}
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
              Lire plus <ArrowRight size={14} className="text-blue-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

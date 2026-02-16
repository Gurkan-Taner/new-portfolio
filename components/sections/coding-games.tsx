"use client";

import { motion } from "framer-motion";

import { DATA } from "@/data/resume";
import { SectionTitle } from "@/components/section-title";
import Image from "next/image";
import Link from "next/link";
import { ProjectIcon } from "./projects";

export default function CodingGames() {
  return (
    <>
      <SectionTitle title="Game Dev" subtitle="C / Raylib Playground" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DATA.codingGames.map((game, i) => (
          <motion.div
            key={`${game} - ${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="group relative rounded-3xl overflow-hidden bg-[#111] border border-white/10"
          >
            <div className="aspect-video relative overflow-hidden bg-gray-900 opacity-60 group-hover:opacity-100 transition-opacity">
              <Image
                src={game.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                alt={`game ${game.title}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{game.title}</h3>
                <div className="flex gap-2">
                  {game.links?.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link relative p-2.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300"
                      title={link.type}
                    >
                      <ProjectIcon type={link.icon || link.type} />

                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-[10px] font-bold rounded opacity-0 group-hover/link:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                        {link.type}
                      </span>
                    </Link>
                  ))}{" "}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {game.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-tighter px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}



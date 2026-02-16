"use client";

import { DATA } from "@/data/resume";
import { SectionTitle } from "@/components/section-title";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar } from "lucide-react";
import { useRef } from "react";

export default function Parcours() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="relative" ref={containerRef}>
      <SectionTitle title="Expériences" subtitle="Mon Parcours Professionnel" />

      <div className="relative max-w-4xl mx-auto mt-16">
        <div className="absolute left-0 md:left-[7px] top-2 bottom-2 w-[2px] bg-white/5" />

        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-0 md:left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-purple-600 to-transparent z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />

        <div className="space-y-16">
          {DATA.work.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 md:pl-16 group"
            >
              <div className="absolute left-[-6px] md:left-0 top-1.5 z-20">
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#050505] border-2 border-gray-700 group-hover:border-blue-400 group-hover:scale-125 transition-all duration-300" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-blue-500 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="relative group/card overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/5">
                <div className="absolute -inset-x-20 -top-20 h-40 w-40 bg-blue-600/10 blur-[100px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl md:text-2xl font-bold text-white group-hover/card:text-blue-400 transition-colors">
                          {exp.title}
                        </h4>
                      </div>
                      <p className="text-lg font-medium text-gray-400 flex items-center gap-2 italic">
                        @ {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-tighter text-gray-300 uppercase">
                      <Calendar size={13} className="text-blue-500" />
                      {exp.start} — {exp.end}
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-3xl">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.badges?.map((badge, bIdx) => (
                      <motion.span
                        key={bIdx}
                        whileHover={{ y: -2 }}
                        className="text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-md bg-white/[0.03] text-gray-400 border border-white/10 hover:border-blue-500/50 hover:text-white transition-all cursor-default"
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

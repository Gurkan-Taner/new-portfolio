"use client";

import { DATA } from "@/data/resume";
import { SectionTitle } from "../section-title";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { useRef } from "react";

export default function Cursus() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <SectionTitle title="Cursus" subtitle="Mon parcours académique" />

      <div className="relative mt-16">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />

        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />

        <div className="space-y-12 md:space-y-0">
          {DATA.education.map((edu, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className="relative flex items-center justify-between md:justify-normal group"
              >
                <div
                  className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 shadow-2xl group-hover:shadow-blue-500/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        {edu.start} - {edu.end}
                      </span>
                      <GraduationCap
                        className="text-gray-600 group-hover:text-blue-400 transition-colors duration-500"
                        size={18}
                      />
                    </div>

                    <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">
                      {edu.degree}
                    </h4>

                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} className="text-purple-500/70" />
                      <span className="text-sm font-medium italic leading-none">
                        {edu.school}
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-widest text-gray-600">
                        Status
                      </span>
                      <span className="text-[10px] font-semibold text-gray-300">
                        Certifié
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div
                  className={`hidden md:block absolute top-1/2 h-[1px] bg-white/10 w-12 ${isEven ? "left-1/2" : "right-1/2"}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

import { DATA } from "@/data/resume";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

const Typewriter = ({ text }: { text: string }) => {
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.5,
      },
    },
  };

  const charVariants = {
    hidden: { display: "none" },
    visible: { display: "inline" },
  };

  return (
    <motion.div
      className="flex flex-wrap items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
        >
          {char === " " ? (
            <span className="w-[0.25em] inline-block">&nbsp;</span>
          ) : (
            char
          )}
        </motion.span>
      ))}

      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear",
        }}
        className="inline-block w-[10px] h-[0.9em] md:w-[15px] bg-blue-500 ml-1 shadow-[0_0_15px_rgba(59,130,246,0.9)] self-center"
      />
    </motion.div>
  );
};

export default function Hero() {
  return (
    <>
      <BlurFade delay={0.1}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Disponible pour de nouveaux projets
        </div>
      </BlurFade>
      <BlurFade delay={0.2}>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8 min-h-[140px] md:min-h-[240px] max-w-4xl">
          <Typewriter text="ENGINEERING THE NEXTGEN SAAS." />
        </h1>
      </BlurFade>

      <BlurFade delay={0.4}>
        <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {["Next.js", "Nest", "Python", "Docker"].map((tech) => (
            <div key={tech} className="group relative cursor-default">
              <span className="text-sm md:text-base font-mono font-bold tracking-widest text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                {tech.toUpperCase()}
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>
      </BlurFade>
      <BlurFade delay={0.3}>
        <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
          {DATA.summary}
          <span className="text-white block mt-4 font-medium italic">
            Software Engineer | DevOps | Cybersecurity enthousiast
          </span>
        </p>
      </BlurFade>
      <BlurFade delay={0.4}>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 "
          >
            <span className="relative z-10 flex items-center gap-2">
              Lancer mon projet <Zap size={18} fill="currentColor" />
            </span>
          </Link>
          <Link
            href="#projects"
            className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-medium transition-all"
          >
            Voir mes travaux
          </Link>
        </div>
      </BlurFade>
    </>
  );
}

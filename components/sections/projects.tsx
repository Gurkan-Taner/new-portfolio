"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { CodeIcon } from "lucide-react";

import ProjectCarousel from "../project-carousel";

import ProjectProps from "@/interfaces/project-props";
import { useParallax } from "@/lib/utils";

export default function Projects({ projects }: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const projectScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const projectY = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const projectOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const iconX = useParallax(scrollYProgress, -20);
  const titleX = useParallax(scrollYProgress, 20);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      }}
      style={{
        scale: projectScale,
        y: projectY,
        opacity: projectOpacity,
      }}
      className="mb-8 relative py-10"
    >
      <motion.div
        className="flex items-center justify-center mb-8 overflow-hidden"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <motion.div style={{ x: iconX }} className="relative">
          <CodeIcon className="mr-4 w-12 h-12 duration-300" />
        </motion.div>

        <motion.h3
          style={{ x: titleX }}
          className="text-4xl font-bold bg-gradient-to-r bg-clip-text "
        >
          Mes Projets
        </motion.h3>
      </motion.div>

      <motion.p
        className="text-center text-gray-300 mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: "easeOut",
        }}
      >
        Une collection de projets variés, allant d&apos;applications web simples
        à des solutions complexes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: "easeOut",
        }}
      >
        <ProjectCarousel projects={projects} />
      </motion.div>
    </motion.section>
  );
}

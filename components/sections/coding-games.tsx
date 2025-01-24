"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Gamepad } from "lucide-react";
import { useRef } from "react";
import ProjectCarousel from "../project-carousel";

import ProjectProps from "@/interfaces/project-props";

export default function CodingGames({ projects }: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const codingGamesScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const codingGamesY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const codingGamesOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <motion.section
      ref={ref}
      style={{
        scale: codingGamesScale,
        y: codingGamesY,
        opacity: codingGamesOpacity,
      }}
      className="mb-16 relative"
    >
      <div className="flex items-center justify-center mb-8">
        <Gamepad className="mr-4 w-10 h-10" />
        <h3 className="text-4xl font-bold">Coding Games</h3>
      </div>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        Exploration créative du développement de jeux en C avec la bibliothèque
        Raylib.
      </p>
      <ProjectCarousel projects={projects} />
    </motion.section>
  );
}

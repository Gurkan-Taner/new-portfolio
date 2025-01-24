"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CodeIcon } from "lucide-react";
import { useRef } from "react";
import ProjectCarousel from "./project-carousel";

export default function Projects({ projects }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const projectScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const projectY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const projectOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <motion.section
      ref={ref}
      style={{
        scale: projectScale,
        y: projectY,
        opacity: projectOpacity,
      }}
      className="mb-16"
    >
      <div className="flex items-center justify-center mb-8">
        <CodeIcon className="mr-4 w-10 h-10" />
        <h3 className="text-4xl font-bold">Mes Projets</h3>
      </div>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        Une collection de projets variés, allant d'applications web simples à
        des solutions complexes.
      </p>
      <ProjectCarousel projects={projects} />
    </motion.section>
  );
}

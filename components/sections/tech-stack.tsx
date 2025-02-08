"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion";

import Image from "next/image";
import { Braces } from "lucide-react";

import { useParallax } from "@/lib/utils";

export default function TechStack() {
  const technologies = [
    {
      name: "C++",
      logo: "/stack/cpp.png",
    },
    {
      name: "C",
      logo: "/stack/c.png",
    },
    {
      name: "Python",
      logo: "/stack/python.png",
    },
    {
      name: "TypeScript",
      logo: "/stack/typescript.png",
    },
    {
      name: "Docker",
      logo: "/stack/docker.png",
    },
    {
      name: "Github",
      logo: "/stack/github.png",
    },
    {
      name: "NodeJS",
      logo: "/stack/nodejs.svg",
    },
  ];

  const [width, setWidth] = useState(0);
  const controls = useAnimationControls();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const stackScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const stackY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const stackOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const iconX = useParallax(scrollYProgress, -20);
  const titleX = useParallax(scrollYProgress, 20);

  useEffect(() => {
    const techWidth = 176;
    const totalWidth = technologies.length * techWidth;
    setWidth(totalWidth);

    const animate = async () => {
      await controls.start({
        x: -width,
        transition: {
          duration: 20,
          ease: "linear",
        },
      });
      controls.set({ x: 0 });
      animate();
    };

    animate();
  }, [width, controls, technologies.length]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        scale: stackScale,
        y: stackY,
        opacity: stackOpacity,
      }}
      transition={{
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      }}
      className="mb-16 relative py-10"
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
          <Braces className="mr-4 w-10 h-10" />
        </motion.div>
        <motion.h3
          style={{ x: titleX }}
          className="text-4xl font-bold bg-gradient-to-r bg-clip-text "
        >
          Technologies
        </motion.h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: "easeOut",
        }}
        className="w-full py-20 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm" />

        <div className="relative flex">
          <motion.div className="flex gap-8 relative" animate={controls}>
            {technologies.map((tech, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 w-36"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className="group h-44 flex flex-col items-center justify-center 
                bg-[#1F1F1F]/80 backdrop-blur-md rounded-xl
                border border-white/5 hover:border-white/20 
                transition-all duration-300 shadow-lg
                hover:shadow-purple-500/20 hover:bg-[#1F1F1F]"
                >
                  <div className="relative w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      fill
                      className="drop-shadow-lg"
                    />
                  </div>
                  <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </p>
                </div>
              </motion.div>
            ))}

            {technologies.map((tech, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 w-36"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className="group h-44 flex flex-col items-center justify-center 
                bg-[#1F1F1F]/80 backdrop-blur-md rounded-xl
                border border-white/5 hover:border-white/20 
                transition-all duration-300 shadow-lg
                hover:shadow-purple-500/20 hover:bg-[#1F1F1F]"
                >
                  <div className="relative w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      fill
                      className="drop-shadow-lg"
                    />
                  </div>
                  <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

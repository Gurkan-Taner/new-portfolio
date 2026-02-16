"use client";

import { DATA } from "@/data/resume";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { SectionTitle } from "@/components/section-title";

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

  return (
    <>
      <SectionTitle title="Outils" subtitle="Technologies & Maîtrise" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {DATA.skills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{
              y: -5,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 group transition-colors"
          >
            <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
              <Terminal size={24} />
            </div>
            <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}



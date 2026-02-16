"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { DATA } from "@/data/resume";
import { SectionTitle } from "@/components/section-title";
import { BlurFade } from "@/components/ui/blur-fade";
import { ExternalLink, Github, Globe } from "lucide-react";

export const ProjectIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "github":
    case "source":
      return <Github size={18} />;
    case "website":
    case "visit":
      return <Globe size={18} />;
    default:
      return <ExternalLink size={18} />;
  }
};

export default function Projects() {
  return (
    <>
      <SectionTitle title="Projets" subtitle="Sélection de réalisations" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DATA.projects.map((project, idx) => (
          <BlurFade key={project.title} delay={0.1 * idx}>
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 h-full flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900 flex-shrink-0">
                {project.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={project.image}
                    alt={`projet ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.links?.map((link, lIdx) => (
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
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
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
          </BlurFade>
        ))}
      </div>
    </>
  );
}



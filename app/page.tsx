import Header from "@/components/header";
import Projects from "@/components/projects";
import CodingGames from "@/components/coding-games";

import { DATA } from "@/data/resume";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div
      className="
      min-h-screen 
      bg-[#1A1A1A] 
      text-gray-200 
      flex 
      flex-col 
      relative 
      overflow-hidden
    "
    >
      {/* Ligne de fond floue avec dégradé */}
      <div
        className="
          absolute 
          top-0 
          left-0 
          right-0 
          h-full
          bg-gradient-to-r 
          from-blue-500/50 
          via-purple-500/50 
          to-pink-500/50 
          blur-xl 
        "
      />

      {/* Effet de flou général */}
      <div
        className="
          absolute 
          inset-0 
          bg-gradient-to-br 
          from-[#1A1A1A] 
          via-[#1F1F1F] 
          to-[#222222] 
          opacity-70 
          blur-3xl
        "
      />

      <div
        className="
          container 
          mx-auto 
          px-4 
          py-16 
          max-w-5xl 
          relative 
          z-10
        "
      >
        <Header />
        <Projects projects={DATA.projects} />
        <CodingGames projects={DATA.codingGames} />
        <Contact />
      </div>

      <footer
        className="
          bg-black/20 
          backdrop-blur-md 
          text-center 
          py-6 
          mt-64 
          relative 
          z-10
        "
      >
        <p className="text-gray-400">
          © {new Date().getFullYear()} - Gurkan TANER
        </p>
      </footer>
    </div>
  );
}

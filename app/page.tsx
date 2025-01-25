import { BlurFade } from "@/components/ui/blur-fade";

import Header from "@/components/sections/header";
import Projects from "@/components/sections/projects";
import CodingGames from "@/components/sections/coding-games";
import Contact from "@/components/sections/contact";
import SectionNavigator from "@/components/section-navigation";

import { DATA } from "@/data/resume";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-200 flex flex-col relative overflow-hidden">
      {/* Ligne de fond floue avec dégradé */}
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 blur-xl" />

      {/* Effet de flou général */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#222222] opacity-70 blur-3xl" />

      <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        <section id="header">
          <BlurFade delay={0.25} inView>
            <Header />
          </BlurFade>
        </section>
        <section id="projects">
          <BlurFade delay={0.25}>
            <Projects projects={DATA.projects} />
          </BlurFade>
        </section>
        <section id="coding-games">
          <BlurFade delay={0.25}>
            <CodingGames projects={DATA.codingGames} />
          </BlurFade>
        </section>
        <section id="contact">
          <BlurFade delay={0.25}>
            <Contact />
          </BlurFade>
        </section>
        <SectionNavigator />
      </div>

      <footer className="bg-black/20 backdrop-blur-md text-center py-12 mt-48 relative">
        <p className="text-gray-400">
          © {new Date().getFullYear()} - Gurkan TANER
        </p>
      </footer>
    </div>
  );
}

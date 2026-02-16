import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import CodingGames from "@/components/sections/coding-games";
import TechStack from "@/components/sections/tech-stack";
import Parcours from "@/components/sections/parcours";
import Cursus from "@/components/sections/cursus";
import Projects from "@/components/sections/projects";
import ProgressBar from "@/components/progress-bar";
import Hero from "@/components/sections/hero";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>
      <ProgressBar />
      <main className="container mx-auto px-6 relative z-10">
        <section className="min-h-screen flex flex-col justify-center pt-20">
          <Hero />
        </section>

        <section id="projects" className="py-24">
          <Projects />
        </section>

        <section id="stack" className="py-24">
          <TechStack />
        </section>

        <section className="py-24 grid xl:grid-cols-2 gap-16">
          <Parcours />
          <Cursus />
        </section>

        <section id="coding-games" className="py-24">
          <CodingGames />
        </section>

        <section id="contact" className="py-32 relative">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}


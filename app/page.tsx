import Image from "next/image";

import ProjectCarousel from "@/components/ProjectCarousel";

import { DATA } from "@/data/resume";

export default function Home() {
  const projects = [
    {
      title: "Snake",
      description: "Snake game",
      image: "/coding_games/snake.png",
    },
    {
      title: "Pong",
      description: "Pong game",
      image: "/coding_games/pong.png",
    },
    {
      title: "Puissance 4",
      description: "Puissance 4 game",
      image: "/coding_games/puissance4.png",
    },
    {
      title: "Space Invader",
      description: "Space Invader game",
      image: "/coding_games/space_invader.png",
    },
    {
      title: "Tic Tac Toe",
      description: "Tic Tac Toe game",
      image: "/coding_games/tictactoe.png",
    },
  ];

  return (
    <div className="flex flex-1 flex-col font-[family-name:var(--font-geist-sans)] bg-primary-100">
      <header className="p-8 bg-header-100 rounded-lg flex flex-col items-center w-1/4 m-auto text-white shadow-inner shadow-white text-center gap-4">
        <Image
          alt="Photo de moi"
          src="/me.png"
          width={128}
          height={128}
          className="rounded-full"
          priority={true}
        />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Gurkan TANER</h1>
          <h2 className="text-lg">Architecte Logiciel</h2>
        </div>
      </header>

      <main className="flex flex-col">
        <section id="coding_games" className="flex flex-col text-center gap-6">
          <h3 className="text-white text-2xl font-bold">Coding Games</h3>
          <ProjectCarousel projects={projects} />
        </section>
      </main>
      <footer className="mt-auto text-center text-white p-4">
        Copyright © Gurkan TANER
      </footer>
    </div>
  );
}

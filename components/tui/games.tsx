import Image from "next/image";

import { DATA } from "@/data/resume";

/**
 * Les jeux C/Raylib. La capture s'affiche d'abord en gros pixels,
 * et devient nette au survol (toujours nette sur écran tactile).
 */
export default function Games() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
      {DATA.codingGames.map((game) => {
        const bin = game.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const link = game.links[0];
        return (
          <li key={game.title}>
            <a
              href={link?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video bg-ink border-2 border-fg-dim overflow-hidden group-hover:border-cyan group-focus-visible:border-cyan">
                <Image
                  src={game.image}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-contain [image-rendering:pixelated]"
                />
                <Image
                  src={game.image}
                  alt={`Capture du jeu ${game.title}`}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-contain opacity-0 transition-opacity duration-300 ease-[steps(4)] group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                />
              </div>
              <p className="ui text-2xl mt-3">
                <span className="text-fg-dim">$ </span>
                <span className="group-hover:text-cyan">./{bin}</span>
              </p>
              <p className="text-sm text-fg-dim">
                Codé en {game.dates} en {game.technologies.join(" + ")}. Voir
                le code source.
              </p>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

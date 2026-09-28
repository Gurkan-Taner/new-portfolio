"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { DATA } from "@/data/resume";

type Project = (typeof DATA.projects)[number];

const LINK_LABELS: Record<string, string> = {
  Visit: "Visiter le site",
  Source: "Code source",
};

function year(p: Project) {
  const years = ("dates" in p ? p.dates : "")?.match(/\d{4}/g);
  return years ? years[years.length - 1] : "—";
}

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/**
 * Toutes les fiches sont dans le HTML (utile au référencement) ; seule la
 * fiche active est visible et charge son média.
 */
function Preview({
  project,
  active,
  priority = false,
}: {
  project: Project;
  active: boolean;
  priority?: boolean;
}) {
  const video = "video" in project ? project.video : "";
  return (
    <div
      id={`projet-${slug(project.title)}`}
      hidden={!active}
      className={`${active ? "flex" : "hidden"} flex-col gap-5`}
    >
      <div
        key={project.title}
        className="wipe relative aspect-video bg-ink border-2 border-fg-dim overflow-hidden"
      >
        {!active ? null : video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={`Capture d'écran de ${project.title}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority}
            className="object-contain"
          />
        ) : null}
      </div>
      <div>
        <h3 className="ui text-4xl leading-none text-yellow mb-1">
          {project.title}
        </h3>
        {"dates" in project && project.dates && (
          <p className="text-sm text-fg-dim mb-3">{project.dates}</p>
        )}
        <p className="mb-4 max-w-[65ch]">{project.description}</p>
        <p className="text-sm mb-6">
          <span className="text-fg-dim">stack :</span>{" "}
          {project.technologies.join(", ")}
        </p>
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-5">
            {project.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${LINK_LABELS[link.type] ?? link.type} de ${project.title}`}
                className={`btn ${i > 0 ? "btn-quiet" : ""}`}
              >
                {LINK_LABELS[link.type] ?? link.type}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectBrowser() {
  const projects = DATA.projects;
  const [active, setActive] = useState(0);
  const desktop = useIsDesktop();
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [cursor, setCursor] = useState<{ top: number; height: number } | null>(null);

  // La barre de sélection cyan glisse jusqu'à la ligne active (transition CSS).
  useLayoutEffect(() => {
    const row = rowRefs.current[active];
    if (row) setCursor({ top: row.offsetTop, height: row.offsetHeight });
  }, [active, desktop]);

  const move = (i: number) => {
    const next = (i + projects.length) % projects.length;
    setActive(next);
    rowRefs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-8">
      <div className="border-2 border-fg-dim self-start">
        <div
          className="grid grid-cols-[1fr_4rem] sm:grid-cols-[1fr_4rem_9rem] ui text-xl text-yellow px-3 py-1 border-b-2 border-fg-dim"
          aria-hidden="true"
        >
          <span>Nom</span>
          <span>Année</span>
          <span className="hidden sm:block">Stack</span>
        </div>
        <ul
          aria-label="Projets"
          className="relative"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              move(active + 1);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              move(active - 1);
            }
          }}
        >
          <li
            aria-hidden="true"
            className="absolute inset-x-0 top-0 bg-cyan transition-transform duration-200 ease-[cubic-bezier(0.2,1.4,0.4,1)] motion-reduce:transition-none"
            style={
              cursor
                ? { height: cursor.height, transform: `translateY(${cursor.top}px)` }
                : { height: "2rem" }
            }
          />
          {projects.map((p, i) => {
            const selected = i === active;
            return (
              <li key={p.title}>
                <button
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={selected}
                  aria-controls={`projet-${slug(p.title)}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => desktop && setActive(i)}
                  className={`relative w-full grid grid-cols-[1fr_4rem] sm:grid-cols-[1fr_4rem_9rem] text-left ui text-2xl leading-8 px-3 focus-visible:outline-offset-[-2px] ${
                    selected ? "text-ink" : "text-fg"
                  }`}
                >
                  <span className="relative truncate">
                    {selected ? "▸ " : "  "}
                    {slug(p.title)}/
                  </span>
                  <span className="relative">{year(p)}</span>
                  <span className="relative hidden sm:block truncate">
                    {p.technologies.slice(0, 2).join(" ").toLowerCase()}
                  </span>
                </button>
                {!desktop && (
                  <div className={selected ? "px-3 py-5 border-y-2 border-fg-dim" : ""}>
                    <Preview project={p} active={selected} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="ui text-xl text-fg-dim px-3 py-1 border-t-2 border-fg-dim">
          projet {active + 1} sur {projects.length}
        </p>
      </div>

      {desktop && (
        <div aria-live="polite">
          {projects.map((p, i) => (
            <Preview key={p.title} project={p} active={i === active} priority={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}

import { DATA } from "@/data/resume";

const TREE: { dir: string; items: string[] }[] = [
  { dir: "front", items: ["Vue", "Next.js", "React Native"] },
  { dir: "back", items: ["Node.js", "NestJS", "FastAPI", "Springboot"] },
  { dir: "langages", items: ["TypeScript", "Python", "C", "C++"] },
  { dir: "data", items: ["Postgres", "MySQL", "Prisma"] },
  { dir: "devops", items: ["Docker", "Jenkins", "Ansible"] },
];

// "Next.js", "NextJS" et "Next" désignent la même chose.
const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9+]/g, "").replace(/js$/, "");

/** Projets qui utilisent une techno, pour l'afficher en commentaire. */
function usedIn(tech: string) {
  const key = norm(tech);
  return DATA.projects
    .filter((p) => p.technologies.some((t) => norm(t) === key))
    .map((p) => p.title);
}

/** Segment d'indentation à largeur fixe : les glyphes de dessin n'ont pas tous la même chasse. */
function Seg({ children }: { children: string }) {
  return (
    <span className="inline-block w-[3ch] mr-[1ch] text-fg-dim overflow-hidden align-top" aria-hidden="true">
      {children}
    </span>
  );
}

export default function StackTree() {
  const files = TREE.reduce((n, d) => n + d.items.length, 0);

  return (
    <div className="ui text-2xl leading-8 overflow-x-auto">
      <p className="text-yellow">~/stack</p>
      <ul>
        {TREE.map((group, gi) => {
          const lastDir = gi === TREE.length - 1;
          return (
            <li key={group.dir}>
              <p>
                <Seg>{lastDir ? "└──" : "├──"}</Seg>
                <span className="text-cyan">{group.dir}/</span>
              </p>
              <ul>
                {group.items.map((tech, ti) => {
                  const projects = usedIn(tech);
                  const branch = ti === group.items.length - 1 ? "└──" : "├──";
                  return (
                    <li key={tech} className="flex gap-x-6 whitespace-nowrap">
                      <span className="shrink-0">
                        <Seg>{lastDir ? "" : "│"}</Seg>
                        <Seg>{branch}</Seg>
                        {tech.toLowerCase()}
                      </span>
                      {projects.length > 0 && (
                        <span className="text-fg-dim hidden md:inline truncate">
                          # {projects.join(", ")}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-fg-dim">
        {TREE.length} dossiers, {files} fichiers
      </p>
    </div>
  );
}

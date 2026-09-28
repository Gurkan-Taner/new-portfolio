import { DATA } from "@/data/resume";

import CalButton from "@/components/tui/cal-button";
import { Education, GitLog } from "@/components/tui/experiences";
import Footer from "@/components/tui/footer";
import Games from "@/components/tui/games";
import Hero from "@/components/tui/hero";
import ProjectBrowser from "@/components/tui/project-browser";
import Shell from "@/components/tui/shell";
import StackTree from "@/components/tui/stack-tree";
import Window from "@/components/tui/window";

const EMAIL = DATA.contact.social.email.url;
const id = (frag: string) => `${DATA.url}/#${frag}`;

function projectUrl(p: (typeof DATA.projects)[number]) {
  const links: readonly { type: string; href: string }[] = p.links;
  const visit = links.find((l) => l.type === "Visit");
  const href = p.href && p.href !== "#" ? p.href : undefined;
  return visit?.href ?? href ?? links[0]?.href;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": id("profilepage"),
      url: DATA.url,
      name: `${DATA.name}, software engineer freelance à Strasbourg`,
      inLanguage: "fr-FR",
      isPartOf: { "@id": id("website") },
      mainEntity: { "@id": id("person") },
      primaryImageOfPage: `${DATA.url}/me.png`,
      hasPart: { "@id": id("projets") },
    },
    {
      "@type": "ItemList",
      "@id": id("projets"),
      name: `Projets de ${DATA.name}`,
      numberOfItems: DATA.projects.length,
      itemListElement: DATA.projects.map((p, i) => {
        const years = ("dates" in p ? p.dates : "")?.match(/\d{4}/g);
        const source = (p.links as readonly { type: string; href: string }[]).find(
          (l) => l.href.includes("github.com")
        );
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            // codeRepository n'existe que sur SoftwareSourceCode
            "@type": source ? "SoftwareSourceCode" : "CreativeWork",
            name: p.title,
            description: p.description,
            url: projectUrl(p),
            ...(source && { codeRepository: source.href }),
            ...(years && { dateCreated: years[0] }),
            keywords: p.technologies.join(", "),
            creator: { "@id": id("person") },
            inLanguage: "fr",
          },
        };
      }),
    },
  ],
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-[88rem] px-4 md:px-8 pt-16 md:pt-20 flex flex-col gap-16 md:gap-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />

      <Window id="projets" title="Projets" cmd="mc ~/projets">
        <ProjectBrowser />
      </Window>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-16 md:gap-20 xl:gap-10">
        <Window id="stack" title="Stack" cmd="tree ~/stack">
          <StackTree />
        </Window>

        <Window id="experiences" title="Expériences" cmd="git log">
          <GitLog />
          <Education />
        </Window>
      </div>

      <Window id="jeux" title="Jeux en C" cmd="ls ~/jeux">
        <p className="max-w-[65ch] mb-8 text-fg-dim">
          Des petits jeux écrits en C avec Raylib, chacun en quelques jours,
          pour le plaisir de tout gérer à la main : boucle de jeu, collisions,
          rendu.
        </p>
        <Games />
      </Window>

      <Window id="contact" title="Contact" cmd="sh">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-10">
          <div className="max-w-[40rem]">
            <h3 className="ui text-4xl md:text-5xl leading-none text-yellow mb-5 text-balance">
              {"Un projet à lancer\u00a0? Parlons-en."}
            </h3>
            <p className="mb-6">
              Un MVP à sortir vite, un SaaS qui doit tenir la charge, une
              architecture à remettre d&apos;aplomb : réserve 30 minutes ou
              écris-moi directement.
            </p>
            <p className="mb-8">
              <a
                href={`mailto:${EMAIL}`}
                className="text-cyan underline underline-offset-4 break-all"
              >
                {EMAIL}
              </a>
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-5">
              <CalButton>Réserver un appel</CalButton>
              <a href={`mailto:${EMAIL}`} className="btn btn-quiet">
                Écrire un e-mail
              </a>
            </div>
          </div>
          <Shell />
        </div>
      </Window>

      <Footer />
    </main>
  );
}

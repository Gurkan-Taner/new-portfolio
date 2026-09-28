import { DATA_BLOG } from "@/data/blog-posts";
import { DATA } from "@/data/resume";

const url = (path = "") => `${DATA.url}${path}`;
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

function projectLink(p: (typeof DATA.projects)[number]) {
  const links: readonly { type: string; href: string }[] = p.links;
  const visit = links.find((l) => l.type === "Visit")?.href;
  const source = links.find((l) => l.href.includes("github.com"))?.href;
  const href = p.href && p.href !== "#" ? p.href : undefined;
  return { main: visit ?? href ?? source, source };
}

/** llms.txt au format https://llmstxt.org, généré depuis les données du site. */
export function buildLlmsTxt({ full }: { full: boolean }) {
  const email = DATA.contact.social.email.url;
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(
    `# ${DATA.name}`,
    "",
    `> ${DATA.name} est software engineer freelance à Strasbourg (France). ${DATA.summary}`,
    "",
    "- Métier : software engineer freelance (fullstack, architecture logicielle, DevOps)",
    "- Localisation : Strasbourg, Grand Est, France. Missions sur place ou à distance.",
    "- Disponibilité : ouvert à de nouvelles missions freelance",
    "- Langues : français, anglais",
    "- Formation : MSc Pro Architecte logiciel, Epitech (2025)",
    `- Contact : ${email}, prise de rendez-vous sur https://cal.com/taner-gurkan/30min`,
    "",
    "## Services",
    "",
    "- Développement de MVP et de SaaS, de la conception au déploiement",
    "- Architecture logicielle et revue de code",
    "- Développement fullstack : Next.js, React, Vue.js, Node.js, NestJS, Python, FastAPI",
    "- IA appliquée : agents IA et intégration de modèles de langage dans des produits",
    "- DevOps : Docker, CI/CD avec Jenkins et GitHub Actions, Ansible, infrastructure auto-hébergée",
    "",
    "## Pages",
    "",
    `- [Accueil et portfolio](${url("/")}): présentation, projets, stack, expériences, jeux en C et contact`,
    `- [Blog technique](${url("/blog")}): articles sur Next.js, TypeScript et le DevOps`,
    `- [Flux RSS du blog](${url("/blog/rss.xml")})`,
    "",
    "## Expériences",
    ""
  );
  for (const job of DATA.work) {
    const link = job.href ? `, ${job.href}` : "";
    push(
      `- ${job.title}, ${job.company} (${job.location}), ${job.start} à ${job.end}${link} : ${oneLine(job.description)}`
    );
  }

  push("", "## Formation", "");
  for (const ed of DATA.education) {
    push(`- ${ed.degree}, ${ed.school} (${ed.start}-${ed.end})`);
  }

  push("", "## Projets", "");
  for (const p of DATA.projects) {
    const { main, source } = projectLink(p);
    const dates = "dates" in p && p.dates ? ` (${p.dates})` : "";
    const name = main ? `[${p.title}](${main})` : p.title;
    const src = source && source !== main ? ` Code source : ${source}.` : "";
    push(
      `- ${name}${dates}: ${oneLine(p.description)} Technologies : ${p.technologies.join(", ")}.${src}`
    );
  }

  push("", "## Jeux en C (Raylib)", "");
  for (const g of DATA.codingGames) {
    push(
      `- [${g.title}](${g.links[0]?.href}): jeu codé en ${g.dates} en ${g.technologies.join(" et ")}`
    );
  }

  push("", "## Blog", "");
  for (const post of DATA_BLOG) {
    push(`- [${post.title}](${url(`/blog/${post.slug}`)}) (${post.date}): ${post.excerpt}`);
  }

  if (full) {
    for (const post of DATA_BLOG) {
      push(
        "",
        "---",
        "",
        `# ${post.title}`,
        "",
        `Source : ${url(`/blog/${post.slug}`)}`,
        `Auteur : ${DATA.name}, ${post.date}`,
        ""
      );
      for (const c of post.content) {
        if (c.type === "heading") push(`## ${c.text}`, "");
        else if (c.type === "quote") push(`> ${c.text}`, "");
        else push(c.text, "");
      }
    }
  }

  push(
    "",
    "## Optional",
    "",
    `- [GitHub](${DATA.contact.social.GitHub.url})`,
    `- [LinkedIn](${DATA.contact.social.LinkedIn.url})`,
    full
      ? `- [Version courte](${url("/llms.txt")})`
      : `- [Version complète avec les articles](${url("/llms-full.txt")})`,
    ""
  );
  return lines.join("\n");
}

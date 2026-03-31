export type BlogContent = {
  type: "paragraph" | "heading" | "quote";
  text: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  content: BlogContent[];
  readTime: string;
};

export const DATA_BLOG: BlogPost[] = [
  {
    title: "Optimiser son pipeline CI/CD pour Next.js",
    slug: "optimiser-cicd-nextjs",
    excerpt:
      "Comment j'ai réduit le temps de build de 40% en utilisant les runners GitHub Actions auto-hébergés et le cache Docker.",
    date: "12 Mars 2026",
    category: "DevOps",
    readTime: "5 min",
    tags: ["Docker", "CI/CD", "NextJS"],
    content: [
      {
        type: "paragraph",
        text: "Dans le monde du déploiement continu, chaque seconde compte. Récemment, j'ai été confronté à des temps de build dépassant les 10 minutes sur des projets Next.js complexes. C'est un frein majeur pour l'agilité des équipes.",
      },
      {
        type: "heading",
        text: "Le goulot d'étranglement : Le cache des dépendances",
      },
      {
        type: "paragraph",
        text: "L'analyse a montré que 60% du temps était passé à réinstaller les nodes_modules. En implémentant une stratégie de cache Docker multi-étapes, nous avons réussi à isoler les couches qui ne changent pas souvent.",
      },
      {
        type: "quote",
        text: "L'optimisation n'est pas une option, c'est une nécessité quand on scale une infrastructure DevOps.",
      },
      {
        type: "paragraph",
        text: "En conclusion, le passage à des runners auto-hébergés nous a permis de garder la main sur les performances hardware tout en réduisant drastiquement les coûts liés à GitHub Actions.",
      },
    ],
  },
];

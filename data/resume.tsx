import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Gurkan Taner",
  initials: "GT",
  url: "https://gurkan-taner.fr",
  location: "Strasbourg, FR",
  locationLink: "https://www.google.com/maps/place/strasbourg",
  description:
    "Gurkan Taner - Software Engineer Freelance à Strasbourg. Expert en développement fullstack.",
  jobTitle: "Software Engineer Freelance",
  additionalKeywords:
    "développeur strasbourg, freelance développeur, expert nextjs, software engineer france, développeur, expert nestjs, expert python, software engineer, devops",
  summary:
    "J’aide les entreprises à transformer leurs idées en MVP et en SaaS. Mon rôle : concevoir des architectures solides, des développements fiables et des infrastructures efficaces pour soutenir leur croissance.",
  avatarUrl: "",
  skills: [
    "Vue",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
    "Springboot",
    "C",
    "C++",
    "Ansible",
    "Jenkins",
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      Blog: {
        name: "Blog",
        url: "/blog",
        icon: Icons.pencil,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Gurkan-Taner",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/gurkan-taner/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "gurkan.taner@outlook.fr",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Progisem",
      href: "https://logiciels.progisem.com/",
      badges: [],
      location: "Entzheim, FR",
      title: "Développeur Fullstack / DevOps",
      start: "Septembre 2025",
      end: "Aujourd'hui",
      description:
        "Développement et maintenance d’une application web métier de gestion d’opérations et de projets utilisée par +500 entreprises avec Node et Vue. L'application web regroupe plusieurs logiciels métiers tels que la gestion d’opérations et la comptabilité. Implémentation de Jenkins pour la CI/CD ainsi que de tests unitaires.",
    },
    {
      company: "Initly",
      href: "",
      badges: [],
      location: "Remote",
      title: "Co-Founder | Développeur Fullstack & Product Marketing",

      start: "Mai 2025",
      end: "3 mois",
      description:
        "Création et développement d’un SaaS d’onboarding développeur basé sur un agent IA, automatisant la génération de documentation technique (README, .env.example, CONTRIBUTING, Dockerfile) à partir de l'url GitHub. \
        Acquisition et gestion de +100 utilisateurs et +200 projets créés, avec pilotage du produit via feedback utilisateurs et diffusion sur LinkedIn, X et Reddit.",
    },
    {
      company: "Progisem",
      href: "https://logiciels.progisem.com/",
      badges: [],
      location: "Entzheim, FR",
      title: "Alternant Développeur Fullstack",
      start: "Août 2023",
      end: "Août 2025",
      description:
        "Développement et maintenance d’une application web métier de gestion d’opérations et de projets utilisée par +500 entreprises avec Node et Vue. L'application web regroupe plusieurs logiciels métiers tel que la gestion d'opération et la comptabilité. Implémentation de Jenkins pour la CI/CD ainsi que de test unitaire.",
    },
    {
      company: "Hackathon - Hacking Health Camp",
      href: "https://hackinghealth.camp/",
      badges: [],
      location: "Strasbourg, FR",
      title: "Développeur mobile / Intégration IA",
      start: "Avril 2023",
      end: "3 jours",
      description:
        "Développement mobile avec Flutter de SimpliSigne. C'est une application qui traduit le langage des signes français en texte français, en direct depuis la caméra du téléphone. J'ai également intégré le modèle entraîné dans l'application mobile.",
    },
  ],
  education: [
    {
      school: "Epitech",
      href: "https://www.epitech.eu/",
      degree: "MSc Pro - Architecte logiciel",
      start: "2022",
      end: "2025",
    },
    {
      school: "Lycée Couffignal",
      href: "https://lyc-couffignal-strasbourg.site.ac-strasbourg.fr/",
      degree: "BTS Systèmes numériques option Informatique et Réseaux",
      start: "2020",
      end: "2022",
    },
    {
      school: "Université de Strasbourg",
      href: "https://www.unistra.fr/",
      degree: "Licence en Mathématiques / Informatique",
      start: "2019",
      end: "2020",
    },
    {
      school: "Lycée Kléber",
      href: "https://lycee-kleber.com.fr/",
      degree: "Bac scientifique option Sciences de l’ingénieur",
      start: "2017",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Cop1",
      href: "",
      dates: "Avril 2026",
      active: true,
      description:
        "Application web pour améliorer la logistique au sein d'une association. Permets de créer, modifier et de s'inscrire à des missions en quelques clics.",
      technologies: ["NextJS", "NestJS", "Docker"],
      links: [
        {
          type: "Visit",
          href: "https://cop1.gurkan-taner.fr/",
          icon: "website",
        },
      ],
      image: "/projects/cop1.webp",
    },
    {
      title: "Tracy",
      href: "",
      dates: "Mars 2026",
      active: true,
      description: "Landing page réalisée pour un service d'IA local.",
      technologies: ["NextJS", "framer-motion", "Docker"],
      links: [
        {
          type: "Visit",
          href: "https://tracy-ai.com/",
          icon: "website",
        },
      ],
      image: "/projects/tracy.webp",
    },
    {
      title: "PneumonIA",
      href: "",
      dates: "Avril 2024 - Juin 2024",
      active: true,
      description:
        "Projet Python qui utilise différents modèles de machine learning (avec Scikit-learn) pour détecter si un patient est atteint de pneumonie ou non depuis une radiographie.",
      technologies: ["Python", "Scikit", "Streamlit"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Gurkan-Taner/pneumonIA",
          icon: "github",
        },
      ],
      image: "",
      video: "/projects/pneumonia.mov",
    },
    {
      title: "Initly",
      href: "https://initly.io/",
      active: true,
      description:
        "SaaS qui permet de clone un repo GitHub et générer un README complet basé sur l'architecture du projet, un fichier CONTRIBUTING basé sur les commits, .env.example, Dockerfile et GitHub Actions.",
      technologies: ["Next", "FastAPI", "Stripe", "OpenAI API"],
      links: [],
      image: "",
      video: "/projects/initly.mov",
    },
    {
      title: "E-Mobilier",
      href: "#",
      dates: "Février 2025 - Mars 2025",
      active: true,
      description:
        "Plateforme immobilière pour trouver et acheter / louer un bien. Dashboard personnalisé dans la page profil pour visualiser son parc immobilier.",
      technologies: ["React", "Tailwind", "Shadcn", "NestJS"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Gurkan-Taner/e-mobilier",
          icon: "github",
        },
        {
          type: "Visit",
          href: "https://e-mobilier.vercel.app/",
          icon: "website",
        },
      ],
      image: "",
      video: "/projects/emmobilier.mp4",
    },
    {
      title: "SaaS Agency",
      href: "#",
      dates: "Décembre 2025 - Aujourd'hui",
      active: true,
      description:
        "Plateforme pour les agences afin de faciliter le management et le suivi du projet avec leurs clients.",
      technologies: ["Next", "Tailwind", "Shadcn"],
      links: [
        {
          type: "Visit",
          href: "https://agency-builder-nine.vercel.app/tasks",
          icon: "website",
        },
      ],
      image: "",
      video: "/projects/saas-agency.mp4",
    },
    {
      title: "Crow-Swagger",
      href: "",
      active: true,
      description:
        "Développement d'un Swagger custom pour le framework Crow (C++). Parsing des fichiers de routes et création du HTML dynamiquement.",
      technologies: ["C++", "Crow", "HTML"],
      links: [
        {
          type: "Source",
          href: "https://github.com/gurkan-Taner/crow-swagger",
          icon: "github",
        },
      ],
      image: "",
      video: "/projects/crow-swagger.mp4",
    },
    {
      title: "Themis",
      href: "#",
      dates: "Décembre 2023 - Juillet 2025",
      active: true,
      description:
        "Développement d'une application web et mobile pour aider les habitants français à mieux comprendre le droit français grâce à une IA qui résume les textes de loi. Le modèle est entraîné avec l'API des textes de loi français.",
      technologies: [
        "Next.js",
        "React Native",
        "C++",
        "Crow",
        "Typescript",
        "MariaDB",
        "Prisma",
        "TailwindCSS",
      ],
      links: [
        {
          type: "C++ backend",
          href: "https://github.com/ScoutHub/JurisConnect-Backend",
          icon: "github",
        },
      ],
      image: "/projects/themis.webp",
      video: "",
    },
    {
      title: "E-psy",
      href: "",
      dates: "Novembre 2024 - Aujourd'hui",
      active: true,
      description:
        "Plateforme web conçue pour les personnes en détresse émotionnelle. L'utilisateur peut soit décider de discuter soit être la personne qui écoute, une sorte de thérapie.",
      technologies: ["Python", "Websocket", "Next"],
      links: [
        {
          type: "Visit",
          href: "https://epsy.gurkan-taner.fr",
          icon: "website",
        },
      ],
      image: "/projects/epsy.webp",
      video: "",
    },
    {
      title: "Crypto webscrapping",
      href: "",
      dates: "Septembre 2024 - Janvier 2025",
      active: true,
      description:
        "Développement d'un dashboard affichant le cours de la cryptomonnaie depuis le scraping de sites web existants. Le scrapping est fait en python avec la bibliothèque BeautifulSoup et un backend en Flask.",
      technologies: [
        "Next.js",
        "Nest.js",
        "Beautifulsoup",
        "Python",
        "Typescript",
        "MySQL",
        "Prisma",
        "TailwindCSS",
      ],
      links: [],
      image: "/projects/crypto.webp",
      video: "",
    },
    {
      title: "Navify",
      href: "#",
      dates: "Septembre 2024 - Janvier 2025",
      active: true,
      description:
        "Application web pour déterminer le meilleur itinéraire d'un point A à un point B grâce à Dijkstra. L'utilisateur peut faire sa demande via un vocal ou texte écrit.\
          Utilisation de Whisper pour la reconnaissance vocale et spaCy (NLP) pour le traitement de texte.",
      technologies: [
        "Python",
        "Spacy",
        "SpeechRecognizer",
        "Whisper",
        "Dijkstra",
        "React Native",
        "FastAPI",
      ],
      links: [],
      image: "/projects/navify.webp",
      video: "",
    },
  ],
  codingGames: [
    {
      title: "Puissance 4",
      href: "",
      dates: "2 jours",
      active: true,
      description: "",
      technologies: ["C", "Raylib"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ScoutHub/puissance4-raylib",
          icon: "github",
        },
      ],
      image: "/coding_games/puissance4.webp",
      video: "",
    },
    {
      title: "Pong",
      href: "",
      dates: "1 jour",
      active: true,
      description: "",
      technologies: ["C", "Raylib"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ScoutHub/pong-raylib",
          icon: "github",
        },
      ],
      image: "/coding_games/pong.webp",
      video: "",
    },
    {
      title: "Space Invader",
      href: "",
      dates: "3 jours",
      active: true,
      description: "",
      technologies: ["C", "Raylib"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ScoutHub/SpaceInvader-raylib",
          icon: "github",
        },
      ],
      image: "/coding_games/space_invader.webp",
      video: "",
    },
    {
      title: "Tic Tac Toe",
      href: "",
      dates: "2 jours",
      active: true,
      description: "",
      technologies: ["C", "Raylib"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ScoutHub/CTicTacToe",
          icon: "github",
        },
      ],
      image: "/coding_games/tictactoe.webp",
      video: "",
    },
    {
      title: "Snake",
      href: "",
      dates: "2 jours",
      active: true,
      description: "",
      technologies: ["C", "Raylib"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ScoutHub/CTicTacToe",
          icon: "github",
        },
      ],
      image: "/coding_games/snake.webp",
      video: "",
    },
  ],
} as const;

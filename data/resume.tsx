import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Gurkan Taner",
  initials: "GT",
  url: "https://gurkan-taner.vercel.app",
  location: "Strasbourg, FR",
  locationLink: "https://www.google.com/maps/place/strasbourg",
  description:
    "Gurkan Taner - Architecte Logiciel & Développeur Web/Mobile Freelance à Strasbourg. Expert en développement fullstack, cybersécurité et solutions digitales.",
  jobTitle: "Architecte Logiciel & Développeur Freelance",
  additionalKeywords:
    "développeur strasbourg, freelance développeur alsace, expert nextjs, architecte logiciel france, développeur, expert nestjs, expert python",
  summary:
    "Actuellement en dernière année à Epitech en MSc Pro pour préparer un titre d'architecte logiciel, je suis également développeur Fullstack à Progisem en alternance. En plus du dev, je suis également plongé dans cybersécurité en travaillant sur la plateforme Try Hack Me (Top 7% monde).",
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
      GitHub: {
        name: "GitHub",
        url: "https://github.com/scouthub",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/gurkan-taner/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/gkannn_",
        icon: Icons.x,

        navbar: false,
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
      logoUrl: "/company/progisem.png",
      start: "Août 2023",
      end: "Aujourd'hui",
      description:
        "Développement d'application web avec VueJS en front et Node (express) en back. L'application web regroupe plusieurs logiciels métiers tel que la gestion d'opération et la comptabilité. Implémentation de Jenkins pour la CI/CD ainsi que de test unitaire.",
    },
    {
      company: "Hackathon - Hacking Health Camp",
      href: "https://hackinghealth.camp/",
      badges: [],
      location: "Strasbourg, FR",
      title: "Développeur mobile / Intégration IA",
      logoUrl: "/company/hhc.png",
      start: "Avril 2023",
      end: "3 jours",
      description:
        "Développement mobile avec Flutter de SimpliSigne. C'est une application qui traduit le langage des signes français en français, en direct depuis la caméra du téléphone. J'ai également intégré le modèle entraîné dans l'application mobile.",
    },
  ],
  education: [
    {
      school: "Epitech",
      href: "https://www.epitech.eu/",
      degree: "MSc Pro - Titre Architecte logiciel",
      logoUrl: "/school/epitech.png",
      start: "2022",
      end: "2025",
    },
    {
      school: "Lycée Couffignal",
      href: "https://lyc-couffignal-strasbourg.site.ac-strasbourg.fr/",
      degree: "BTS Système Numérique option Informatique et Réseaux",
      logoUrl: "/school/couffignal.jpg",
      start: "2020",
      end: "2022",
    },
    {
      school: "Université de Strasbourg",
      href: "https://www.unistra.fr/",
      degree: "Licence en Mathématique / Informatique",
      logoUrl: "/school/ufr.png",
      start: "2019",
      end: "2020",
    },
    {
      school: "Lycée Kléber",
      href: "https://lycee-kleber.com.fr/",
      degree: "Bac Scientifique option Science d'Ingénieur",
      logoUrl: "/school/kleber.png",
      start: "2017",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "PneumonIA",
      href: "",
      dates: "Avril 2024 - Juin 2024",
      active: true,
      description:
        "Projet python qui utilise différent modèle de machine learning (depuis Scikit) pour détecter si un patient est atteint de pneumonie ou non depuis une radiographie.",
      technologies: ["Python", "Scikit", "Streamlit"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Gurkan-Taner/pneumonIA",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/projects/pneumonia.mov",
    },
    {
      title: "Jurisconnect",
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
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/themis.png",
      video: "",
    },
    {
      title: "E-psy",
      href: "",
      dates: "Novembre 2024 - Aujourd'hui",
      active: true,
      description:
        "Plateforme web conçue pour les personnes en détresse émotionnelles. L'utilisateur peut soit décider de discuter soit être la personne qui écoute, une sorte de thérapie.",
      technologies: ["Python", "Websocket", "Next"],
      image: "",
      video: "/projects/e-psy.mov",
    },
    {
      title: "Crypto webscrapping",
      href: "",
      dates: "Septembre 2024 - Janvier 2025",
      active: true,
      description:
        "Développement d'un dashboard affichant le cours de la cryptomonnaie depuis le scrapping de site web déjà existant. Le scrapping est fait en python avec la librarie beautifulsoup avec un backend en flask.",
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
      image: "/projects/crypto.png",
      video: "",
    },
    {
      title: "Navify",
      href: "#",
      dates: "Septembre 2024 - Janvier 2025",
      active: true,
      description:
        "Application web pour déterminer le meilleur itinéraire d'un point A à un point B grâce à Dijkstra. L'utilisateur peut faire sa demande via un vocal ou texte écrit.\
          Utilisation de Whisper pour la reconnaissance vocal et Spacy (NLP) pour le traitement de texte.",
      technologies: [
        "Python",
        "Spacy",
        "SpeechRecognizer",
        "Whisper",
        "Dijkstra",
        "React Native",
        "FastAPI",
      ],
      image: "/projects/navify.png",
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
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/coding_games/puissance4.png",
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
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/coding_games/pong.png",
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
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/coding_games/space_invader.png",
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
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/coding_games/tictactoe.png",
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
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/coding_games/snake.png",
      video: "",
    },
  ],
} as const;

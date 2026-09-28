import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import "./globals.css";

import MenuBar from "@/components/tui/menu-bar";
import StatusLine from "@/components/tui/status-line";
import BootScreen from "@/components/tui/boot-screen";
import { DATA } from "@/data/resume";

export const viewport: Viewport = {
  themeColor: "#0a1570",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex",
  display: "swap",
});

// Décide avant le premier rendu si l'écran de boot doit être joué :
// une seule fois par session, jamais si l'utilisateur réduit les animations,
// ni pour les robots et outils d'audit (le contenu reste identique pour eux).
const bootScript = `try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches,b=/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent);if(r||b||sessionStorage.getItem("gt-boot")){d.dataset.boot="skip"}else{sessionStorage.setItem("gt-boot","1");d.dataset.boot="play"}}catch(e){document.documentElement.dataset.boot="skip"}`;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name}, software engineer freelance à Strasbourg`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    DATA.name,
    DATA.jobTitle,
    "Développeur Fullstack",
    "Portfolio",
    "Freelance",
    ...DATA.additionalKeywords.split(",").map((k) => k.trim()),
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  alternates: {
    canonical: DATA.url,
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLM Friendly Content" }],
    },
  },
  // Les images OG/Twitter viennent de app/opengraph-image.tsx et app/twitter-image.tsx
  openGraph: {
    title: `${DATA.name}, software engineer freelance à Strasbourg`,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "fr_FR",
    type: "profile",
    firstName: "Gurkan",
    lastName: "Taner",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name}, software engineer freelance à Strasbourg`,
    description: DATA.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = (frag: string) => `${DATA.url}/#${frag}`;

  // Un seul graphe JSON-LD : les entités se référencent par @id.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": id("person"),
        name: DATA.name,
        givenName: "Gurkan",
        familyName: "Taner",
        url: DATA.url,
        image: `${DATA.url}/me.png`,
        jobTitle: DATA.jobTitle,
        description: DATA.description,
        email: `mailto:${DATA.contact.social.email.url}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Strasbourg",
          addressRegion: "Grand Est",
          addressCountry: "FR",
        },
        sameAs: [DATA.contact.social.LinkedIn.url, DATA.contact.social.GitHub.url],
        alumniOf: DATA.education.map((ed) => ({
          "@type": "EducationalOrganization",
          name: ed.school,
          url: ed.href,
        })),
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "MSc Pro Architecte logiciel",
          credentialCategory: "degree",
          recognizedBy: { "@type": "EducationalOrganization", name: "Epitech" },
        },
        worksFor: {
          "@type": "Organization",
          name: "Progisem",
          url: "https://logiciels.progisem.com/",
        },
        knowsLanguage: ["fr", "en"],
        knowsAbout: [
          "Next.js",
          "React",
          "Vue.js",
          "TypeScript",
          "Node.js",
          "NestJS",
          "Python",
          "FastAPI",
          "PostgreSQL",
          "Docker",
          "Jenkins",
          "Ansible",
          "CI/CD",
          "C",
          "C++",
          "Architecture logicielle",
          "Développement de MVP",
          "SaaS",
          "DevOps",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": id("service"),
        name: `${DATA.name}, software engineer freelance`,
        url: DATA.url,
        image: `${DATA.url}/me.png`,
        description:
          "Développement de MVP et de SaaS, architecture logicielle, intégration continue et déploiement Docker, pour startups et PME.",
        founder: { "@id": id("person") },
        email: DATA.contact.social.email.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Strasbourg",
          addressRegion: "Grand Est",
          addressCountry: "FR",
        },
        areaServed: [
          { "@type": "City", name: "Strasbourg" },
          { "@type": "Country", name: "France" },
        ],
        knowsLanguage: ["fr", "en"],
        serviceType: [
          "Développement de MVP",
          "Développement SaaS",
          "Architecture logicielle",
          "DevOps et CI/CD",
        ],
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        name: DATA.name,
        url: DATA.url,
        description: DATA.description,
        inLanguage: "fr-FR",
        author: { "@id": id("person") },
        publisher: { "@id": id("person") },
      },
    ],
  };

  return (
    <html
      lang="fr"
      className={`${vt323.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="me" href={DATA.contact.social.LinkedIn.url} />
        <link rel="me" href={DATA.contact.social.GitHub.url} />
      </head>
      <body
        className="antialiased min-h-screen w-full"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BootScreen />
        <div className="desktop">
          <MenuBar />
          {children}
          <StatusLine />
        </div>
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import { DATA } from "@/data/resume";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} | ${DATA.jobTitle} - Portfolio`,
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
  openGraph: {
    title: `${DATA.name} - ${DATA.jobTitle}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name} Portfolio`,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `Portfolio de ${DATA.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - ${DATA.jobTitle}`,
    description: DATA.description,
    images: ["/og.png"],
  },
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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${DATA.url}/#person`,
    name: DATA.name,
    url: DATA.url,
    jobTitle: DATA.jobTitle,
    email: DATA.contact.social.email.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Strasbourg",
      addressRegion: "Alsace",
      addressCountry: "FR",
    },
    sameAs: [
      DATA.contact.social.LinkedIn.url,
      DATA.contact.social.GitHub.url,
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Epitech",
        url: "https://www.epitech.eu/",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Progisem",
      url: "https://logiciels.progisem.com/",
    },
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Docker",
      "Vue.js",
      "NestJS",
      "DevOps",
      "CI/CD",
      "Architecture logicielle",
      "SaaS",
    ],
    description: DATA.description,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DATA.url}/#website`,
    name: `${DATA.name} Portfolio`,
    url: DATA.url,
    description: DATA.description,
    author: { "@id": `${DATA.url}/#person` },
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${DATA.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${DATA.url}/#profilepage`,
    name: `Portfolio de ${DATA.name}`,
    url: DATA.url,
    mainEntity: { "@id": `${DATA.url}/#person` },
  };

  return (
    <html lang="fr" className="bg-[#050505]">
      <head>
        <link rel="me" href={DATA.contact.social.LinkedIn.url} />
        <link rel="me" href={DATA.contact.social.GitHub.url} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
        <TooltipProvider delayDuration={0}>
          {children}
          <Navbar />
        </TooltipProvider>
      </body>
    </html>
  );
}

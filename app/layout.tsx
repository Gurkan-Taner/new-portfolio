import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gurkan-taner.vercel.app/"),
  title: {
    default: "Gurkan Taner | Développeur Fullstack et Designer",
    template: "%s | Gurkan Taner",
  },
  description:
    "Bienvenue sur mon portfolio. Découvrez mes projets en développement web, mobile et devops.",
  keywords:
    "Gurkan Taner, architecte logiciel, développeur, portfolio, fullstack, design, projets web, mobile, cybersécurité, IA",
  openGraph: {
    title: "Gurkan Taner | Architecte Logiciel",
    description:
      "Portfolio de Gurkan Taner, un architecte logiciel autodidacte et enthousiaste de la cybersécurité.",
    url: "https://gurkan-taner.vercel.app/",
    siteName: "Gurkan Taner Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    title: "Gurkan Taner | Architecte Logiciel",
    description:
      "Découvrez les projets et travaux de Gurkan Taner, architecte logiciel et passionné de cybersécurité.",
    creator: "@gkannn_",
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
  alternates: {
    canonical: "https://gurkan-taner.vercel.app/",
    languages: {
      fr: "https://gurkan-taner.vercel.app/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full`}
      >
        <TooltipProvider delayDuration={0}>
          {children}
          <Navbar />
        </TooltipProvider>
      </body>
    </html>
  );
}

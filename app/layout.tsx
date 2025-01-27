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

import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords:
    "Gurkan Taner, architecte logiciel, développeur, portfolio, fullstack, design, projets web, mobile, cybersécurité, IA",
  openGraph: {
    title: DATA.name,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "fr",
    type: "website",
  },
  twitter: {
    title: "Gurkan Taner",
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

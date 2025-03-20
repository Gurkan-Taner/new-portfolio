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
    default: `${DATA.name} - ${DATA.jobTitle} | Portfolio`,
    template: `%s | ${DATA.name} - Portfolio`,
  },
  description: DATA.description,
  keywords: `${
    DATA.name
  }, ${DATA.name.toLowerCase()}, gurkan taner portfolio, taner gurkan portfolio, ${DATA.jobTitle.toLowerCase()}, ${
    DATA.additionalKeywords
  }`,
  authors: [{ name: DATA.name }],
  creator: DATA.name,
  publisher: DATA.name,
  openGraph: {
    title: `${DATA.name} - ${DATA.jobTitle}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `Portfolio de ${DATA.name}`,
    locale: "fr_FR",
    type: "website",
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
    nocache: false,
  },
  alternates: {
    canonical: DATA.url,
    languages: {
      "fr-FR": DATA.url,
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


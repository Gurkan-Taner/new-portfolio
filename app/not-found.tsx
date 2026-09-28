import type { Metadata } from "next";
import Link from "next/link";

import Window from "@/components/tui/window";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[48rem] px-4 md:px-8 pt-24 md:pt-32 pb-16">
      <Window title="Erreur" as="div" titleAs="p" cmd="cd ~">
        <p className="ui text-2xl text-fg-dim mb-2" aria-hidden="true">
          $ cat cette-page
        </p>
        <h1 className="ui text-5xl leading-none text-yellow mb-4">
          404 : fichier introuvable
        </h1>
        <p className="mb-8 max-w-[55ch]">
          Cette page n&apos;existe pas ou a été déplacée. Reviens à
          l&apos;accueil ou parcours le blog.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-5">
          <Link href="/" className="btn">
            Revenir à l&apos;accueil
          </Link>
          <Link href="/blog" className="btn btn-quiet">
            Lire le blog
          </Link>
        </div>
      </Window>
    </main>
  );
}

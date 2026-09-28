"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SECTIONS } from "@/lib/sections";

type Hint = [keys: string, action: string];

const HINTS: Record<string, Hint[]> = {
  default: [["P S E J C B", "aller à une section"]],
  projets: [
    ["↑ ↓", "choisir un projet"],
    ["P S E J C B", "sections"],
  ],
  contact: [
    ["/", "écrire une commande"],
    ["help", "liste des commandes"],
  ],
  post: [["Q", "revenir au blog"]],
};

export default function StatusLine() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    setCurrent(null);
    if (pathname !== "/") return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    // La section « courante » est celle qui traverse le milieu de l'écran.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(e.target.id);
          else setCurrent((c) => (c === e.target.id ? null : c));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const isPost = pathname.startsWith("/blog/");
  const path =
    pathname === "/" ? `~${current ? `/${current}` : ""}` : `~${pathname}`;
  const hints = isPost
    ? HINTS.post
    : HINTS[current ?? "default"] ?? HINTS.default;

  return (
    <footer
      className="hidden md:flex fixed inset-x-0 bottom-0 z-50 h-8 items-center gap-6 bg-paper text-ink font-ui text-xl leading-none px-4"
      aria-hidden="true"
    >
      <span className="bg-win text-fg px-2 py-0.5">gurkan@strasbourg:{path}</span>
      {hints.map(([keys, action]) => (
        <span key={keys}>
          <span className="text-red">{keys}</span> {action}
        </span>
      ))}
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SECTIONS, isTyping } from "@/lib/sections";

function Hotkey({ label, hotkey }: { label: string; hotkey: string }) {
  const i = label.toLowerCase().indexOf(hotkey);
  if (i < 0) return <>{label}</>;
  return (
    <>
      {label.slice(0, i)}
      <span className="text-red group-hover:text-yellow group-aria-[current=page]:text-yellow">
        {label[i]}
      </span>
      {label.slice(i + 1)}
    </>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" });
    setNow(fmt());
    const t = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="tabular-nums" title="Heure à Strasbourg">
      {now ?? "--:--:--"}
    </span>
  );
}

export default function MenuBar() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e) || document.documentElement.dataset.boot === "play") {
        return;
      }
      const section = SECTIONS.find((s) => s.key === e.key.toLowerCase());
      if (!section) return;
      e.preventDefault();
      const el = pathname === "/" && document.getElementById(section.id);
      if (el) {
        el.scrollIntoView();
        history.replaceState(null, "", `#${section.id}`);
      } else {
        router.push(section.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname, router]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper text-ink font-ui text-xl leading-none shadow-[0_0.4rem_0_var(--shadow)]">
      <nav
        aria-label="Navigation principale"
        className="flex items-center gap-1 px-2 md:px-4 h-9 overflow-x-auto [scrollbar-width:none]"
      >
        <Link
          href="/"
          className="shrink-0 px-2 py-1 hover:bg-win hover:text-fg"
          aria-label="Accueil"
        >
          ≡ <span className="hidden sm:inline">gurkan-os</span>
        </Link>
        <ul className="flex items-center">
          {SECTIONS.map((s) => {
            const current = s.id === "blog" && pathname.startsWith("/blog");
            return (
              <li key={s.id} className="shrink-0">
                <Link
                  href={s.href}
                  aria-keyshortcuts={s.key}
                  aria-current={current ? "page" : undefined}
                  className={`group block px-1.5 md:px-2 py-1 hover:bg-win hover:text-fg ${
                    current ? "bg-win text-fg" : ""
                  }`}
                >
                  <Hotkey label={s.label} hotkey={s.key} />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto shrink-0 pl-4 hidden sm:block">
          Strasbourg <Clock />
        </div>
      </nav>
    </header>
  );
}

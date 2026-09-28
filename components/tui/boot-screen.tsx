"use client";

import { useEffect, useRef } from "react";

// Moment (en secondes) où l'écran de boot s'éteint et où le bureau s'allume.
const BOOT_OFF = 1.6;
const BOOT_END = 2.2;

const MODULES = ["next.js", "nestjs", "python", "docker", "jenkins"];

export const BOOTED_EVENT = "gt:booted";

function finish(early: boolean) {
  const html = document.documentElement;
  if (html.dataset.boot !== "play") return;
  if (early) html.dataset.boot = "done";
  window.dispatchEvent(new Event(BOOTED_EVENT));
}

export default function BootScreen() {
  const memRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.boot !== "play") return;

    const skip = () => finish(true);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    // Compteur de mémoire façon POST
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start - 140) / 380));
      if (memRef.current) {
        memRef.current.textContent = String(Math.round(t * 65536)).padStart(5, " ");
      }
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const off = setTimeout(() => finish(false), BOOT_OFF * 1000);
    const end = setTimeout(() => {
      if (html.dataset.boot === "play") html.dataset.boot = "done";
    }, BOOT_END * 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(off);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  const line = (delay: number) => ({
    className: "boot-line",
    style: { animationDelay: `${delay}s` },
  });

  return (
    <div
      className="boot fixed inset-0 z-[100] bg-ink text-paper font-ui text-xl md:text-2xl leading-tight p-6 md:p-12 select-none"
      aria-hidden="true"
    >
      <div className="flex justify-between gap-6">
        <p {...line(0)}>
          GT-BIOS v26.09 (C) 2026 Gurkan Taner, Strasbourg
        </p>
        <p {...line(0)} className="boot-line hidden md:block text-yellow">
          ▓▓ gurkan-os ▓▓
        </p>
      </div>
      <p {...line(0.06)}>Processeur : architecte logiciel, MSc Epitech</p>
      <p {...line(0.14)}>
        Mémoire vive : <span ref={memRef} className="whitespace-pre">    0</span>K OK
      </p>
      <p {...line(0.55)} className="boot-line mt-6">
        Détection des modules…
      </p>
      {MODULES.map((m, i) => (
        <p key={m} {...line(0.62 + i * 0.07)} className="boot-line pl-6">
          {m.padEnd(16, ".")} <span className="text-cyan">ok</span>
        </p>
      ))}
      <p {...line(0.98)} className="boot-line mt-6">
        Chargement de gurkan-os{" "}
        <span className="boot-bar text-cyan">{"█".repeat(20)}</span>
      </p>
      <p {...line(1.32)} className="boot-line">
        Prêt.<span className="blink">_</span>
      </p>
      <p className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-fg-dim">
        Appuie sur une touche pour passer
      </p>
    </div>
  );
}

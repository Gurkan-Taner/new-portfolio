"use client";

import { useEffect, useRef } from "react";

import { GLYPHS, NAME_WORDS as WORDS } from "@/lib/pixel-font";

import { BOOTED_EVENT } from "./boot-screen";

const NOISE = "01#$%&*+<>/\\{}[]=?!;:~^";

const PAD = 1; // marge en cellules autour du texte
const LINE_GAP = 2;

/** Construit la grille : 1 = pixel allumé d'une lettre. */
function buildMask() {
  const wordCols = Math.max(...WORDS.map((w) => w.length * 6 - 1));
  const cols = wordCols + PAD * 2 + 1; // +1 pour l'ombre portée
  const rows = WORDS.length * 7 + (WORDS.length - 1) * LINE_GAP + PAD * 2 + 1;
  const on = new Uint8Array(cols * rows);
  WORDS.forEach((word, li) => {
    const y0 = PAD + li * (7 + LINE_GAP);
    [...word].forEach((ch, ci) => {
      const x0 = PAD + ci * 6;
      GLYPHS[ch].forEach((row, y) =>
        [...row].forEach((px, x) => {
          if (px === "#") on[(y0 + y) * cols + x0 + x] = 1;
        })
      );
    });
  });
  return { cols, rows, on };
}

export default function NameMatrix({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { cols, rows, on } = buildMask();
    const n = cols * rows;
    const css = getComputedStyle(document.documentElement);
    const color = (v: string) => css.getPropertyValue(v).trim();
    const C = {
      fg: color("--fg"),
      dim: color("--fg-dim"),
      cyan: color("--cyan"),
      yellow: color("--yellow"),
      ink: color("--ink"),
    };
    const fontFamily = getComputedStyle(canvas).fontFamily;

    // Chaque cellule se décode à son tour, en vague diagonale.
    const reveal = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = i % cols;
      const y = (i / cols) | 0;
      reveal[i] = (x * 22 + y * 38 + Math.random() * 260) | 0;
    }
    const DECODE = 240;
    const revealEnd = Math.max(...reveal) + DECODE;

    const heat = new Float32Array(n);
    const noise = new Uint8Array(n).map(() => (Math.random() * NOISE.length) | 0);

    let cell = 0;
    let t0 = -1;
    let raf = 0;
    let running = false;
    const pointer = { x: -1e3, y: -1e3, burst: 0 };

    const resize = () => {
      const w = wrap.clientWidth;
      cell = Math.max(6, Math.min(26, Math.floor(w / cols)));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = cols * cell * dpr;
      canvas.height = rows * cell * dpr;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${Math.round(cell * 1.15)}px ${fontFamily}`;
      draw(performance.now());
    };

    const draw = (now: number) => {
      const t = t0 < 0 ? -1 : reduced ? Infinity : now - t0;
      ctx.clearRect(0, 0, cols * cell, rows * cell);
      let hot = false;

      const shadowOff = Math.max(2, Math.round(cell * 0.3));
      const gap = cell > 12 ? 1 : 0;
      for (let i = 0; i < n; i++) {
        const x = (i % cols) * cell;
        const y = ((i / cols) | 0) * cell;
        const h = heat[i];
        if (h > 0.01) hot = true;
        if (h > 0.2 && Math.random() < 0.3) noise[i] = (Math.random() * NOISE.length) | 0;

        const since = t - reveal[i];
        if (on[i] && since >= DECODE && h <= 0.25) {
          // Ombre portée DOS, décalée d'un tiers de cellule
          ctx.fillStyle = C.ink;
          ctx.fillRect(x + shadowOff, y + shadowOff, cell, cell);
        }
      }

      for (let i = 0; i < n; i++) {
        const x = (i % cols) * cell;
        const y = ((i / cols) | 0) * cell;
        const h = heat[i];
        const since = t - reveal[i];
        if (on[i]) {
          if (since < 0) continue;
          if (since < DECODE || h > 0.25) {
            ctx.fillStyle = h > 0.6 ? C.yellow : C.cyan;
            ctx.fillText(NOISE[noise[i]], x + cell / 2, y + cell / 2);
            if (since < DECODE) noise[i] = (Math.random() * NOISE.length) | 0;
          } else {
            ctx.fillStyle = C.fg;
            ctx.fillRect(x, y, cell - gap, cell - gap);
          }
        } else if (h > 0.08) {
          ctx.globalAlpha = Math.min(1, h * 1.4);
          ctx.fillStyle = C.dim;
          ctx.fillText(NOISE[noise[i]], x + cell / 2, y + cell / 2);
          ctx.globalAlpha = 1;
        } else if (since > 0) {
          // Grille de points très discrète : on devine les cellules.
          ctx.fillStyle = "rgba(170,180,240,0.22)";
          ctx.fillRect(x + cell / 2 - 1, y + cell / 2 - 1, 2, 2);
        }
      }
      return hot || (t >= 0 && t < revealEnd);
    };

    const step = (now: number) => {
      // Le pointeur réchauffe les cellules autour de lui ; la chaleur retombe.
      const px = pointer.x / cell;
      const py = pointer.y / cell;
      const r = 4.2 + pointer.burst * 6;
      for (let i = 0; i < n; i++) {
        const dx = (i % cols) + 0.5 - px;
        const dy = ((i / cols) | 0) + 0.5 - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        heat[i] = Math.max(heat[i] * 0.92, d < r ? 1 - d / r : 0);
      }
      pointer.burst *= 0.85;
      const again = draw(now);
      if (again) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (t0 >= 0) return;
      t0 = performance.now();
      if (reduced) draw(t0);
      else wake();
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      pointer.burst = 1;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e3;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerleave", onLeave);

    // On attend que la police soit prête et que l'écran de boot soit fini.
    let fallback: ReturnType<typeof setTimeout> | undefined;
    document.fonts.ready.then(() => {
      resize();
      if (document.documentElement.dataset.boot === "play") {
        window.addEventListener(BOOTED_EVENT, start, { once: true });
        fallback = setTimeout(start, 2400);
      } else {
        start();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      ro.disconnect();
      window.removeEventListener(BOOTED_EVENT, start);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`w-full ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="font-ui block touch-pan-y" />
    </div>
  );
}

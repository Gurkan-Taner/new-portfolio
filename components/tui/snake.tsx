"use client";

import { useEffect, useRef, useState } from "react";

type P = { x: number; y: number };

const W = 24;
const H = 12;
const DIRS: Record<string, P> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  z: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  q: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function randomFood(snake: P[]): P {
  for (;;) {
    const f = { x: (Math.random() * W) | 0, y: (Math.random() * H) | 0 };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

export default function Snake({ onExit }: { onExit: (score: number) => void }) {
  const [, force] = useState(0);
  const game = useRef({
    snake: [
      { x: 6, y: 6 },
      { x: 5, y: 6 },
      { x: 4, y: 6 },
    ],
    dir: { x: 1, y: 0 },
    queue: [] as P[],
    food: { x: 16, y: 6 },
    score: 0,
    over: false,
  });
  const exitRef = useRef(onExit);
  exitRef.current = onExit;

  const steer = (d: P) => {
    const g = game.current;
    const last = g.queue[g.queue.length - 1] ?? g.dir;
    if (d.x === -last.x && d.y === -last.y) return; // pas de demi-tour
    if (g.queue.length < 3) g.queue.push(d);
  };

  useEffect(() => {
    const g = game.current;
    const end = () => {
      g.over = true;
      exitRef.current(g.score);
    };

    // En capture : les touches du jeu ne doivent pas déclencher les raccourcis du site.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        end();
        return;
      }
      const d = DIRS[e.key] ?? DIRS[e.key.toLowerCase()];
      if (!d) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      steer(d);
    };
    window.addEventListener("keydown", onKey, { capture: true });

    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (g.over) return;
      g.dir = g.queue.shift() ?? g.dir;
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
      const hit =
        head.x < 0 ||
        head.y < 0 ||
        head.x >= W ||
        head.y >= H ||
        g.snake.some((s) => s.x === head.x && s.y === head.y);
      if (hit) return end();
      g.snake.unshift(head);
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score++;
        g.food = randomFood(g.snake);
      } else {
        g.snake.pop();
      }
      force((n) => n + 1);
      timer = setTimeout(tick, Math.max(60, 130 - g.score * 4));
    };
    timer = setTimeout(tick, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey, { capture: true });
    };
  }, []);

  const g = game.current;
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = g.snake.findIndex((s) => s.x === x && s.y === y);
      const food = g.food.x === x && g.food.y === y;
      cells.push(
        <span
          key={`${x}-${y}`}
          className={
            i === 0
              ? "bg-yellow"
              : i > 0
                ? "bg-cyan"
                : food
                  ? "bg-[#ff7b88] scale-[0.6]"
                  : ""
          }
        />
      );
    }
  }

  const pad = (d: P, label: string, cls: string) => (
    <button
      type="button"
      aria-label={label}
      onClick={() => steer(d)}
      className={`${cls} w-12 h-12 bg-win text-fg text-2xl active:bg-cyan active:text-ink`}
    >
      {label === "Haut" ? "▲" : label === "Bas" ? "▼" : label === "Gauche" ? "◀" : "▶"}
    </button>
  );

  return (
    <div className="my-2" aria-label={`Snake, score ${g.score}`}>
      <div
        className="grid border-2 border-cyan w-full max-w-[28rem] bg-[radial-gradient(var(--desk-dot)_1px,transparent_1.5px)] [background-size:calc(100%/24)_calc(100%/12)]"
        style={{
          gridTemplateColumns: `repeat(${W}, 1fr)`,
          aspectRatio: `${W} / ${H}`,
        }}
      >
        {cells}
      </div>
      <p className="mt-1">
        score <span className="text-yellow">{g.score}</span>
        <button
          type="button"
          onClick={() => {
            g.over = true;
            onExit(g.score);
          }}
          className="ml-4 underline text-fg-dim hover:text-cyan"
        >
          quitter
        </button>
      </p>
      <div className="grid grid-cols-3 gap-1 w-fit mt-3 md:hidden">
        {pad({ x: 0, y: -1 }, "Haut", "col-start-2")}
        {pad({ x: -1, y: 0 }, "Gauche", "col-start-1 row-start-2")}
        {pad({ x: 1, y: 0 }, "Droite", "col-start-3 row-start-2")}
        {pad({ x: 0, y: 1 }, "Bas", "col-start-2 row-start-3")}
      </div>
    </div>
  );
}

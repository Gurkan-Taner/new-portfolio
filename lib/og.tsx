import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

import { GLYPHS } from "@/lib/pixel-font";

// Mêmes couleurs que app/globals.css
export const OG = {
  desk: "#0a1570",
  win: "#1428b8",
  paper: "#c9ccd6",
  fg: "#f4f6ff",
  dim: "#aab4f0",
  cyan: "#4ff0f0",
  yellow: "#ffe44d",
  ink: "#000000",
};

export const ogSize = { width: 1200, height: 630 };

export async function ogFonts() {
  const data = await readFile(join(process.cwd(), "assets/fonts/VT323-Regular.ttf"));
  return [{ name: "VT323", data, style: "normal" as const, weight: 400 as const }];
}

/** Un mot en police pixel, avec l'ombre portée DOS. */
export function PixelWord({ word, cell }: { word: string; cell: number }) {
  const shadow = Math.round(cell * 0.3);
  const letters = [...word].map((ch) => GLYPHS[ch]);
  const layer = (color: string, offset: number) => (
    <div style={{ position: "absolute", left: offset, top: offset, display: "flex", gap: cell }}>
      {letters.map((rows, li) => (
        <div key={li} style={{ display: "flex", flexDirection: "column" }}>
          {rows.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {[...row].map((px, x) => (
                <div
                  key={x}
                  style={{
                    width: cell,
                    height: cell,
                    background: px === "#" ? color : "transparent",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: word.length * 6 * cell - cell + shadow,
        height: 7 * cell + shadow,
      }}
    >
      {layer(OG.ink, shadow)}
      {layer(OG.fg, 0)}
    </div>
  );
}

/** Fenêtre gurkan-os : fond tramé, cadre double, titre posé sur le cadre. */
export function OgWindow({
  title,
  cmd,
  children,
}: {
  title: string;
  cmd: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: OG.desk,
        backgroundImage: "radial-gradient(#2437c4 1px, transparent 1.3px)",
        backgroundSize: "4px 4px",
        padding: "44px 64px 64px 44px",
        fontFamily: "VT323",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          background: OG.win,
          padding: 10,
          boxShadow: "22px 18px 0 rgba(0,0,0,0.72)",
        }}
      >
        {/* Satori ne connaît pas border-style: double, d'où deux cadres imbriqués */}
        <div
          style={{
            flex: 1,
            display: "flex",
            border: `2px solid ${OG.fg}`,
            padding: 4,
            position: "relative",
            color: OG.fg,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              border: `2px solid ${OG.fg}`,
              padding: "42px 42px 32px",
            }}
          >
            {children}
          </div>
          <div
            style={{
              position: "absolute",
              top: -22,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ background: OG.win, padding: "0 16px", fontSize: 38, lineHeight: 1 }}>
              {title}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -18,
              right: 24,
              background: OG.win,
              padding: "0 10px",
              fontSize: 30,
              lineHeight: 1,
              color: OG.dim,
            }}
          >
            {cmd}
          </div>
        </div>
      </div>
    </div>
  );
}

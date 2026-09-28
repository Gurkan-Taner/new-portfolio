import { ImageResponse } from "next/og";

import { DATA } from "@/data/resume";
import { NAME_WORDS } from "@/lib/pixel-font";
import { OG, OgWindow, PixelWord, ogFonts, ogSize } from "@/lib/og";

export const alt = `${DATA.name}, ${DATA.jobTitle} à Strasbourg`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgWindow title="gurkan-os" cmd="./whoami">
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {NAME_WORDS.map((w) => (
            <PixelWord key={w} word={w} cell={17} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ fontSize: 46, lineHeight: 1.1 }}>
            Software engineer freelance à Strasbourg
          </div>
          <div style={{ fontSize: 34, color: OG.cyan, marginTop: 6 }}>
            MVP, SaaS, architecture et DevOps. gurkan-taner.fr
          </div>
        </div>
      </OgWindow>
    ),
    { ...size, fonts: await ogFonts() }
  );
}

import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${DATA.name}, software engineer freelance`,
    short_name: "gurkan-os",
    description: DATA.description,
    lang: "fr",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1570",
    theme_color: "#0a1570",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

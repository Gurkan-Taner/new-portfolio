import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gurkan Taner Portfolio",
    short_name: "GT Portfolio",
    description: "Software Engineer / DevOps",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

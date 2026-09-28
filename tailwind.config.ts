import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desk: "var(--desk)",
        win: "var(--win)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        fg: "var(--fg)",
        "fg-dim": "var(--fg-dim)",
        cyan: "var(--cyan)",
        yellow: "var(--yellow)",
        red: "var(--red)",
      },
      fontFamily: {
        ui: "var(--font-ui)",
        text: "var(--font-text)",
      },
    },
  },
  plugins: [],
};
export default config;

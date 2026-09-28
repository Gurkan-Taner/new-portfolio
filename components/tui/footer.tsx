import { DATA } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="ui text-xl text-fg-dim text-center pt-4 pb-16 md:pb-14">
      © {new Date().getFullYear()} {DATA.name}, Strasbourg. Fait main, sans
      template.
    </footer>
  );
}

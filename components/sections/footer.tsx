import { DATA } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 text-center text-gray-600 text-sm">
      <p>
        © {new Date().getFullYear()} — {DATA.name}. Codé avec passion.
      </p>
      <p className="mt-2 font-mono uppercase tracking-widest text-[10px]">
        Architecting Excellence
      </p>
    </footer>
  );
}

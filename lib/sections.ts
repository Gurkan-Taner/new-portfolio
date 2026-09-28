export type Section = {
  id: string;
  label: string;
  /** Touche clavier qui amène à la section, affichée en rouge dans le menu. */
  key: string;
  href: string;
};

export const SECTIONS: Section[] = [
  { id: "projets", label: "Projets", key: "p", href: "/#projets" },
  { id: "stack", label: "Stack", key: "s", href: "/#stack" },
  { id: "experiences", label: "Expériences", key: "e", href: "/#experiences" },
  { id: "jeux", label: "Jeux", key: "j", href: "/#jeux" },
  { id: "contact", label: "Contact", key: "c", href: "/#contact" },
  { id: "blog", label: "Blog", key: "b", href: "/blog" },
];

/** Vrai si l'utilisateur est en train d'écrire : les raccourcis doivent se taire. */
export function isTyping(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  return (
    e.metaKey ||
    e.ctrlKey ||
    e.altKey ||
    !!el?.closest("input, textarea, select, [contenteditable='true']")
  );
}

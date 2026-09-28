import type { ReactNode } from "react";

/**
 * Fenêtre Turbo Vision : fond bleu, cadre double, titre posé sur le cadre,
 * ombre portée noire. `cmd` affiche en bas à droite la commande qui
 * « produit » le contenu de la fenêtre.
 */
export default function Window({
  id,
  title,
  cmd,
  className = "",
  children,
  as: Tag = "section",
  titleAs: Title = "h2",
}: {
  id?: string;
  title: string;
  cmd?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "article";
  titleAs?: "h1" | "h2" | "p";
}) {
  return (
    <Tag id={id} className={`win ${className}`}>
      <div className="win-frame">
        <Title className="win-title">{title}</Title>
        {children}
        {cmd && (
          <p className="win-cmd" aria-hidden="true">
            {cmd}
          </p>
        )}
      </div>
    </Tag>
  );
}

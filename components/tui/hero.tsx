import { DATA } from "@/data/resume";

import CalButton from "./cal-button";
import NameMatrix from "./name-matrix";
import Window from "./window";

export default function Hero() {
  return (
    <Window title="gurkan-os" cmd="./whoami" as="div" titleAs="p">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-end">
        <NameMatrix className="min-h-[8rem]" />

        <div className="max-w-[38rem] pb-2">
          <p className="ui text-2xl text-fg-dim mb-3" aria-hidden="true">
            $ whoami
          </p>
          <h1 className="text-lg md:text-xl font-semibold leading-snug mb-4 text-balance">
            {DATA.name}, software engineer freelance à Strasbourg.
          </h1>
          <p className="text-fg-dim mb-6">{DATA.summary}</p>
          <p className="ui text-2xl mb-8">
            <span className="text-cyan">[x]</span> Disponible pour de nouveaux
            projets
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-5">
            <CalButton>Réserver un appel</CalButton>
            <a href="#projets" className="btn btn-quiet">
              Voir les projets
            </a>
          </div>
        </div>
      </div>
    </Window>
  );
}

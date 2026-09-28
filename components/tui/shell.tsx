"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { DATA } from "@/data/resume";
import { openCal } from "@/lib/cal";
import { SECTIONS, isTyping } from "@/lib/sections";

import Snake from "./snake";

type Line = { kind: "in" | "out" | "err"; body: ReactNode };

const PROMPT = "gurkan@strasbourg:~$";
const EMAIL = DATA.contact.social.email.url;
const GITHUB = DATA.contact.social.GitHub.url;
const LINKEDIN = DATA.contact.social.LinkedIn.url;

const HELP: [string, string][] = [
  ["call", "réserver un appel de 30 minutes"],
  ["mail", "m'écrire un e-mail"],
  ["github", "ouvrir mon GitHub"],
  ["linkedin", "ouvrir mon LinkedIn"],
  ["ls", "lister les sections"],
  ["cd <section>", "aller à une section"],
  ["whoami", "qui je suis"],
  ["snake", "jouer une partie"],
  ["clear", "vider l'écran"],
];

const COMMANDS = [...HELP.map(([c]) => c.split(" ")[0]), "help", "blog", "date", "echo"];

const CHIPS = ["help", "call", "mail", "github", "linkedin", "snake"];

const WELCOME: Line[] = [
  {
    kind: "out",
    body: (
      <>
        gurkan-os 26.09. Tape <b className="text-yellow">help</b> pour voir
        les commandes, ou choisis-en une ci-dessous.
      </>
    ),
  },
];

export default function Shell() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const print = useCallback((...more: Line[]) => {
    setLines((l) => [...l, ...more]);
  }, []);

  const out = (body: ReactNode): Line => ({ kind: "out", body });
  const err = (body: ReactNode): Line => ({ kind: "err", body });

  const run = useCallback(
    (raw: string) => {
      const cmdline = raw.trim();
      print({ kind: "in", body: cmdline });
      if (!cmdline) return;
      setHistory((h) => [cmdline, ...h].slice(0, 50));
      setHistIdx(-1);

      const [cmd, ...args] = cmdline.split(/\s+/);
      const arg = args.join(" ");

      switch (cmd.toLowerCase()) {
        case "help":
          print(
            out(
              <table className="my-1">
                <tbody>
                  {HELP.map(([c, d]) => (
                    <tr key={c}>
                      <td className="text-yellow pr-6 align-top whitespace-nowrap">{c}</td>
                      <td>{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          );
          break;
        case "call":
        case "rdv":
          print(out("Ouverture du calendrier…"));
          openCal();
          break;
        case "mail":
          print(
            out(
              <>
                Écris-moi à{" "}
                <a className="text-cyan underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </>
            )
          );
          window.location.href = `mailto:${EMAIL}`;
          break;
        case "github":
          print(out(`Ouverture de ${GITHUB}`));
          window.open(GITHUB, "_blank", "noopener");
          break;
        case "linkedin":
          print(out(`Ouverture de ${LINKEDIN}`));
          window.open(LINKEDIN, "_blank", "noopener");
          break;
        case "ls":
          print(out(SECTIONS.map((s) => `${s.id}/`).join("  ")));
          break;
        case "cd": {
          const target = arg.replace(/^~?\/?/, "").replace(/\/$/, "").toLowerCase();
          const section = SECTIONS.find((s) => s.id === target);
          if (!target || target === "~") {
            window.scrollTo({ top: 0 });
          } else if (!section) {
            print(err(`cd : ${arg} : dossier introuvable. Tape ls pour la liste.`));
          } else if (section.id === "blog") {
            router.push("/blog");
          } else {
            document.getElementById(section.id)?.scrollIntoView();
          }
          break;
        }
        case "blog":
          router.push("/blog");
          break;
        case "whoami":
          print(out(DATA.summary));
          break;
        case "date":
          print(out(new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })));
          break;
        case "echo":
          print(out(arg));
          break;
        case "snake":
          print(out("Flèches ou ZQSD pour jouer, Échap pour quitter."));
          setPlaying(true);
          break;
        case "clear":
          setLines([]);
          break;
        case "sudo":
          print(err("Bien essayé. Ici, le super-utilisateur c'est toi : tape call."));
          break;
        case "rm":
          print(err("rm : opération refusée, ce portfolio est en lecture seule."));
          break;
        case "exit":
        case "quit":
        case ":q":
          print(out("Pas de sortie par ici. Tape call pour parler à un humain."));
          break;
        default:
          print(err(`${cmd} : commande introuvable. Tape help pour la liste.`));
      }
    },
    [print, router]
  );

  // Les boutons « tapent » la commande avant de l'exécuter.
  const type = (cmd: string) => {
    if (busy || playing) return;
    setBusy(true);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setInput(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(t);
        setTimeout(() => {
          run(cmd);
          setInput("");
          setBusy(false);
        }, 120);
      }
    }, 45);
  };

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, playing]);

  // « / » depuis n'importe où : focus sur le shell.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || isTyping(e)) return;
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView();
      inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, history.length - 1);
      if (i >= 0) {
        setHistIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = histIdx - 1;
      setHistIdx(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab" && input) {
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) {
        e.preventDefault();
        setInput(match);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="bg-ink border-2 border-fg-dim flex flex-col">
      <div
        ref={screenRef}
        onClick={() => !playing && inputRef.current?.focus()}
        className="ui text-xl md:text-2xl leading-7 p-4 h-[22rem] overflow-y-auto overscroll-contain"
        role="log"
        aria-live="polite"
        aria-label="Sortie du shell"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words ${
              l.kind === "err" ? "text-[#ff7b88]" : l.kind === "in" ? "text-fg" : "text-fg-dim"
            }`}
          >
            {l.kind === "in" && <span className="text-cyan">{PROMPT} </span>}
            {l.body}
          </div>
        ))}

        {playing ? (
          <Snake
            onExit={(score) => {
              setPlaying(false);
              print(
                out(
                  <>
                    Partie terminée, score : <b className="text-yellow">{score}</b>.
                    Tape snake pour rejouer.
                  </>
                )
              );
              setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
            }}
          />
        ) : (
          <label className="flex gap-2">
            <span className="text-cyan shrink-0" aria-hidden="true">
              {PROMPT}
            </span>
            <span className="sr-only">Commande</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              readOnly={busy}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="send"
              className="flex-1 min-w-0 bg-transparent text-fg caret-yellow outline-none"
            />
          </label>
        )}
      </div>
      <div className="flex flex-wrap gap-2 p-3 border-t-2 border-fg-dim">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => type(c)}
            disabled={busy || playing}
            className="ui text-xl px-3 py-0.5 bg-win text-fg hover:bg-cyan hover:text-ink disabled:opacity-50"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

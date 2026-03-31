"use client";

import { Zap, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import useScroll from "@/hooks/useScroll";
import { DATA } from "@/data/resume";

type TermLine = { text: string; color?: string; delay: number };

const NoiseFilter = () => (
  <svg
    className="absolute inset-0 pointer-events-none opacity-[0.035] w-full h-full"
    aria-hidden="true"
  >
    <filter id="noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const MagneticButton = ({
  children,
  className,
  href,
  onClick,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <motion.span
    aria-hidden="true"
    className="block"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.034, delayChildren: delay } },
    }}
    initial="hidden"
    animate="visible"
  >
    {Array.from(text).map((char, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { visibility: "hidden" as const },
          visible: { visibility: "visible" as const },
        }}
        className="inline-block"
      >
        {char === " " ? "\u00a0" : char}
      </motion.span>
    ))}
  </motion.span>
);

const LINES: TermLine[] = [
  { text: "$ git clone my-app", color: "#e2e8f0", delay: 0.6 },
  { text: "  Cloning into 'my-app'...", color: "#475569", delay: 1.4 },
  { text: "$ docker compose up -d", color: "#e2e8f0", delay: 2.4 },
  { text: "  ✔ api       Running  :3000", color: "#34d399", delay: 3.1 },
  { text: "  ✔ postgres  Running  :5432", color: "#34d399", delay: 3.4 },
  { text: "  ✔ redis     Running  :6379", color: "#34d399", delay: 3.7 },
  { text: "$ npm run deploy", color: "#e2e8f0", delay: 5.0 },
  { text: "  Building...  ██████████  100%", color: "#60a5fa", delay: 5.7 },
  { text: "  ✔ Deployed to production", color: "#34d399", delay: 6.9 },
  { text: "  ↳ https://your-domain.app", color: "#818cf8", delay: 7.3 },
];

const TLine = ({ line, loopKey }: { line: TermLine; loopKey: number }) => {
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(false);
  const isCmd = line.text.startsWith("$");

  useEffect(() => {
    setTyped("");
    setVisible(false);
    const show = setTimeout(() => {
      setVisible(true);
      if (!isCmd) {
        setTyped(line.text);
        return;
      }
      let i = 0;
      const iv = setInterval(() => {
        setTyped(line.text.slice(0, ++i));
        if (i >= line.text.length) clearInterval(iv);
      }, 38);
      return () => clearInterval(iv);
    }, line.delay * 1000);
    return () => clearTimeout(show);
  }, [loopKey]);

  if (!visible) return null;
  return (
    <div className="flex items-start font-mono text-[12.5px] leading-[1.7] whitespace-pre">
      <span style={{ color: line.color ?? "#64748b" }}>{typed}</span>
      {isCmd && typed.length < line.text.length && (
        <span
          className="inline-block w-[6px] h-[13px] ml-px mt-[3px] animate-[blink_0.8s_step-end_infinite]"
          style={{ background: "#60a5fa" }}
        />
      )}
    </div>
  );
};

const Terminal = () => {
  const [loopKey, setLoopKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLoopKey((k) => k + 1), 11_500);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden border"
      style={{
        background: "rgba(8,10,16,0.88)",
        borderColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(14px)",
      }}
      aria-label="Terminal animé"
    >
      <div
        className="flex items-center gap-1.5 px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "rgba(255,95,87,0.7)" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "rgba(255,189,46,0.7)" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "rgba(40,200,64,0.7)" }}
        />
        <span
          className="ml-3 font-mono text-[11px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          zsh — ~/projects
        </span>
      </div>

      <div className="p-5 min-h-[268px] flex flex-col gap-[1px]">
        {LINES.map((line, i) => (
          <TLine key={`${loopKey}-${i}`} line={line} loopKey={loopKey} />
        ))}
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-14 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(8,10,16,0.9), transparent)",
        }}
      />
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </motion.div>
  );
};

const LINES_TITLE = ["Coder", "Tester", "Livrer."];
const TITLE_FULL = LINES_TITLE.join(" ");

const LINE_DELAYS = [0.2, 0.2 + LINES_TITLE[0].length * 0.034 + 0.08, 0];
LINE_DELAYS[2] = LINE_DELAYS[1] + LINES_TITLE[1].length * 0.034 + 0.08;

export default function Hero() {
  const { scrollToSection } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20 "
      style={{
        minHeight: "100dvh",
        paddingBottom: "max(4rem, calc(env(safe-area-inset-bottom) + 2rem))",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-8 backdrop-blur-sm"
            style={{
              background: "rgba(59,130,246,0.08)",
              borderColor: "rgba(59,130,246,0.2)",
              color: "#60a5fa",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            Disponible pour de nouveaux projets
          </motion.div>

          <motion.h1
            aria-label={TITLE_FULL}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="font-black tracking-tight leading-[1.06] mb-8"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)" }}
          >
            <span className="block text-white">
              <Typewriter text={LINES_TITLE[0]} delay={LINE_DELAYS[0]} />
            </span>
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <Typewriter text={LINES_TITLE[1]} delay={LINE_DELAYS[1]} />
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                color: "transparent",
              }}
            >
              <Typewriter text={LINES_TITLE[2]} delay={LINE_DELAYS[2]} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-gray-400 leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: "clamp(1rem, 1.7vw, 1.1rem)" }}
          >
            {DATA.summary}
            <span className="block mt-3 text-gray-500 font-medium text-xs tracking-widest uppercase">
              Software Engineer · DevOps · Cybersecurity
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.88 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <MagneticButton
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-bold rounded-2xl text-sm overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Lancer mon projet
                <Zap size={15} fill="currentColor" aria-hidden="true" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-medium border transition-all hover:bg-white/5 active:scale-[0.97]"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Voir mes travaux
              <ArrowUpRight size={15} aria-hidden="true" />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="hidden lg:block">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

import { motion } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";
import { Cpu, Globe, Zap } from "lucide-react";
import { DATA } from "@/data/resume";

export default function Contact() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <BlurFade delay={0.2}>
      <div className="relative group max-w-5xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-20 overflow-hidden">
          {/* Bordure animée laser */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={
                {
                  background: `
                  conic-gradient(
                    from var(--angle),
                    transparent 70%,
                    rgba(59, 130, 246, 0.8) 80%,
                    rgba(147, 51, 234, 0.8) 85%,
                    rgba(59, 130, 246, 0.8) 90%,
                    transparent 100%
                  )
                `,
                  "--angle": "0deg",
                } as React.CSSProperties
              }
              animate={
                {
                  "--angle": "360deg",
                } as never
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="absolute inset-[2px] bg-[#0A0A0A] rounded-[calc(2rem-2px)]" />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
              Parlons Business
            </span>

            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
              PRÊT À{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                CRÉER ?
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
              Besoin d&apos;un{" "}
              <span className="text-white font-semibold">MVP rapide</span>,
              d&apos;un{" "}
              <span className="text-white font-semibold">SaaS scalable</span> ou
              d&rsquo;une expertise en{" "}
              <span className="text-white font-semibold">architecture</span> ?
              Discutons de votre vision et construisons ensemble.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
              <Button
                className="hover:scale-105 duration-300 relative inline-flex h-16 items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-bold text-black transition-all hover:bg-gray-200 w-full md:w-auto overflow-hidden group/btn"
                data-cal-namespace="30min"
                data-cal-link="taner-gurkan/30min"
                data-cal-config='{"layout":"month_view"}'
              >
                <span className="relative z-10 flex items-center gap-2">
                  Réserver un appel <Zap size={20} fill="currentColor" />
                </span>
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover/btn:animate-shimmer" />
              </Button>

              <div className="h-[1px] w-20 md:h-12 md:w-[1px] bg-white/10" />

              <div className="flex items-center gap-4">
                {Object.entries(DATA.contact.social)
                  .filter(([_, s]) => s.navbar)
                  .map(([name, social]) => (
                    <motion.a
                      key={name}
                      href={social.url}
                      whileHover={{ y: -5 }}
                      className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      title={name}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 w-full flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-sm font-mono">
                <Cpu size={16} /> ARCHITECTURE SCALABLE
              </div>
              <div className="flex items-center gap-2 text-sm font-mono">
                <Globe size={16} /> FULLSTACK EXPERT
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}


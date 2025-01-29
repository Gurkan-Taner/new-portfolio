"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TerminalHeader() {
  const ref = useRef(null);
  const [typingStage, setTypingStage] = useState(0);
  const [typedTexts, setTypedTexts] = useState({
    command: "",
    name: "",
    role: "",
    about: "",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [-100, 100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  const texts = {
    command: "whoami",
    name: "Gurkan TANER",
    role: "Architecte Logiciel et Freelance",
    about:
      "Actuellement en dernière année à Epitech en MSc Pro pour préparer un titre d'architecte logiciel, je suis également développeur Fullstack à Progisem en alternance. En plus du dev, je suis également passionné de cybersécurité en travaillant sur la plateforme Try Hack Me (Top 7% monde).",
  };

  useEffect(() => {
    const typeText = (key: string, text: string, speed = 30) => {
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < text.length) {
          setTypedTexts((prev) => ({
            ...prev,
            [key]: text.slice(0, i + 1),
          }));
          i++;
        } else {
          clearInterval(typingEffect);
          setTypingStage((prev) => prev + 1);
        }
      }, speed);
      return () => clearInterval(typingEffect);
    };

    switch (typingStage) {
      case 0:
        typeText("command", texts.command, 200);
        break;
      case 1:
        typeText("name", texts.name);
        break;
      case 2:
        typeText("role", texts.role);
        break;
      case 3:
        typeText("about", texts.about, 10);
        break;
    }
  }, [typingStage]);

  return (
    <motion.header
      ref={ref}
      style={{
        scale: headerScale,
        y: headerY,
        opacity: headerOpacity,
      }}
      className="flex flex-col items-center justify-center h-screen relative p-4 sm:p-8"
    >
      <div className="bg-[#1F1F1F] text-gray-200 font-mono p-4 sm:p-6 rounded-lg w-full max-w-4xl mx-auto flex flex-col items-center shadow-2xl border border-blue-500/30 gap-y-4">
        <div className="flex items-center space-x-2 mr-auto">
          <div
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
            title="Fermer"
          />
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors"
            title="Réduire"
          />
          <div
            className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors"
            title="Agrandir"
          />
        </div>
        <div className="text-sm sm:text-xl w-full">
          <span className="text-purple-400 font-bold">
            gurkan@portfolio:~$ {typedTexts.command}
          </span>
          {typingStage === 0 && (
            <span className="animate-pulse ml-1 text-green-500">▂</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
          <div className="flex-shrink-0 self-center">
            <Image
              alt="Photo de profil"
              title="Photo de profil"
              src="/me.png"
              width={150}
              height={150}
              className="rounded-full border-2 border-gray-400/50 shadow-lg"
              priority={true}
            />
          </div>
          <div className="flex-grow w-full">
            <div className="space-y-2">
              <div>
                <span className="text-purple-400 font-bold">Nom:</span>
                <h1 className="ml-2 text-sm sm:text-base inline">
                  {typedTexts.name}
                </h1>
                {typingStage === 1 && (
                  <span className="ml-1 text-green-500 animate-blink">▮</span>
                )}
              </div>
              <div>
                <span className="text-purple-400 font-bold">Rôle:</span>
                <h2 className="ml-2 text-sm sm:text-base inline">
                  {typedTexts.role}
                </h2>
                {typingStage === 2 && (
                  <span className="ml-1 text-green-500 animate-blink">▮</span>
                )}
              </div>
              <div>
                <span className="text-purple-400 font-bold">À propos:</span>
                <p className="ml-2 text-xs sm:text-sm">
                  {typedTexts.about}
                  {typingStage === 3 && (
                    <span className="ml-1 text-green-500 animate-blink">▮</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

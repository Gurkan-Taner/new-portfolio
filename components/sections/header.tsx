"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Header() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [-100, 100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  return (
    <motion.header
      ref={ref}
      style={{
        scale: headerScale,
        y: headerY,
        opacity: headerOpacity,
      }}
      className="flex flex-col items-center justify-center h-screen relative p-8 sm:p-0"
    >
      <Image
        alt="Photo de profil"
        src="/me.png"
        width={200}
        height={200}
        className="rounded-full border-4 border-gray-400/90 shadow-2xl mb-6"
        priority={true}
      />
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-2">Gurkan TANER</h1>
        <h2 className="text-2xl font-medium mb-6">
          Architecte Logiciel et Freelance
        </h2>
        <h3 className="text-gray-300 text-base">
          Actuellement en dernière année à Epitech en MSc Pro pour préparer un
          titre d&apos;architecte logiciel, je suis également développeur
          Fullstack à Progisem en alternance. En plus du dev, je suis également
          passionné de cybersécurité en travaillant sur la plateforme Try Hack
          Me (Top 7% monde).
        </h3>
      </div>
    </motion.header>
  );
}

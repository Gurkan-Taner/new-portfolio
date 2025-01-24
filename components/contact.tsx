"use client";

import { useRef, useEffect } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { ContactIcon } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "./ui/button";

export default function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contactScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const contactY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const contactOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <motion.section
      ref={ref}
      style={{
        scale: contactScale,
        y: contactY,
        opacity: contactOpacity,
      }}
      className="mb-16 flex flex-col text-center"
    >
      <div className="flex items-center justify-center mb-8">
        <ContactIcon className="mr-4 w-10 h-10" />
        <h3 className="text-4xl font-bold">Prendre contact</h3>
      </div>
      <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
        Envi de me contacter ? C’est en mail par ici{" "}
        <a
          className="underline text-blue-500"
          href="mailto:gurkan.taner@outlook.fr"
        >
          gurkan.taner@outlook.fr
        </a>{" "}
        ou sur mes réseaux sociaux X ou Linkedin.
      </p>
      <Button
        className=" text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-110 hover:animate-in duration-500 animation m-auto"
        data-cal-namespace="30min"
        data-cal-link="taner-gurkan/30min"
        data-cal-config='{"layout":"month_view"}'
      >
        Réserver un appel
      </Button>
    </motion.section>
  );
}

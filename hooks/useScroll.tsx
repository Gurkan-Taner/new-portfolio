"use client";

import { useLenis } from "@studio-freight/react-lenis";

export default function useScroll() {
  const lenis = useLenis();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    lenis?.scrollTo(id, { lerp: 0.07 });
  };

  return { scrollToSection };
}

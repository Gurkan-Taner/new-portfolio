"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisScroller({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

"use client";

import { CAL_LINK, openCal } from "@/lib/cal";

export default function CalButton({
  children,
  className = "btn",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`https://cal.com/${CAL_LINK}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openCal();
      }}
    >
      {children}
    </a>
  );
}

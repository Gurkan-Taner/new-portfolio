"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const SectionNavigator = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([
    "header",
    "stack",
    "projects",
    "coding-games",
    "contact",
  ]);

  const scrollToSection = (direction: string) => {
    const currentIndex = currentSection;
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex < sectionsRef.current.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : sectionsRef.current.length - 1;
    }

    const targetSection = document.getElementById(
      sectionsRef.current[newIndex]
    );

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentSection(newIndex);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-2">
      <Button
        onClick={() => scrollToSection("next")}
        className="bg-gray-800/50 backdrop-blur-md p-2 rounded-full hover:bg-gray-700/70 transition-all"
      >
        <ChevronDown className="text-gray-300" />
      </Button>
    </div>
  );
};

export default SectionNavigator;

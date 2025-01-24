"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface ProjectProps {
  projects: unknown;
}

export default function ProjectCarousel({ projects }: ProjectProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);

  const handleRotate = (direction: string) => {
    const totalProjects = projects.length;
    console.log(totalProjects);

    const newIndex =
      direction === "left"
        ? (selectedIndex - 1 + totalProjects) % totalProjects
        : (selectedIndex + 1) % totalProjects;
    setSelectedIndex(newIndex);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;

    if (Math.abs(deltaX) > 150) {
      handleRotate(deltaX > 0 ? "left" : "right");
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUpGlobal);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, [isDragging, startX]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 perspective-1000">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-4xl h-80 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute w-full h-full flex justify-center items-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${
              -selectedIndex * (360 / projects.length)
            }deg)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          {projects.map((project, index) => {
            const angle = index * (360 / projects.length);
            const radius = 400;

            return (
              <div
                key={`${project} - ${index}`}
                className={`absolute w-64 h-80 flex-shrink-0 transform transition-all duration-500 ease-in-out
                  ${
                    index === selectedIndex
                      ? "scale-125 z-50 opacity-100"
                      : "scale-50 opacity-20"
                  }
                `}
                style={{
                  transform: `
                    rotateY(${angle}deg) 
                    translateZ(${radius}px)
                  `,
                }}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full text-center">
                  <Image
                    src={project.image}
                    width={256}
                    height={256}
                    className="select-none"
                    style={{ width: 'auto', height: 'auto' }}
                    priority={true}
                    alt={""}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleRotate("left")}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          ←
        </button>
        <button
          onClick={() => handleRotate("right")}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          →
        </button>
      </div>
    </div>
  );
}

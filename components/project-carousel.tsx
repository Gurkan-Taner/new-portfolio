"use client";

import Image from "next/image";
import { useState, useRef } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import ProjectProps from "@/interfaces/project-props";

export default function ProjectCarousel({ projects }: ProjectProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);

  const handleRotate = (direction: string) => {
    const totalProjects = projects.length;

    const newIndex =
      direction === "left"
        ? (selectedIndex - 1 + totalProjects) % totalProjects
        : (selectedIndex + 1) % totalProjects;

    setSelectedIndex(newIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 perspective-1000">
      <div
        ref={carouselRef}
        className="relative w-full max-w-4xl h-80 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
            const radius = 300;

            return (
              <Card
                key={`${project.title} - ${index}`}
                className={`absolute w-64 h-72 flex-shrink-0 transform transition-all duration-500 ease-in-out border-none
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
                  {project.image && (
                    <Image
                      src={project.image}
                      width={500}
                      height={300}
                      className="h-60 w-full overflow-hidden object-cover object-top select-none"
                      priority={true}
                      alt={project.title}
                      onDragStart={(event) => event.preventDefault()}
                    />
                  )}
                  {project.video && (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="pointer-events-none h-60 mx-auto w-full object-cover object-top"
                    />
                  )}
                  <CardHeader className="p-2 flex flex-col h-fit overflow-auto">
                    <CardTitle className="text-lg font-bold">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="sm:hidden flex justify-center gap-4">
        <Button
          onClick={() => handleRotate("left")}
          className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-125 hover:animate-in duration-500 animation"
        >
          ←
        </Button>
        <Button
          onClick={() => handleRotate("right")}
          className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-125 hover:animate-in duration-500 animation"
        >
          →
        </Button>
      </div>
      {projects[selectedIndex].description ? (
        <div className="w-[80%] min-h-72 sm:min-h-44 p-2 text-center flex flex-col gap-3">
          <p className="text-gray-300">{projects[selectedIndex].description}</p>
          <div className="flex flex-wrap gap-2 mx-auto justify-center">
            {projects[selectedIndex].technologies.map((techno, index) => {
              return (
                <Badge
                  key={`${techno} - ${index}`}
                  className="bg-white text-black hover:bg-transparent hover:text-white"
                >
                  {techno}
                </Badge>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-[80%] min-h-20 sm:min-h-16 p-2 text-center flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 mx-auto justify-center">
            {projects[selectedIndex]?.technologies.map((techno, index) => {
              return (
                <Badge
                  key={`${techno} - ${index}`}
                  className="bg-white text-black hover:bg-transparent hover:text-white"
                >
                  {techno}
                </Badge>
              );
            })}
          </div>
        </div>
      )}
      {/* Controls */}
      <div className="hidden sm:flex justify-center gap-4">
        <Button
          onClick={() => handleRotate("left")}
          className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-125 hover:animate-in duration-500 animation"
        >
          ←
        </Button>
        <Button
          onClick={() => handleRotate("right")}
          className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-125 hover:animate-in duration-500 animation"
        >
          →
        </Button>
      </div>
    </div>
  );
}

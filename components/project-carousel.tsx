"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import ProjectProps from "@/interfaces/project-props";

export default function ProjectCarousel({ projects }: ProjectProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem
              key={`${project} - ${index}`}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-white shadow-lg rounded-lg overflow-hidden h-full text-center flex flex-col">
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
                  <CardTitle className="text-lg font-bold text-black text-center">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left text-gray-500 text-sm">
                  {project.description}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 mx-auto justify-center mt-auto">
                  {project.technologies.map((techno, index) => {
                    return (
                      <Badge
                        key={`${techno} - ${index}`}
                        className="bg-black text-white"
                      >
                        {techno}
                      </Badge>
                    );
                  })}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-4">
        <Button
          className={`rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-110 hover:animate-in duration-500 animation`}
          onClick={() => api?.scrollPrev()}
          disabled={!api?.canScrollPrev()}
        >
          {"<"}
        </Button>
        <Button
          className={`rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 hover:scale-110 hover:animate-in duration-500 animation`}
          onClick={() => api?.scrollNext()}
          disabled={!api?.canScrollNext()}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

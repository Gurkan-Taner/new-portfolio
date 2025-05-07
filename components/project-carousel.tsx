"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ProjectProps from "@/interfaces/project-props";
import Link from "next/link";
import { Icons } from "./icons";

const MotionCarouselItem = motion.create(CarouselItem);

const renderIcon = (iconName: string | React.ReactElement) => {
  if (typeof iconName === "string") {
    const iconMap: { [key: string]: React.ReactElement } = {
      github: <Icons.github className="size-3" />,
      linkedin: <Icons.linkedin className="size-3" />,
      x: <Icons.x className="size-3" />,
      email: <Icons.email className="size-3" />,
      website: <Icons.globe className="size-3" />,
    };
    return iconMap[iconName] || null;
  }
  return iconName;
};

export default function ProjectCarousel({ projects }: ProjectProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);
  const [, setCount] = useState(0);
  const [, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("settle", () => {
      setIsAnimating(false);
    });
  }, [api]);

  const handleScroll = (direction: "prev" | "next") => {
    setIsAnimating(true);
    if (direction === "prev") {
      api?.scrollPrev();
    } else {
      api?.scrollNext();
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
    tap: { scale: 0.95 },
  };

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
          <AnimatePresence>
            {projects.map((project, index) => (
              <MotionCarouselItem
                key={`${project.title}-${index}`}
                className="md:basis-1/2 lg:basis-1/3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div className="h-full" layoutId={`card-${index}`}>
                  <Card className="shadow-lg rounded-lg overflow-hidden h-full text-center flex flex-col bg-[rgba(0,0,0,0.2)] backdrop-blur-md border border-white/10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.image && (
                        <Image
                          src={project.image}
                          width={500}
                          height={300}
                          className="h-60 w-full overflow-hidden object-cover object-top select-none transition-transform duration-700 ease-out hover:scale-110"
                          priority={true}
                          alt={project.title}
                          title={project.title}
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
                    </motion.div>
                    <CardHeader className="p-2 flex flex-col h-fit overflow-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <CardTitle className="text-lg font-bold text-center text-white">
                          {project.title}
                        </CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="text-left text-gray-400 text-sm">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {project.description}
                      </motion.div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 mx-auto justify-center mt-auto w-full">
                      <div className="flex flex-wrap gap-2 mx-auto justify-center">
                        {project.technologies.map((techno, techIndex) => (
                          <motion.div
                            key={`${techno}-${techIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + techIndex * 0.1 }}
                          >
                            <Badge className="bg-black text-white hover:scale-110 transition-transform duration-300">
                              {techno}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mx-auto justify-center">
                        {project.links?.map((link, i) => {
                          return (
                            <motion.div
                              key={`${link.href}-${i}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            >
                              <Link
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800 transition-colors duration-300"
                              >
                                {renderIcon(link.icon)}
                                <span className="text-xs font-bold">{link.type}</span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </MotionCarouselItem>
            ))}
          </AnimatePresence>
        </CarouselContent>
      </Carousel>
      <div className="flex gap-4">
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            className="rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50"
            onClick={() => handleScroll("prev")}
            disabled={!api?.canScrollPrev()}
          >
            <ChevronLeft />
          </Button>
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            className="rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50"
            onClick={() => handleScroll("next")}
            disabled={!api?.canScrollNext()}
          >
            <ChevronRight />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}


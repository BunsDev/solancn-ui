"use client";

import { motion } from "motion/react";
import { BorderBeam } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/docs/button/button";
import { BookOpen, Wrench } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const words = ["beautiful", "stunning", "modern", "elegant", "amazing"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {/* Base Grid Background - Very Low Opacity */}
      <div className="absolute inset-0 grid-bg-hero" />

      {/* Light mode: Very subtle top fade, Dark mode: More pronounced */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/1 to-transparent dark:from-black/60 dark:via-black/10 dark:to-transparent" />

      {/* Light mode: Subtle color overlay, Dark mode: Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/5 via-transparent to-purple-50/5 dark:from-blue-950/2 dark:via-transparent dark:to-purple-950/2" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge - smaller on mobile */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-purple-500/30 mb-6 sm:mb-10 backdrop-blur-md shadow-lg shadow-blue-500/10 dark:shadow-purple-500/20"
          >
            <BorderBeam
              size={45}
              duration={3.5}
              colorFrom="#3b82f6"
              colorTo="#8b5cf6"
              className="rounded-full"
            />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-purple-300 tracking-wide">
              ✨ Now with enhanced components
            </span>
          </motion.div>

          {/* Main Heading - better mobile scaling */}
          <motion.h1
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1] mb-4 sm:mb-6"
          >
            <span className="block">
              <span className="mask-l-from-0%">Build</span>{" "}
              <Image
                src="/images/rose.webp"
                alt="Rose decoration"
                width={30}
                height={35}
                className="inline mx-2 align-middle"
                style={{
                  verticalAlign: "middle",
                  width: "70px",
                  height: "70px",
                }}
              />
              <span className="relative inline-block">
                <motion.span
                  key={currentWordIndex}
                  initial={{
                    y: 20,
                    opacity: 0,
                    rotateX: -90,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                    rotateX: 90,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "spring",
                    stiffness: 80,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ transformOrigin: "center center" }}
                >
                  {words[currentWordIndex]}
                </motion.span>

                <span className="invisible bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {words[0]}
                </span>
              </span>
            </span>
            <span className="block">
              websites <span className="mask-r-from-0%">with ease</span>
            </span>
          </motion.h1>

          {/* Subtitle - better mobile spacing */}
          <motion.p
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            className="text-sm sm:text-base md:text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-12 max-w-2xl leading-relaxed px-2 sm:px-0"
          >
            Effortlessly copy and paste stunning, responsive components—no need
            to worry about styling or animations. Build quickly and launch
            faster.
          </motion.p>

          {/* Action Buttons - better mobile layout */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto"
          >
            <Link href="/docs">
              <Button
                size="lg"
                variant="default"
                iconLeft={<BookOpen className="h-5 w-5" />}
                className="w-full sm:w-auto min-w-[180px] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Browse Components
              </Button>
            </Link>

            <Link href="/docs/pattern">
              <Button
                size="lg"
                variant="outline"
                iconLeft={<Wrench className="h-5 w-5" />}
                className="w-full sm:w-auto min-w-[180px] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Visit Tools
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

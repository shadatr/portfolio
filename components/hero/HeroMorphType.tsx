"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFrame } from "./HeroShell";
import MagneticButton from "../ui-kit/MagneticButton";

export default function HeroMorphType() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The whole name shrinks/spreads/blurs as you scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 1],
    ["-0.04em", "0.4em"]
  );
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <HeroFrame>
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-40 pb-24 min-h-screen flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon mb-6 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
          Hi, I&apos;m Shada · software engineer · Istanbul
        </motion.div>

        <motion.h1
          style={{ scale, letterSpacing, filter, y }}
          className="font-display font-bold leading-[0.85] text-text-high origin-left text-[88px] md:text-[200px] xl:text-[260px] will-change-transform"
        >
          <div>I SHIP</div>
          <div className="text-gradient-cyan">SOFTWARE.</div>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-end max-w-5xl"
        >
          <p className="text-md md:text-lg text-text-mid leading-relaxed max-w-2xl">
            <span className="text-cyan-neon">Software engineer</span> who ships
            end-to-end. Three solo apps in production — an AI study companion,
            a gut-health tracker, a Solana watcher — plus a real-time RegTech
            system at Bull Teknoloji by day. I write Rust at 3am, design my own
            screens, and answer my own emails.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="#work">
              View work <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Say hi
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </HeroFrame>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "../ui-kit/MagneticButton";

export function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-ink-base"
    >
      <div className="absolute inset-0 bg-pattern" />
      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function HeroCopy({ side = "left" }: { side?: "left" | "center" }) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        side === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
        Hi, I&apos;m Shada · software engineer · Istanbul
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display font-bold leading-[0.88] tracking-[-0.02em] text-text-high text-[64px] md:text-[128px]"
      >
        I ship
        <br />
        software
        <br />
        <span className="font-editorial italic font-normal text-gradient-warm">
          that ships
        </span>
        <span className="text-cyan-neon">.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-xl text-md md:text-lg text-text-mid leading-relaxed"
      >
        <span className="text-text-high">Software engineer</span> who ships
        end-to-end. Three solo apps in production — an AI study companion, a
        gut-health tracker, a Solana watcher — plus a real-time RegTech system
        at Bull Teknoloji by day. I write Rust at 3am,{" "}
        <span className="text-text-high">design my own screens</span>, and
        answer my own emails.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-wrap gap-3 pt-2"
      >
        <MagneticButton href="#work">
          View work <span aria-hidden>↗</span>
        </MagneticButton>
        <MagneticButton href="#contact" variant="ghost">
          Get in touch
        </MagneticButton>
      </motion.div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import Terminal from "../ui-kit/Terminal";

const LINES: Parameters<typeof Terminal>[0]["lines"] = [
  { type: "cmd", text: "shada@portfolio ~ status" },
  { type: "out", text: "▸ NanoShield        · real-time risk platform · production", color: "cyan" },
  { type: "out", text: "▸ FLARE             · market data platform · production", color: "default" },
  { type: "out", text: "▸ Tummie            · React Native · App Store", color: "violet" },
  { type: "out", text: "▸ Let's Note AI     · Rust + Next.js · live", color: "green" },
  { type: "out", text: "▸ Moonshot Monitor  · Rust · Solana WebSocket", color: "dim" },
  { type: "cmd", text: "shada@portfolio ~ availability" },
  { type: "out", text: "full-time · freelance · remote — open", color: "cyan" },
];

export default function NowRunning() {
  return (
    <section
      id="now"
      className="relative py-36 md:py-56 overflow-hidden border-t border-ink-line/60"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          {/* Left: editorial framing */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
              07 / Now running
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display font-bold text-text-high leading-[0.92] tracking-[-0.02em] text-[40px] md:text-[72px]"
            >
              Running{" "}
              <span className="font-editorial italic font-normal text-cyan-glow">
                now.
              </span>
            </motion.h2>
            <p className="mt-8 text-md text-text-mid max-w-sm leading-[1.8]">
              Five systems in production, as of today.
            </p>
          </div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Terminal
              title="shada@portfolio — zsh"
              lines={LINES}
              speed={16}
              className="relative"
            />
            {/* Pinned label */}
            <div className="absolute -top-4 -right-3 rotate-[2deg] font-mono text-xxsm uppercase tracking-[0.22em] bg-cyan-neon text-ink-base px-2.5 py-1 rounded-md">
              live
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

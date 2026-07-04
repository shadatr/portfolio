"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Globe = dynamic(() => import("../ui-kit/Globe"), { ssr: false });

/* ============================================================================
   LOCATION — an unnumbered breather. One globe, one line. After the story,
   before the path: a quiet screen with almost nothing to read.
   ============================================================================ */

export default function Location() {
  return (
    <section
      aria-label="Location"
      className="relative overflow-hidden border-t border-ink-line/60 py-24 md:py-36"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto aspect-square w-full max-w-[560px]"
        >
          <div className="absolute inset-0 bg-radial-glow" />
          <Globe className="absolute inset-0" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center font-mono text-xxsm uppercase tracking-[0.26em] text-text-dim"
        >
          <span className="text-cyan-neon">41.0082° N · 28.9784° E</span>
          <span className="mx-3">—</span>
          Istanbul · working with teams anywhere
        </motion.p>
      </div>
    </section>
  );
}

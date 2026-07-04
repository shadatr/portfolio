"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-40 md:py-64 overflow-hidden border-t border-ink-line/60"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon mb-10"
        >
          <span className="h-px w-8 bg-cyan-neon/60" />
          03 / The story
        </motion.div>

        {/* Editorial headline — single dramatic sentence */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[88px] max-w-4xl"
        >
          A software engineer{" "}
          <span className="font-editorial italic font-normal text-gradient-warm">
            who designs
          </span>{" "}
          her own work.
        </motion.h2>

        {/* Lead — drop-cap editorial paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start"
        >
          <p className="dropcap text-md md:text-lg text-text-mid leading-[1.85] max-w-xl">
            Every project here went from{" "}
            <span className="text-text-high">first sketch to production</span>{" "}
            through one pair of hands. I don&apos;t have a favorite stack —
            Rust, Go, Python and TypeScript all ship here because{" "}
            <span className="text-text-high">each problem picked its own
            tool</span>. And I design because I like owning the whole path.
          </p>

          {/* Sidebar facts — quiet text rows */}
          <aside className="grid grid-cols-2 lg:grid-cols-1 gap-y-5 gap-x-6 min-w-[200px] lg:border-l lg:border-ink-line/40 lg:pl-6">
            {[
              ["Based", "Istanbul, TR"],
              ["Role", "Software engineer"],
              ["Speaks", "EN · TR · AR"],
              ["Mode", "Hybrid · Remote"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
                  {k}
                </span>
                <span className="text-text-high text-xsm mt-1 font-display font-semibold">
                  {v}
                </span>
              </div>
            ))}
          </aside>
        </motion.div>

        {/* One closing thought — nothing else competes with it */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 md:mt-32 max-w-2xl font-editorial italic text-text-high text-2xl md:text-3xl leading-[1.3]"
        >
          This site is part of the work —{" "}
          <span className="text-cyan-glow">designed and built from scratch.</span>
        </motion.p>
      </div>
    </section>
  );
}

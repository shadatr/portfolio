"use client";

import React from "react";
import { motion } from "framer-motion";
import { useVariants, WORLD_VARIANTS } from "../variants/VariantProvider";

/* ============================================================================
   WORLDS — the closer before contact. Five tiles, one line, zero paragraphs.
   Each tile switches the whole site's world in place — the same power as the
   dock, but impossible to miss. The section that proves the site is alive.
   ============================================================================ */

export default function Worlds() {
  const { world, setWorld } = useVariants();
  const active = WORLD_VARIANTS.find((w) => w.id === world);

  return (
    <section
      aria-label="Worlds"
      className="relative overflow-hidden border-t border-ink-line/60 py-32 md:py-48"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim"
        >
          the theme switcher
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[40px] md:text-[72px] [text-wrap:balance]"
        >
          One portfolio,{" "}
          <span className="font-editorial italic font-normal text-gradient-warm">
            four themes.
          </span>
        </motion.h2>

        {/* The five tiles — pressing one re-skins everything around it */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 md:mt-20 flex flex-wrap items-stretch justify-center gap-3 md:gap-4"
        >
          {WORLD_VARIANTS.map((w, i) => {
            const isActive = w.id === world;
            return (
              <motion.button
                key={w.id}
                onClick={() => setWorld(w.id)}
                aria-pressed={isActive}
                whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 380, damping: 17 }}
                className={`glass flex w-[104px] flex-col items-center gap-3 rounded-2xl px-4 py-6 md:w-[128px] md:py-8 transition-[box-shadow,background-color] duration-500 ${
                  isActive
                    ? "ring-soft bg-[rgb(var(--accent-primary)/0.08)]"
                    : "hover:bg-text-high/[0.04]"
                }`}
              >
                <span
                  className={`text-2xl leading-none md:text-3xl transition-colors duration-500 ${
                    isActive ? "text-[rgb(var(--accent-glow))]" : "text-text-mid"
                  }`}
                >
                  {w.glyph}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                    isActive ? "text-text-high" : "text-text-dim"
                  }`}
                >
                  {w.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 font-mono text-xxsm uppercase tracking-[0.26em] text-text-dim"
        >
          current theme:{" "}
          <span className="text-[rgb(var(--accent-glow))]">{active?.label}</span>
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Pop = {
  id: number;
  x: number;
  y: number;
  label: string;
  rotate: number;
};

const LABELS = ["nice", "ship it", "tiny win", "boop", "again"];
const FLOATERS = ["drag things", "tap around", "play mode", "good chaos"];

export default function FunLayer() {
  const [pops, setPops] = useState<Pop[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let id = 0;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest("a, button, [data-fun-pop], [data-cursor='hover']");
      if (!isInteractive) return;

      const next: Pop = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        label: LABELS[Math.floor(Math.random() * LABELS.length)],
        rotate: Math.random() * 22 - 11,
      };
      setPops((current) => [...current.slice(-7), next]);
      window.setTimeout(() => {
        setPops((current) => current.filter((pop) => pop.id !== next.id));
      }, 920);
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <div className="hidden md:block">
        {FLOATERS.map((label, index) => (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 14, rotate: index % 2 ? 4 : -4 }}
            animate={{ opacity: 1, y: [0, -10, 0], rotate: index % 2 ? [4, 7, 4] : [-4, -8, -4] }}
            transition={{
              opacity: { delay: 1.1 + index * 0.18, duration: 0.5 },
              y: { delay: index * 0.4, duration: 5.5 + index, repeat: Infinity, ease: "easeInOut" },
              rotate: { delay: index * 0.3, duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute rounded-full border border-text-high/10 bg-ink-surface/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-mid shadow-card backdrop-blur-md"
            style={{
              left: `${[6, 82, 12, 74][index]}%`,
              top: `${[32, 26, 72, 78][index]}%`,
            }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {pops.map((pop) => (
          <motion.span
            key={pop.id}
            initial={{ opacity: 0, scale: 0.65, x: pop.x - 24, y: pop.y - 20, rotate: pop.rotate }}
            animate={{ opacity: 1, scale: 1, y: pop.y - 72 }}
            exit={{ opacity: 0, scale: 0.9, y: pop.y - 96 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute rounded-full bg-cyan-neon px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-base shadow-soft"
          >
            {pop.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

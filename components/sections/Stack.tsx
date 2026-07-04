"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

/* ============================================================================
   STACK — the toolbox, scannable in ten seconds.
   Chips are grouped by discipline; the field reacts to the cursor with a
   proximity glow (chips near the pointer lift and brighten). Core tools are
   marked with the accent. Direct DOM writes on pointermove keep it at 60fps.
   ============================================================================ */

// Tools used daily, in production — visually promoted above the rest.
const CORE = new Set([
  "Next.js",
  "React Native",
  "TypeScript",
  "Rust",
  "Go",
  "PostgreSQL",
]);

const RADIUS = 140; // px — how far the cursor's influence reaches

export default function Stack() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<HTMLSpanElement[]>([]);
  const raf = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function onPointerMove(e: React.PointerEvent) {
    if (reduced.current) return;
    const cx = e.clientX;
    const cy = e.clientY;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      for (const chip of chipRefs.current) {
        if (!chip) continue;
        const r = chip.getBoundingClientRect();
        const dx = cx - (r.left + r.width / 2);
        const dy = cy - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const t = Math.max(0, 1 - d / RADIUS); // 1 at cursor, 0 beyond radius
        chip.style.transform = `translateY(${(-4 * t).toFixed(1)}px) scale(${(1 + 0.05 * t).toFixed(3)})`;
        chip.style.borderColor = `rgb(var(--accent-primary) / ${(0.12 + 0.55 * t).toFixed(2)})`;
        chip.style.color =
          t > 0.35 ? "rgb(var(--text-high))" : "rgb(var(--text-mid))";
      }
    });
  }

  function onPointerLeave() {
    for (const chip of chipRefs.current) {
      if (!chip) continue;
      chip.style.transform = "";
      chip.style.borderColor = "";
      chip.style.color = "";
    }
  }

  let chipIndex = -1;

  return (
    <section
      id="stack"
      className="relative overflow-hidden border-t border-ink-line/60 py-36 md:py-56"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
          >
            <span className="h-px w-8 bg-cyan-neon/60" />
            04 / Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[80px] [text-wrap:balance]"
          >
            Tools in{" "}
            <span className="font-editorial italic font-normal text-gradient-warm">
              production.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 max-w-md text-md leading-[1.8] text-text-mid"
          >
            No favorite stack — each problem picks its tool. These are the
            ones I&apos;ve shipped with.
          </motion.p>
        </div>

        {/* The field */}
        <div
          ref={fieldRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="flex flex-col gap-8 md:gap-10"
        >
          {Object.entries(skills).map(([group, items], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.07, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 items-baseline gap-3 border-t border-ink-line/40 pt-6 md:grid-cols-[180px_1fr] md:gap-8"
            >
              <div className="font-mono text-xxsm uppercase tracking-[0.24em] text-text-dim">
                {group}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {items.map((s) => {
                  chipIndex++;
                  const i = chipIndex;
                  const core = CORE.has(s);
                  return (
                    <span
                      key={s}
                      ref={(el) => {
                        if (el) chipRefs.current[i] = el;
                      }}
                      className={`select-none rounded-full border px-3.5 py-1.5 text-[13px] transition-[transform,border-color,color] duration-300 ease-out md:px-4 md:py-2 md:text-sm ${
                        core
                          ? "border-[rgb(var(--accent-primary)/0.4)] bg-[rgb(var(--accent-primary)/0.08)] font-medium text-text-high"
                          : "border-ink-line bg-ink-surface/30 text-text-mid"
                      }`}
                    >
                      {s}
                      {core && (
                        <span className="ml-2 inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-[rgb(var(--accent-glow))]" />
                      )}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 font-mono text-xxsm uppercase tracking-[0.24em] text-text-dim"
        >
          <span className="mr-2 inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-[rgb(var(--accent-glow))]" />
          marked tools run in production today
        </motion.p>
      </div>
    </section>
  );
}

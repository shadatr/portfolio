"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Card = {
  name: string;
  group: "Frontend" | "Backend" | "Data" | "AI" | "Infra";
  // Initial offset (in px) from center, and rotation
  x: number;
  y: number;
  rot: number;
  accent: "cyan" | "violet" | "sky" | "mint" | "pink";
};

const CARDS: Card[] = [
  { name: "TypeScript", group: "Frontend", x: -260, y: -110, rot: -8, accent: "cyan" },
  { name: "Next.js 16", group: "Frontend", x: 180, y: -160, rot: 5, accent: "cyan" },
  { name: "React Native", group: "Frontend", x: -150, y: 120, rot: 4, accent: "cyan" },
  { name: "Rust", group: "Backend", x: 260, y: 40, rot: -6, accent: "sky" },
  { name: "Go", group: "Backend", x: -340, y: -10, rot: 9, accent: "sky" },
  { name: "Axum", group: "Backend", x: 80, y: 180, rot: -3, accent: "sky" },
  { name: "PostgreSQL", group: "Data", x: 320, y: 180, rot: 7, accent: "violet" },
  { name: "ClickHouse", group: "Data", x: -260, y: 240, rot: -10, accent: "violet" },
  { name: "Supabase", group: "Data", x: 0, y: -240, rot: 2, accent: "violet" },
  { name: "Gemini", group: "AI", x: 360, y: -120, rot: -4, accent: "mint" },
  { name: "Solana", group: "AI", x: -50, y: 0, rot: 0, accent: "mint" },
  { name: "Three.js", group: "Infra", x: 200, y: 280, rot: 6, accent: "pink" },
  { name: "Docker", group: "Infra", x: -380, y: 200, rot: 8, accent: "pink" },
];

const ACCENT: Record<Card["accent"], { bg: string; ring: string; dot: string; text: string }> = {
  cyan: {
    bg: "bg-cyan-neon/[0.08]",
    ring: "border-cyan-neon/40 hover:border-cyan-neon",
    dot: "bg-cyan-neon",
    text: "text-cyan-glow",
  },
  violet: {
    bg: "bg-violet-pop/[0.08]",
    ring: "border-violet-pop/40 hover:border-violet-pop",
    dot: "bg-violet-pop",
    text: "text-violet-soft",
  },
  sky: {
    bg: "bg-sky-400/[0.08]",
    ring: "border-sky-400/40 hover:border-sky-400",
    dot: "bg-sky-400",
    text: "text-sky-300",
  },
  mint: {
    bg: "bg-emerald-400/[0.08]",
    ring: "border-emerald-400/40 hover:border-emerald-400",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
  },
  pink: {
    bg: "bg-pink-400/[0.08]",
    ring: "border-pink-400/40 hover:border-pink-400",
    dot: "bg-pink-400",
    text: "text-pink-300",
  },
};

const LEGEND: { label: string; accent: Card["accent"] }[] = [
  { label: "Frontend", accent: "cyan" },
  { label: "Backend", accent: "sky" },
  { label: "Data", accent: "violet" },
  { label: "AI", accent: "mint" },
  { label: "Infra", accent: "pink" },
];

function DragCard({ card, zIndex }: { card: Card; zIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const a = ACCENT[card.accent];

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum
      dragElastic={0.18}
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
      whileHover={{ scale: 1.05, rotate: card.rot + 1 }}
      whileTap={{ scale: 0.97, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0.6, rotate: card.rot }}
      whileInView={{ opacity: 1, scale: 1, rotate: card.rot }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 * zIndex }}
      style={{
        x: card.x,
        y: card.y,
        zIndex,
      }}
      data-cursor="hover"
      className={`group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none touch-none rounded-xl border ${a.ring} ${a.bg} backdrop-blur-md px-5 py-4 min-w-[150px] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.7)] transition-colors`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
          {card.group}
        </span>
      </div>
      <div className={`font-display font-semibold text-md tracking-tight ${a.text}`}>
        {card.name}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-36 md:py-56 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
            >
              <span className="h-px w-8 bg-cyan-neon/60" />
              02 / The toolkit
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[40px] md:text-[72px]"
            >
              Tools I reach for —{" "}
              <span className="font-editorial italic font-normal text-gradient-warm">
                drag them
              </span>
              .
            </motion.h2>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 md:flex-col md:gap-2 md:text-right">
            {LEGEND.map((l) => {
              const a = ACCENT[l.accent];
              return (
                <div
                  key={l.label}
                  className="flex items-center gap-2 font-mono text-xxsm uppercase tracking-[0.22em] text-text-mid"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                  {l.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag arena */}
        <div className="relative h-[600px] md:h-[680px] mt-8 rounded-3xl border border-ink-line/30 overflow-hidden">
          {/* Grid backdrop inside the arena */}
          <div className="absolute inset-0 bg-grid-cyan [background-size:42px_42px] opacity-[0.18]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />

          {/* Corner markers */}
          <span className="crosshair top-4 left-4" />
          <span className="crosshair top-4 right-4" />
          <span className="crosshair bottom-4 left-4" />
          <span className="crosshair bottom-4 right-4" />

          {/* Center indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim z-0 pointer-events-none">
            <div className="opacity-50">— grab &amp; throw —</div>
          </div>

          {CARDS.map((c, i) => (
            <DragCard key={c.name} card={c} zIndex={i + 1} />
          ))}
        </div>

        {/* Caption */}
        <div className="mt-6 flex items-center justify-between font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
          <span>● {CARDS.length} cards · physics enabled</span>
          <span className="text-cyan-neon">click + drag</span>
        </div>
      </div>
    </section>
  );
}

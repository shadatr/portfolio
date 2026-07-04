"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Card = {
  name: string;
  group: "Frontend" | "Backend" | "Data" | "AI" | "Infra";
  x: number;
  y: number;
  rot: number;
};

const CARDS: Card[] = [
  { name: "TypeScript", group: "Frontend", x: -260, y: -110, rot: -8 },
  { name: "Next.js 16", group: "Frontend", x: 180, y: -160, rot: 5 },
  { name: "React Native", group: "Frontend", x: -150, y: 120, rot: 4 },
  { name: "Rust", group: "Backend", x: 260, y: 40, rot: -6 },
  { name: "Go", group: "Backend", x: -340, y: -10, rot: 9 },
  { name: "Axum", group: "Backend", x: 80, y: 180, rot: -3 },
  { name: "PostgreSQL", group: "Data", x: 320, y: 180, rot: 7 },
  { name: "ClickHouse", group: "Data", x: -260, y: 240, rot: -10 },
  { name: "Supabase", group: "Data", x: 0, y: -240, rot: 2 },
  { name: "Gemini", group: "AI", x: 360, y: -120, rot: -4 },
  { name: "Solana", group: "AI", x: -50, y: 0, rot: 0 },
  { name: "Three.js", group: "Infra", x: 200, y: 280, rot: 6 },
  { name: "Docker", group: "Infra", x: -380, y: 200, rot: 8 },
];

const LEGEND: string[] = ["Frontend", "Backend", "Data", "AI", "Infra"];

function DragCard({ card, zIndex }: { card: Card; zIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum
      dragElastic={0.18}
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
      whileHover={{ scale: 1.04, rotate: card.rot + 1 }}
      whileTap={{ scale: 0.97, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0.6, rotate: card.rot }}
      whileInView={{ opacity: 1, scale: 1, rotate: card.rot }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.04 * zIndex }}
      style={{
        x: card.x,
        y: card.y,
        zIndex,
      }}
      data-cursor="hover"
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none touch-none rounded-xl border border-text-high/[0.08] hover:border-cyan-neon/60 bg-ink-surface/60 backdrop-blur-md px-5 py-4 min-w-[150px] shadow-card transition-colors duration-300"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="h-1 w-1 rounded-full bg-cyan-neon/80" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
          {card.group}
        </span>
      </div>
      <div className="font-display font-semibold text-md tracking-tight text-text-high">
        {card.name}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-36 md:py-56 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />

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
            {LEGEND.map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 font-mono text-xxsm uppercase tracking-[0.22em] text-text-mid"
              >
                <span className="h-1 w-1 rounded-full bg-text-mid/60" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Drag arena — double-bezel: outer shell holds the inner core */}
        <div className="relative h-[600px] md:h-[680px] mt-8 rounded-[2rem] p-1.5 bg-text-high/[0.02] ring-1 ring-text-high/[0.06]">
          <div className="relative h-full w-full rounded-[calc(2rem-0.375rem)] overflow-hidden bg-ink-surface/30">
            <div className="absolute inset-0 bg-pattern" />

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

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import Placeholder from "../ui-kit/Placeholder";
import MagneticButton from "../ui-kit/MagneticButton";

/* ============================================================================
   PROJECT SPOTLIGHT — the flagship build gets one cinematic, pinned moment.
   The screen rises and settles as you scroll; three capability chips land
   one by one; then a single CTA. Almost nothing to read — a scene, not a
   paragraph.
   ============================================================================ */

const FLAGSHIP = projects[0]; // Tummie

const CHIPS = [
  "snap a meal → full macros",
  "learns your real triggers",
  "gut forecasts that update daily",
];

export default function ProjectSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const coverScale = useTransform(p, [0, 0.55], [0.86, 1]);
  const coverY = useTransform(p, [0, 0.55], [70, 0]);
  const headOpacity = useTransform(p, [0, 0.18, 0.85, 1], [0, 1, 1, 0]);
  const ctaOpacity = useTransform(p, [0.66, 0.8], [0, 1]);
  const ctaY = useTransform(p, [0.66, 0.8], [14, 0]);

  // Each chip owns a slice of the scroll.
  const chipRanges: [number, number][] = [
    [0.34, 0.44],
    [0.46, 0.56],
    [0.58, 0.68],
  ];

  return (
    <section ref={ref} aria-label="Flagship project" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />

        <motion.div
          style={{ opacity: headOpacity }}
          className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center md:px-10"
        >
          <div className="font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim">
            featured project
          </div>
          <h2 className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[40px] md:text-[72px]">
            <span className="font-editorial italic font-normal text-gradient-warm">
              {FLAGSHIP.name}
            </span>
            .
          </h2>

          {/* The screen */}
          <motion.div
            style={{ scale: coverScale, y: coverY }}
            className="mt-8 w-full max-w-[420px] will-change-transform md:max-w-[460px]"
          >
            <div className="glass-strong overflow-hidden rounded-2xl p-2">
              <Placeholder
                label={FLAGSHIP.name}
                filename={`${FLAGSHIP.slug}/03-adaptive-logging.png`}
                ratio="square"
                accent={FLAGSHIP.accent}
                scanlines={false}
                className="rounded-xl border-0"
              />
            </div>
          </motion.div>

          {/* Capability chips — land one by one */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {CHIPS.map((chip, i) => (
              <Chip key={chip} label={chip} range={chipRanges[i]} progress={p} />
            ))}
          </div>

          <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-10">
            <MagneticButton href={FLAGSHIP.href}>
              Open the case study <span aria-hidden>↗</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Chip({
  label,
  range,
  progress,
}: {
  label: string;
  range: [number, number];
  progress: ReturnType<typeof useSpring>;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [16, 0]);
  const scale = useTransform(progress, range, [0.9, 1]);
  return (
    <motion.span
      style={{ opacity, y, scale }}
      className="rounded-full border border-[rgb(var(--accent-primary)/0.3)] bg-[rgb(var(--accent-primary)/0.08)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--accent-glow))]"
    >
      {label}
    </motion.span>
  );
}

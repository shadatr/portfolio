"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT: Record<Project["accent"], { text: string; bg: string }> = {
  cyan: { text: "text-cyan-neon", bg: "bg-cyan-neon" },
  violet: { text: "text-cyan-glow", bg: "bg-cyan-glow" },
  mint: { text: "text-text-high", bg: "bg-text-high" },
};

export default function ProjectsCoverflow() {
  const [active, setActive] = useState(0);
  const count = projects.length;

  function offset(idx: number) {
    let diff = idx - active;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  }

  return (
    <div className="relative">
      {/* Stage */}
      <div className="relative h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden">
        {projects.map((p, i) => {
          const d = offset(i);
          const isActive = d === 0;
          return (
            <motion.button
              key={p.slug}
              onClick={() => setActive(i)}
              data-cursor="hover"
              animate={{
                x: d * 220,
                z: -Math.abs(d) * 200,
                rotateY: d * -22,
                scale: isActive ? 1 : 0.85,
                opacity: Math.abs(d) > 2 ? 0 : 1 - Math.abs(d) * 0.25,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 22 }}
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                width: "min(540px, 80vw)",
              }}
              className={cn(
                "rounded-2xl border bg-ink-surface/70 backdrop-blur overflow-hidden text-left",
                isActive
                  ? "border-cyan-neon/40 shadow-neon-cyan z-20"
                  : "border-ink-line z-10"
              )}
            >
              <Placeholder
                label={p.name}
                filename={`${p.slug}/hero.png`}
                ratio="video"
                accent={p.accent}
                scanlines={false}
              />
              <div className="p-5">
                <div
                  className={cn(
                    "font-mono text-xxsm uppercase tracking-[0.22em]",
                    ACCENT[p.accent].text
                  )}
                >
                  {p.tagline} · {p.year}
                </div>
                <div className="font-display font-bold text-text-high text-2xl mt-1">
                  {p.name}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active info card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={projects[active].slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6 max-w-3xl mx-auto text-center px-6"
        >
          <p className="text-md text-text-mid leading-relaxed">
            {projects[active].oneLiner}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center mt-4">
            {projects[active].stack.map((s) => (
              <span
                key={s}
                className="font-mono text-xxsm uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-ink-base/60 border border-ink-line text-text-mid"
              >
                {s}
              </span>
            ))}
          </div>
          <Link
            href={projects[active].href}
            data-cursor="hover"
            className={cn(
              "mt-6 inline-flex font-mono text-xsm uppercase tracking-[0.18em] items-center gap-2",
              ACCENT[projects[active].accent].text
            )}
          >
            Read case study <span aria-hidden>↗</span>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setActive(i)}
            aria-label={`Show ${p.name}`}
            data-cursor="hover"
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active
                ? `w-10 ${ACCENT[p.accent].bg}`
                : "w-4 bg-ink-line hover:bg-ink-raised"
            )}
          />
        ))}
      </div>
    </div>
  );
}

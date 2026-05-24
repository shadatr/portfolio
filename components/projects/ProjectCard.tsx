"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/lib/data";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT: Record<
  Project["accent"],
  { glow: string; chip: string; ring: string }
> = {
  cyan: {
    glow: "from-cyan-neon/30 via-transparent to-transparent",
    chip: "text-cyan-neon border-cyan-neon/30",
    ring: "group-hover:border-cyan-neon/60",
  },
  violet: {
    glow: "from-violet-pop/30 via-transparent to-transparent",
    chip: "text-violet-pop border-violet-pop/30",
    ring: "group-hover:border-violet-pop/60",
  },
  mint: {
    glow: "from-emerald-400/30 via-transparent to-transparent",
    chip: "text-emerald-400 border-emerald-400/30",
    ring: "group-hover:border-emerald-400/60",
  },
};

export function TiltCard({
  project,
  size = "default",
  ratio = "video",
}: {
  project: Project;
  size?: "default" | "tall" | "wide";
  ratio?: "video" | "phone" | "square" | "wide";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set(-(py - 0.5) * 14);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const a = ACCENT[project.accent];

  return (
    <Link
      ref={ref}
      href={project.href}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative block rounded-2xl border border-ink-line bg-ink-surface/40 overflow-hidden transition-colors",
        a.ring,
        size === "tall" && "row-span-2",
        size === "wide" && "col-span-2"
      )}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="p-5 md:p-6"
      >
        <div
          className={cn(
            "absolute -inset-1 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
            a.glow
          )}
        />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span
              className={cn(
                "font-mono text-xxsm uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-ink-base/60 border",
                a.chip
              )}
            >
              {project.year}
            </span>
            <span className="font-mono text-xxsm text-text-dim">
              {project.tagline}
            </span>
          </div>

          <div style={{ transform: "translateZ(40px)" }}>
            <Placeholder
              label={project.name}
              filename={`featured/${project.slug}-hero.png`}
              ratio={ratio}
              accent={project.accent}
              scanlines={false}
            />
          </div>

          <div style={{ transform: "translateZ(20px)" }}>
            <h3 className="font-display font-bold text-text-high text-2xl md:text-3xl tracking-tight">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-text-mid leading-relaxed line-clamp-3">
              {project.oneLiner}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xxsm text-text-mid"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span
                className={cn(
                  "font-mono text-xxsm uppercase tracking-[0.18em] flex items-center gap-1.5 transition-transform group-hover:translate-x-1",
                  a.chip.split(" ")[0]
                )}
              >
                Read <span aria-hidden>↗</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

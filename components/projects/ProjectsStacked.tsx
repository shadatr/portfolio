"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, Project } from "@/lib/data";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT: Record<Project["accent"], string> = {
  cyan: "text-cyan-neon",
  violet: "text-violet-pop",
  mint: "text-emerald-400",
};

function StackedCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={cn(
        "sticky top-24 w-full rounded-3xl border border-ink-line bg-ink-surface/70 backdrop-blur overflow-hidden shadow-card",
        index === 0 && "top-24",
        index === 1 && "top-28",
        index === 2 && "top-32"
      )}
    >
      <Link
        href={project.href}
        data-cursor="hover"
        className="group block p-6 md:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.22em]">
              <span className="text-text-dim">0{index + 1} / Project</span>
              <span className="text-text-dim">·</span>
              <span className={ACCENT[project.accent]}>{project.year}</span>
            </div>

            <h3 className="font-display font-bold text-text-high text-4xl md:text-7xl leading-[0.95] tracking-tight">
              {project.name}
              <span className={ACCENT[project.accent]}>.</span>
            </h3>

            <p className="text-md text-text-mid max-w-xl leading-relaxed">
              {project.oneLiner}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xxsm uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-ink-base/60 border border-ink-line text-text-mid"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-3 font-mono text-xsm uppercase tracking-[0.18em] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span className={ACCENT[project.accent]}>Read case study</span>
              <span aria-hidden className={ACCENT[project.accent]}>
                ↗
              </span>
            </div>
          </div>

          <motion.div style={{ y }}>
            <Placeholder
              label={project.name}
              filename={`featured/${project.slug}-hero.png`}
              ratio="video"
              accent={project.accent}
              scanlines={false}
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsStacked() {
  return (
    <div className="relative flex flex-col gap-6 md:gap-10">
      {projects.map((p, i) => (
        <StackedCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

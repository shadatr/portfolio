"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CaseStudy } from "./types";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT = {
  cyan: "text-cyan-neon",
  violet: "text-cyan-glow",
  mint: "text-text-high",
} as const;

export default function HorizontalLayout({ study }: { study: CaseStudy }) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target });
  const chapterCount = study.chapters.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(chapterCount - 1) * 100}vw`]
  );
  const a = ACCENT[study.meta.accent];

  return (
    <div ref={target} className="relative" style={{ height: `${chapterCount * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-6 left-6 md:left-10 z-20 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim flex items-center gap-2">
          <span className={a}>→</span> Scroll · {chapterCount} chapters
        </div>

        <motion.div
          style={{ x, width: `${chapterCount * 100}vw` }}
          className="h-screen flex"
        >
          {study.chapters.map((ch) => (
            <div
              key={ch.number}
              className="h-screen w-screen flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 md:px-16 py-24"
            >
              <div className="flex flex-col gap-5 max-w-xl">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-xxsm uppercase tracking-[0.22em] px-2 py-1 rounded-full bg-ink-base/60 border border-ink-line",
                      a
                    )}
                  >
                    Chapter {ch.number}
                  </span>
                  <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
                    {ch.kicker}
                  </span>
                </div>
                <h3 className="font-display font-bold text-text-high text-4xl md:text-6xl leading-[0.95] tracking-tight">
                  {ch.title}
                </h3>
                <p className="text-md md:text-lg text-text-mid leading-relaxed">
                  {ch.body}
                </p>
                {ch.bullets && (
                  <ul className="space-y-2 text-text-mid">
                    {ch.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className={cn(
                            "mt-2 h-1 w-1 rounded-full flex-shrink-0",
                            a.replace("text-", "bg-")
                          )}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Placeholder fit="contain"
                label={ch.placeholder.label}
                filename={ch.placeholder.filename}
                ratio={ch.placeholder.ratio || "video"}
                accent={study.meta.accent}
              />
            </div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {study.chapters.map((_, i) => {
            const start = i / chapterCount;
            const end = (i + 1) / chapterCount;
            return (
              <ChapterDot
                key={i}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
                accent={a}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChapterDot({
  scrollYProgress,
  start,
  end,
  accent,
}: {
  scrollYProgress: any;
  start: number;
  end: number;
  accent: string;
}) {
  const w = useTransform(scrollYProgress, [start, end], ["8px", "40px"]);
  const bg = useTransform(
    scrollYProgress,
    [start - 0.001, start, end, end + 0.001],
    ["#1F2A44", accent.includes("cyan") ? "#22D3EE" : accent.includes("violet") ? "#A855F7" : "#34D399", accent.includes("cyan") ? "#22D3EE" : accent.includes("violet") ? "#A855F7" : "#34D399", "#1F2A44"]
  );
  return (
    <motion.div
      style={{ width: w, backgroundColor: bg }}
      className="h-1.5 rounded-full"
    />
  );
}

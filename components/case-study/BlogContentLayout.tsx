"use client";

import React from "react";
import { motion } from "framer-motion";
import { CaseStudy } from "./types";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT = {
  cyan: { text: "text-cyan-neon", bg: "bg-cyan-neon", border: "border-cyan-neon/30" },
  violet: { text: "text-violet-pop", bg: "bg-violet-pop", border: "border-violet-pop/30" },
  mint: { text: "text-emerald-400", bg: "bg-emerald-400", border: "border-emerald-400/30" },
} as const;

// Pluck a representative quote-y line from the body
function pullQuote(body: string): string {
  const sentences = body.split(/(?<=[.!?])\s+/);
  // Prefer a medium-length sentence (40–140 chars)
  const candidates = sentences.filter((s) => s.length >= 40 && s.length <= 160);
  return (candidates[0] || sentences[0] || body).trim();
}

export default function BlogContentLayout({ study }: { study: CaseStudy }) {
  const a = ACCENT[study.meta.accent];
  const readingTime = Math.max(
    3,
    Math.round(
      study.chapters.reduce((acc, c) => acc + c.body.split(" ").length, 0) / 200
    )
  );

  return (
    <article className="relative">
      {/* Reading meta — sticky on the side */}
      <div className="relative mx-auto max-w-5xl px-6 md:px-10 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-4 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim border-y border-ink-line/60 py-3"
        >
          <span className={a.text}>● {readingTime} min read</span>
          <span className="text-text-mid">·</span>
          <span>{study.meta.year}</span>
          <span className="text-text-mid">·</span>
          <span>by Shada Daab</span>
          <span className="text-text-mid">·</span>
          <span className="hidden md:inline">{study.chapters.length} chapters</span>
        </motion.div>
      </div>

      {/* Body — narrow editorial column */}
      <div className="relative mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        {study.chapters.map((ch, idx) => (
          <Chapter
            key={ch.number}
            chapter={ch}
            index={idx}
            accent={study.meta.accent}
            isFirst={idx === 0}
          />
        ))}

        {/* Closing flourish */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-12 border-t border-ink-line flex flex-col items-center gap-3 text-center"
        >
          <div className={cn("font-editorial italic text-text-mid text-lg", a.text)}>
            — fin —
          </div>
          <p className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim max-w-sm">
            built by one person · case study written by the same person
          </p>
        </motion.div>
      </div>
    </article>
  );
}

function Chapter({
  chapter,
  index,
  accent,
  isFirst,
}: {
  chapter: CaseStudy["chapters"][number];
  index: number;
  accent: keyof typeof ACCENT;
  isFirst: boolean;
}) {
  const a = ACCENT[accent];
  const wantPullQuote = index === 1 || index === 3;
  const wantWideImage = index === 0 || index === 2;
  const quote = pullQuote(chapter.body);

  return (
    <section className="mb-20 md:mb-28">
      {/* Kicker + number */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <span
          className={cn(
            "font-mono text-xxsm uppercase tracking-[0.28em] px-2.5 py-1 rounded-full bg-ink-base/60 border",
            a.text,
            a.border
          )}
        >
          Ch. {chapter.number}
        </span>
        <span className="h-px flex-1 bg-ink-line" />
        <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
          {chapter.kicker}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display font-bold text-text-high text-3xl md:text-5xl leading-[1.05] tracking-[-0.015em] mb-8"
      >
        {chapter.title}
      </motion.h2>

      {/* Body — drop-cap on the very first chapter */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(
          "text-md md:text-lg text-text-mid leading-[1.75]",
          isFirst && "dropcap"
        )}
      >
        <p>{chapter.body}</p>
      </motion.div>

      {/* Pull-quote on alternate chapters */}
      {wantPullQuote && (
        <motion.figure
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="my-10 relative pl-6 md:pl-8"
        >
          <span
            aria-hidden
            className={cn("absolute left-0 top-0 bottom-0 w-[3px] rounded-full", a.bg)}
          />
          <blockquote className="font-editorial italic text-text-high text-2xl md:text-3xl leading-[1.25] tracking-tight">
            “{quote}”
          </blockquote>
        </motion.figure>
      )}

      {/* Bullets — quiet, indented */}
      {chapter.bullets && chapter.bullets.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 space-y-3 text-text-mid leading-relaxed border-l border-ink-line pl-5"
        >
          {chapter.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-md">
              <span
                className={cn(
                  "mt-2.5 h-1 w-1 rounded-full flex-shrink-0",
                  a.bg
                )}
              />
              <span>{b}</span>
            </li>
          ))}
        </motion.ul>
      )}

      {/* Image — either breakout wide or inline */}
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={cn(
          "mt-12",
          wantWideImage && "md:-mx-24 lg:-mx-32"
        )}
      >
        <Placeholder
          label={chapter.placeholder.label}
          filename={chapter.placeholder.filename}
          ratio={chapter.placeholder.ratio || "video"}
          accent={accent}
        />
        <figcaption className="mt-3 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim flex items-center gap-2">
          <span className={a.text}>Fig {index + 1}</span>
          <span className="h-px w-6 bg-ink-line" />
          <span>{chapter.placeholder.label}</span>
        </figcaption>
      </motion.figure>
    </section>
  );
}

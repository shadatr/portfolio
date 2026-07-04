"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaseStudy } from "./types";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT = {
  cyan: { text: "text-cyan-neon", border: "border-text-high/15" },
  violet: { text: "text-cyan-glow", border: "border-text-high/15" },
  mint: { text: "text-text-high", border: "border-text-high/15" },
} as const;

export default function CaseStudyHeader({ study }: { study: CaseStudy }) {
  const a = ACCENT[study.meta.accent];

  return (
    <header className="relative pt-28 md:pt-40 pb-12 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.16),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Link
          href="/"
          data-cursor="hover"
          className="inline-flex items-center gap-2 font-mono text-xxsm uppercase tracking-[0.22em] text-text-mid hover:text-cyan-neon transition-colors"
        >
          <span aria-hidden>←</span> Back to portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "mt-6 inline-flex items-center gap-2 font-mono text-xxsm uppercase tracking-[0.28em] border rounded-full px-3 py-1.5",
            a.text,
            a.border
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", a.text.replace("text-", "bg-"))} />
          {study.meta.eyebrow} · {study.meta.year}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 font-display font-bold text-text-high text-[56px] md:text-[120px] leading-[0.92] tracking-tight"
        >
          {study.meta.name}
          <span className={a.text}>.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-md md:text-lg text-text-mid max-w-3xl"
        >
          {study.meta.tagline}
        </motion.p>

        {study.meta.links && study.meta.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {study.meta.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent-primary)/0.12)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--accent-glow))] ring-1 ring-[rgb(var(--accent-primary)/0.35)] transition-colors hover:bg-[rgb(var(--accent-primary)/0.2)]"
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </motion.div>
        )}

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Fact label="Role" value={study.meta.role} />
          <Fact
            label={study.meta.eyebrow === "Experience" ? "Period" : "Year"}
            value={study.meta.period || study.meta.year}
          />
          {study.meta.location && <Fact label="Location" value={study.meta.location} />}
          <Fact
            label="Stack"
            value={study.meta.stack.slice(0, 3).join(" · ")}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10"
        >
          <Placeholder fit="contain"
            label={study.hero.label}
            filename={study.hero.filename}
            ratio="wide"
            accent={study.meta.accent}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-lg md:text-xl text-text-high max-w-3xl leading-relaxed"
        >
          {study.summary}
        </motion.p>
      </div>
    </header>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink-line bg-ink-surface/40 p-4">
      <div className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
        {label}
      </div>
      <div className="font-display font-semibold text-text-high mt-1 text-sm md:text-md">
        {value}
      </div>
    </div>
  );
}

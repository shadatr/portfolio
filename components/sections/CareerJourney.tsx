"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Milestone = {
  year: string;
  yearLabel: string;
  title: string;
  body: string;
  tag: string;
  accent: "cyan" | "violet" | "sky" | "mint";
  href?: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2022",
    yearLabel: "Year 01",
    title: "Started Software Engineering",
    body: "Enrolled as a Software Engineering major. Day one I figured the syllabus alone wouldn't get me to where I wanted — so I started building on the side from day two.",
    tag: "University · Year 1",
    accent: "cyan",
  },
  {
    year: "→ 2023",
    yearLabel: "Year 02",
    title: "Took the extra mile, self-taught the rest",
    body: "Read what the curriculum didn't cover — TypeScript, Next.js, real backends, deployments, design. Built small apps end-to-end every semester to make the lessons stick.",
    tag: "Self-taught · side projects",
    accent: "sky",
  },
  {
    year: "2024",
    yearLabel: "Year 03",
    title: "First internship — OKTAN Sağlık ARGE",
    body: "Three months as an AI Engineer Intern in a health R&D company. First time deploying models against real-world data, working alongside senior engineers, learning what production actually means.",
    tag: "AI Engineer · Internship",
    accent: "violet",
    href: "/experience/oktan",
  },
  {
    year: "Dec 2024 →",
    yearLabel: "Now",
    title: "Software Engineer at Bull Teknoloji",
    body: "Shipping NanoShield (real-time RegTech around an FPGA core, I lead it) and FLARE (low-latency trading platform — I rebuilt the data path from Next.js to Go after the Node event loop got buried).",
    tag: "Full-time · Current",
    accent: "mint",
    href: "/experience/bull",
  },
];

const ACCENT: Record<Milestone["accent"], { num: string; tag: string; rule: string; dot: string }> = {
  cyan: {
    num: "text-cyan-neon",
    tag: "text-cyan-neon",
    rule: "bg-cyan-neon/40 group-hover:bg-cyan-neon",
    dot: "bg-cyan-neon",
  },
  sky: {
    num: "text-sky-300",
    tag: "text-sky-300",
    rule: "bg-sky-400/40 group-hover:bg-sky-400",
    dot: "bg-sky-400",
  },
  violet: {
    num: "text-violet-soft",
    tag: "text-violet-soft",
    rule: "bg-violet-pop/40 group-hover:bg-violet-pop",
    dot: "bg-violet-pop",
  },
  mint: {
    num: "text-emerald-300",
    tag: "text-emerald-300",
    rule: "bg-emerald-400/40 group-hover:bg-emerald-400",
    dot: "bg-emerald-400",
  },
};

export default function CareerJourney() {
  return (
    <section
      id="experience"
      className="relative py-36 md:py-56 overflow-hidden border-t border-ink-line/40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(34,211,238,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
            >
              <span className="h-px w-8 bg-cyan-neon/60" />
              04 / The path
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[80px]"
            >
              From{" "}
              <span className="font-editorial italic font-normal text-gradient-warm">
                day one
              </span>{" "}
              to now.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim md:text-right max-w-xs"
          >
            ↳ four years · four milestones · still compounding
          </motion.p>
        </div>

        {/* Milestone rows — no card walls, just a left rule + typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-14 md:gap-y-20">
          {MILESTONES.map((m, i) => {
            const a = ACCENT[m.accent];
            const Body = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative pl-6 md:pl-8"
              >
                {/* Left accent rule */}
                <span
                  className={`absolute left-0 top-1 bottom-1 w-px transition-colors ${a.rule}`}
                  aria-hidden
                />

                {/* Step + Year-label */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                    <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
                      0{i + 1} / {m.yearLabel}
                    </span>
                  </div>
                  {m.href && (
                    <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-mid group-hover:text-cyan-neon group-hover:translate-x-1 transition-all">
                      case study ↗
                    </span>
                  )}
                </div>

                {/* Year — restrained, not huge */}
                <div
                  className={`mt-4 font-display font-semibold leading-none tracking-[-0.02em] text-3xl md:text-5xl ${a.num}`}
                >
                  {m.year}
                </div>

                {/* Title */}
                <h3 className="mt-3 font-display font-semibold text-text-high text-lg md:text-2xl leading-snug tracking-tight">
                  {m.title}
                </h3>

                {/* Body */}
                <p className="mt-3 text-text-mid leading-relaxed text-sm md:text-md max-w-md">
                  {m.body}
                </p>

                {/* Tag — just text, no chip */}
                <div
                  className={`mt-4 font-mono text-xxsm uppercase tracking-[0.22em] ${a.tag}`}
                >
                  {m.tag}
                </div>
              </motion.div>
            );

            return m.href ? (
              <Link
                key={m.year}
                href={m.href}
                data-cursor="hover"
                className="block"
              >
                {Body}
              </Link>
            ) : (
              <div key={m.year}>{Body}</div>
            );
          })}
        </div>

        {/* Connector trail at the bottom */}
        <div className="mt-12 md:mt-16 flex items-center gap-4 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
          <span className="text-text-high">↳ next</span>
          <span className="flex-1 h-px bg-gradient-to-r from-cyan-neon/50 via-violet-pop/40 to-transparent" />
          <span className="text-cyan-neon">whatever&apos;s on the wire next year</span>
        </div>
      </div>
    </section>
  );
}

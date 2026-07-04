"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  body: string;
  href?: string;
};

// One column, four beats. Each milestone is a year, a title, and one or two
// sentences — nothing else competes for attention. The "present tense" lives
// in the NowRunning section that follows.
const MILESTONES: Milestone[] = [
  {
    year: "2022",
    title: "Started Software Engineering",
    body: "Enrolled in Software Engineering and started building side projects in the first semester.",
  },
  {
    year: "2023",
    title: "Went beyond the curriculum",
    body: "TypeScript, Next.js, backends, deployment, design — learned by shipping small end-to-end apps every semester.",
  },
  {
    year: "2024",
    title: "AI Engineer Intern — OKTAN Sağlık ARGE",
    body: "Three months deploying AI models against real-world data at a health R&D company.",
    href: "/experience/oktan",
  },
  {
    year: "Now",
    title: "Software Engineer at Bull Teknoloji",
    body: "Leading NanoShield end-to-end and building across FLARE — real-time trading infrastructure in production.",
    href: "/experience/bull",
  },
];

export default function CareerJourney() {
  return (
    <section
      id="experience"
      className="relative py-36 md:py-56 overflow-hidden border-t border-ink-line/60"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
          >
            <span className="h-px w-8 bg-cyan-neon/60" />
            06 / The path
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[80px] [text-wrap:balance]"
          >
            How I got{" "}
            <span className="font-editorial italic font-normal text-gradient-warm">
              here.
            </span>
          </motion.h2>
        </div>

        {/* Timeline — single column, generous air between beats */}
        <div className="max-w-3xl space-y-20 md:space-y-28">
          {MILESTONES.map((m, i) => {
            const Body = (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                className="group relative pl-6 md:pl-8"
              >
                <span
                  className="absolute left-0 top-1 bottom-1 w-px bg-text-dim/40 group-hover:bg-cyan-neon transition-colors duration-500"
                  aria-hidden
                />

                <div className="font-display font-semibold leading-none tracking-[-0.02em] text-3xl md:text-5xl text-cyan-glow">
                  {m.year}
                </div>

                <h3 className="mt-4 font-display font-semibold text-text-high text-lg md:text-2xl leading-snug tracking-tight">
                  {m.title}
                </h3>

                <p className="mt-4 text-text-mid leading-[1.8] text-sm md:text-md max-w-md">
                  {m.body}
                </p>

                {m.href && (
                  <div className="mt-5 font-mono text-xxsm uppercase tracking-[0.22em] text-text-mid group-hover:text-cyan-neon group-hover:translate-x-1 transition-all duration-500 w-fit">
                    case study ↗
                  </div>
                )}
              </motion.div>
            );

            return m.href ? (
              <Link key={m.year} href={m.href} data-cursor="hover" className="block">
                {Body}
              </Link>
            ) : (
              <div key={m.year}>{Body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

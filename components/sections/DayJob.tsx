"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";

/* ============================================================================
   DAY JOB — the professional work gets a stage, not just a timeline entry.
   Two platforms, each with a living visual: NanoShield's radar sweep and
   FLARE's market-data bars. One line each; the case study holds the rest.
   ============================================================================ */

const bull = experience[0];
const oktan = experience[1];

// NanoShield is the flagship — it leads the section at feature size.
const PLATFORMS = [
  {
    name: "NanoShield",
    tag: "real-time risk · RegTech",
    badge: "led end-to-end",
    line: "Real-time risk enforcement on live financial instruments, built around an FPGA core — led end-to-end.",
    stack: ["Next.js 16", "Go", "PostgreSQL", "gRPC"],
    shot: "/experience/shield/hero.png",
    alt: "NanoShield real-time alerts dashboard",
    featured: true,
  },
  {
    name: "FLARE",
    tag: "low-latency trading data",
    badge: null,
    line: "Orderbook, time-and-sales and candles for trading-floor screens — I rebuilt the hot path in Go.",
    stack: ["Go", "ClickHouse", "WebSockets"],
    shot: "/experience/flare/charts.png",
    alt: "FLARE candlestick chart with live orderbook",
    featured: false,
  },
];

export default function DayJob() {
  return (
    <section
      id="day-job"
      className="relative overflow-hidden border-t border-ink-line/60 py-36 md:py-56"
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
            05 / Bull Teknoloji
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[80px] [text-wrap:balance]"
          >
            NanoShield{" "}
            <span className="font-editorial italic font-normal text-gradient-warm">
              &amp; FLARE.
            </span>
          </motion.h2>
        </div>

        {/* The two platforms — NanoShield leads at feature size */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          {PLATFORMS.map((pf, i) => (
            <motion.div
              key={pf.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.32, 0.72, 0, 1] }}
              className={pf.featured ? "md:col-span-3" : "md:col-span-2"}
            >
              <Link
                href={bull.href}
                data-cursor="hover"
                className="group relative block h-full overflow-hidden rounded-2xl border border-ink-line bg-ink-surface/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[rgb(var(--accent-primary)/0.35)] hover:shadow-lift"
              >
                {/* Real product shot */}
                <div
                  className={`relative overflow-hidden border-b border-ink-line/60 bg-ink-base/40 ${
                    pf.featured ? "h-56 md:h-72" : "h-56 md:h-60"
                  }`}
                >
                  <Image
                    src={pf.shot}
                    alt={pf.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    className="object-cover object-left-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-base/80 to-transparent" />
                  <span className="absolute left-5 top-4 font-mono text-xxsm uppercase tracking-[0.24em] text-text-mid">
                    {pf.tag}
                  </span>
                  {pf.badge && (
                    <span className="absolute right-4 top-3.5 rounded-full bg-[rgb(var(--accent-primary)/0.16)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--accent-glow))] ring-1 ring-[rgb(var(--accent-primary)/0.35)]">
                      {pf.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4 p-6 md:p-7">
                  <h3
                    className={`font-display font-bold tracking-tight text-text-high ${
                      pf.featured ? "text-2xl md:text-4xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {pf.name}
                  </h3>
                  <p className="max-w-md text-sm leading-[1.75] text-text-mid">
                    {pf.line}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {pf.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-ink-line/80 bg-ink-base/40 px-2.5 py-1 font-mono text-xxsm text-text-mid"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xxsm uppercase tracking-[0.2em] text-text-mid transition-all duration-500 group-hover:translate-x-1 group-hover:text-cyan-neon">
                      case study ↗
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Where it started — one quiet line */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href={oktan.href}
            data-cursor="hover"
            className="group flex flex-wrap items-baseline justify-between gap-3 rounded-xl border border-ink-line/60 bg-ink-surface/20 px-6 py-4 transition-colors duration-500 hover:border-[rgb(var(--accent-primary)/0.3)]"
          >
            <span className="text-sm text-text-mid">
              Before that —{" "}
              <span className="text-text-high">AI Engineer Intern</span> ·{" "}
              {oktan.company}
            </span>
            <span className="font-mono text-xxsm uppercase tracking-[0.2em] text-text-dim transition-colors duration-500 group-hover:text-cyan-neon">
              case study ↗
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import Terminal from "../ui-kit/Terminal";

const LINES: Parameters<typeof Terminal>[0]["lines"] = [
  { type: "cmd", text: "shada@portfolio ~ status --now" },
  { type: "out", text: "▸ Let's Note AI         · pdf → flashcards → podcast", color: "cyan" },
  { type: "out", text: "▸ Tummie                · React Native · gut-health AI", color: "violet" },
  { type: "out", text: "▸ Moonshot Monitor      · Rust WS watcher (Solana)", color: "green" },
  { type: "out", text: "▸ Bull Teknoloji        · NanoShield + FLARE (day job)", color: "default" },
  { type: "cmd", text: "shada@portfolio ~ uptime" },
  { type: "out", text: "shipping for 4y · 5 production systems · 19 GB OOM solved", color: "dim" },
  { type: "cmd", text: "shada@portfolio ~ availability" },
  { type: "out", text: "✓ FT · PT · freelance · remote-friendly", color: "cyan" },
];

const MICRO_LOG = [
  { time: "now", msg: "live", color: "text-cyan-neon" },
  { time: "+0s", msg: "uptime 99.97%", color: "text-emerald-400" },
  { time: "+3s", msg: "build #482 passing", color: "text-text-mid" },
  { time: "+8s", msg: "deploying flare-go", color: "text-violet-pop" },
  { time: "+12s", msg: "404 on /xn--", color: "text-rose-400" },
  { time: "+22s", msg: "request /api/health ok", color: "text-text-mid" },
  { time: "+27s", msg: "websocket reconnect 0", color: "text-text-mid" },
];

export default function NowRunning() {
  return (
    <section
      id="now"
      className="relative py-36 md:py-56 overflow-hidden border-t border-ink-line/40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.07),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          {/* Left: editorial framing */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
              03 / Now running
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display font-bold text-text-high leading-[0.92] tracking-[-0.02em] text-[40px] md:text-[72px]"
            >
              What&apos;s{" "}
              <span className="font-editorial italic font-normal text-cyan-glow">
                on the wire
              </span>{" "}
              today.
            </motion.h2>
            <p className="mt-6 text-md text-text-mid max-w-md leading-relaxed">
              A quick read of what I&apos;m shipping right now — three solo
              apps in production, a real-time RegTech system at the day job,
              and the side experiments ticking along in the background.
            </p>

            {/* Micro activity log — feels alive */}
            <ul className="mt-8 space-y-2 font-mono text-xxsm">
              {MICRO_LOG.map((row, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="flex gap-4 items-center border-l border-ink-line pl-3"
                >
                  <span className="text-text-dim w-12 tabular-nums">{row.time}</span>
                  <span className={row.color}>{row.msg}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_60%)] pointer-events-none" />
            <Terminal
              title="shada@portfolio — zsh"
              lines={LINES}
              speed={16}
              className="relative"
            />
            {/* Pinned label */}
            <div className="absolute -top-4 -right-3 rotate-[3deg] font-mono text-xxsm uppercase tracking-[0.22em] bg-cyan-neon text-ink-base px-2 py-1 rounded-md shadow-neon-cyan">
              live
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

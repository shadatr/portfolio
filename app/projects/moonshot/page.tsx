"use client";

import React from "react";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import Terminal from "@/components/ui-kit/Terminal";
import { moonshotStudy } from "@/lib/case-studies";

export default function Page() {
  return (
    <>
      <CaseStudyView study={moonshotStudy} />
      <section className="relative py-24 md:py-32 border-t border-ink-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-6 md:px-10">
          <div className="font-mono text-xxsm uppercase tracking-[0.22em] text-emerald-400 mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-emerald-400/60" /> Live · in production
          </div>
          <h3 className="font-display font-bold text-text-high text-3xl md:text-5xl tracking-tight mb-8">
            What it actually looks like.
          </h3>
          <Terminal
            title="moonshot-monitor"
            lines={[
              { type: "cmd", text: "cargo run --release" },
              { type: "out", text: "  Finished release [optimized] target(s) in 0.31s", color: "dim" },
              { type: "out", text: "   Running `target/release/moonshot-monitor`", color: "dim" },
              { type: "out", text: "[info] subscribing to MoonCVVNZFSYkqNXP6bxHLPL6QQJiMagDL3qcqUQTrG", color: "cyan" },
              { type: "out", text: "[info] websocket connected · commitment=processed", color: "cyan" },
              { type: "out", text: "[event] CreateEvent  mint=BkvxX...9p2 sender=7nKq...vQ", color: "violet" },
              { type: "out", text: "[fetch] metadata uri=https://... name=DOGE2 ticker=DOGE2", color: "default" },
              { type: "out", text: "[fetch] prior_mints=4 (sender has shipped 4 tokens before)", color: "default" },
              { type: "out", text: "[discord] ✓ posted to #moonshot · latency 1.8s", color: "green" },
              { type: "out", text: "[event] CreateEvent  mint=2cKsW...XfY sender=Fr8L...bb", color: "violet" },
              { type: "out", text: "[fetch] metadata uri=https://... name=PEPE-XL ticker=PEPEXL", color: "default" },
              { type: "out", text: "[discord] ✓ posted to #moonshot · latency 2.1s", color: "green" },
              { type: "cmd", text: "" },
            ]}
          />
        </div>
      </section>
    </>
  );
}

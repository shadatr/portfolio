"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Globe = dynamic(() => import("../ui-kit/Globe"), { ssr: false });

export default function About() {
  return (
    <section id="about" className="relative py-40 md:py-64 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon mb-10"
        >
          <span className="h-px w-8 bg-cyan-neon/60" />
          01 / The story
        </motion.div>

        {/* Editorial headline — single dramatic sentence */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[88px] max-w-4xl"
        >
          A software engineer{" "}
          <span className="font-editorial italic font-normal text-gradient-warm">
            who designs
          </span>{" "}
          her own work.
        </motion.h2>

        {/* Lead — drop-cap editorial paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start"
        >
          <p className="dropcap text-md md:text-lg text-text-mid leading-[1.7] max-w-2xl">
            I&apos;m a software engineer who builds end-to-end. Three solo apps
            in production — an{" "}
            <span className="text-cyan-neon">AI study companion</span>, a
            gut-health tracker that actually learns your triggers, and a Rust
            binary that watches Solana drop tokens at 3am. By day I lead a
            real-time risk system at Bull Teknoloji, where I rebuilt the FLARE
            data path from Node to Go after the event loop got buried by
            high-frequency feeds.
          </p>

          {/* Sidebar facts — quiet text rows */}
          <aside className="grid grid-cols-2 lg:grid-cols-1 gap-y-5 gap-x-6 min-w-[200px] lg:border-l lg:border-ink-line/40 lg:pl-6">
            {[
              ["Based", "Istanbul, TR"],
              ["Role", "Software engineer"],
              ["Speaks", "EN · TR · AR"],
              ["Mode", "Hybrid · Remote"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
                  {k}
                </span>
                <span className="text-text-high text-xsm mt-1 font-display font-semibold">
                  {v}
                </span>
              </div>
            ))}
          </aside>
        </motion.div>

        {/* Pull quote — editorial magazine style */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="my-24 md:my-32 max-w-4xl relative"
        >
          <span
            aria-hidden
            className="absolute -top-12 -left-6 font-editorial italic text-cyan-neon/30 text-[180px] leading-none select-none"
          >
            “
          </span>
          <blockquote className="relative font-editorial italic text-text-high text-3xl md:text-5xl leading-[1.15] tracking-tight">
            There&apos;s no separate designer behind any project on this site.
            The portfolio you&apos;re reading is{" "}
            <span className="text-cyan-glow">part of the portfolio.</span>
          </blockquote>
        </motion.figure>

        {/* Two-column continuation + globe */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-md md:text-lg text-text-mid leading-[1.7]"
          >
            <p>
              Lately that means{" "}
              <span className="text-text-high">AI-powered products</span>: an
              educational platform that turns lectures into flashcards and
              quizzes, a mobile companion that learns gut-health triggers, a
              Rust service that tracks new Solana tokens in real time.
            </p>
            <p>
              I work across the full stack — frontend, backend, real-time data,
              mobile, and the bits in between. When the type and the layout
              matter, I do those too.
            </p>
            <div className="pt-2 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim flex flex-wrap gap-x-6 gap-y-2">
              <span>↳ Shipping</span>
              <span className="text-cyan-neon">Let&apos;s Note AI</span>
              <span>·</span>
              <span className="text-cyan-neon">Tummie</span>
              <span>·</span>
              <span className="text-cyan-neon">Moonshot</span>
              <span>·</span>
              <span className="text-cyan-neon">NanoShield</span>
              <span>·</span>
              <span className="text-cyan-neon">FLARE</span>
            </div>
          </motion.div>

          {/* Interactive globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative aspect-square w-full max-w-[480px] mx-auto"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_60%)]" />
            <Globe className="absolute inset-0" />
            <div className="absolute bottom-3 left-3 font-mono text-xxsm text-text-mid flex flex-col gap-1">
              <span className="text-cyan-neon">● 41.0082° N, 28.9784° E</span>
              <span className="text-text-dim normal-case tracking-normal">
                Istanbul — and wherever the work is
              </span>
            </div>
            <div className="absolute top-3 right-3 font-mono text-xxsm uppercase tracking-[0.22em] text-cyan-neon">
              live · {new Date().getUTCFullYear()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

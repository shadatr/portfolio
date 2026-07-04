"use client";

import React from "react";
import { motion } from "framer-motion";
import { CaseStudy } from "./types";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT = {
  cyan: "text-cyan-neon",
  violet: "text-cyan-glow",
  mint: "text-text-high",
} as const;

export default function StickyLayout({ study }: { study: CaseStudy }) {
  const a = ACCENT[study.meta.accent];
  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12">
        {/* Sticky left visual */}
        <div className="relative">
          <div className="lg:sticky lg:top-32">
            <Placeholder fit="contain"
              label={`${study.meta.name} — context`}
              filename={`${study.slug}/context.png`}
              ratio="portrait"
              accent={study.meta.accent}
            />
            <div className="mt-4 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
              Sticky · scrollytelling
            </div>
          </div>
        </div>

        {/* Scrolling right content */}
        <div className="flex flex-col gap-24">
          {study.chapters.map((ch, idx) => (
            <motion.div
              key={ch.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
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
              <h3 className="font-display font-bold text-text-high text-3xl md:text-5xl leading-tight tracking-tight">
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
              <Placeholder fit="contain"
                label={ch.placeholder.label}
                filename={ch.placeholder.filename}
                ratio={ch.placeholder.ratio || "video"}
                accent={study.meta.accent}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

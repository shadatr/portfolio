"use client";

import React from "react";
import { motion } from "framer-motion";
import { CaseStudy } from "./types";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

const ACCENT = {
  cyan: "text-cyan-neon",
  violet: "text-violet-pop",
  mint: "text-emerald-400",
} as const;

export default function AlternatingLayout({ study }: { study: CaseStudy }) {
  const a = ACCENT[study.meta.accent];

  return (
    <div className="relative">
      {study.chapters.map((ch, idx) => {
        const reverse = idx % 2 === 1;
        return (
          <section
            key={ch.number}
            className={cn(
              "relative py-24 md:py-32 border-t border-ink-line/60",
              idx % 2 === 0 ? "bg-ink-base" : "bg-ink-surface/40"
            )}
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                  reverse && "lg:[&>*:first-child]:order-2"
                )}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7 }}
                >
                  <Placeholder
                    label={ch.placeholder.label}
                    filename={ch.placeholder.filename}
                    ratio={ch.placeholder.ratio || "video"}
                    accent={study.meta.accent}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="flex flex-col gap-5 max-w-xl"
                >
                  <div
                    className={cn(
                      "font-display font-bold leading-none",
                      a,
                      "text-[80px] md:text-[140px] opacity-30"
                    )}
                  >
                    {ch.number}
                  </div>
                  <div className="flex items-center gap-3 -mt-12">
                    <span
                      className={cn(
                        "font-mono text-xxsm uppercase tracking-[0.22em] px-2 py-1 rounded-full bg-ink-base/60 border border-ink-line",
                        a
                      )}
                    >
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
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

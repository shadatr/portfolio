"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useVariants } from "../variants/VariantProvider";
import { CaseStudy } from "./types";
import CaseStudyHeader from "./CaseStudyHeader";
import StickyLayout from "./StickyLayout";
import HorizontalLayout from "./HorizontalLayout";
import AlternatingLayout from "./AlternatingLayout";
import BlogContentLayout from "./BlogContentLayout";
import { cn } from "@/utils/cn";

const ACCENT = {
  cyan: "text-cyan-neon",
  violet: "text-violet-pop",
  mint: "text-emerald-400",
} as const;

export default function CaseStudyView({ study }: { study: CaseStudy }) {
  const { caseStudy } = useVariants();
  const a = ACCENT[study.meta.accent];

  return (
    <main className="relative">
      <CaseStudyHeader study={study} />

      {caseStudy === "horizontal" && <HorizontalLayout study={study} />}
      {caseStudy === "alternating" && <AlternatingLayout study={study} />}
      {caseStudy === "sticky" && <StickyLayout study={study} />}
      {caseStudy === "blog-content" && <BlogContentLayout study={study} />}

      <section className="relative py-24 md:py-32 border-t border-ink-line overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
              Next up
            </div>
            <Link
              href={study.next.href}
              data-cursor="hover"
              className="group block mt-2"
            >
              <motion.h3
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className={cn(
                  "font-display font-bold text-text-high text-4xl md:text-6xl leading-tight tracking-tight",
                  "group-hover:text-gradient-cyan"
                )}
              >
                {study.next.name}
                <span className={a}>.</span>{" "}
                <span aria-hidden className={a}>↗</span>
              </motion.h3>
            </Link>
          </div>
          <Link
            href="/"
            data-cursor="hover"
            className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-mid hover:text-cyan-neon transition-colors"
          >
            ← All projects
          </Link>
        </div>
      </section>
    </main>
  );
}

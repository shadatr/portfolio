"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useVariants,
  HERO_VARIANTS,
  PROJECT_VARIANTS,
  CASE_STUDY_VARIANTS,
  FONT_VARIANTS,
  THEME_VARIANTS,
  HeroVariant,
  ProjectsVariant,
  CaseStudyVariant,
  FontVariant,
  ThemeVariant,
} from "./VariantProvider";

function Row<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xxsm uppercase tracking-[0.2em] text-text-mid font-mono">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`text-xxsm px-2.5 py-1.5 rounded-full transition-all font-mono ${
                active
                  ? "bg-cyan-neon text-ink-base font-semibold shadow-neon-cyan"
                  : "bg-ink-raised text-text-mid hover:text-text-high hover:bg-ink-line"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function VariantPanel() {
  const [open, setOpen] = useState(false);
  const v = useVariants();

  return (
    <div className="fixed bottom-5 right-5 z-50 lg:flex sm:hidden md:flex">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-14 right-0 w-[300px] glass-strong rounded-2xl p-4 flex flex-col gap-4 shadow-card"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-display font-semibold text-text-high">
                Design lab
              </div>
              <div className="text-xxsm text-text-dim font-mono">
                pick a vibe →
              </div>
            </div>
            <Row<ThemeVariant>
              title="Color theme"
              options={THEME_VARIANTS}
              value={v.theme}
              onChange={v.setTheme}
            />
            <Row<FontVariant>
              title="Font set"
              options={FONT_VARIANTS}
              value={v.font}
              onChange={v.setFont}
            />
            <Row<HeroVariant>
              title="Hero"
              options={HERO_VARIANTS}
              value={v.hero}
              onChange={v.setHero}
            />
            <Row<ProjectsVariant>
              title="Projects feed"
              options={PROJECT_VARIANTS}
              value={v.projects}
              onChange={v.setProjects}
            />
            <Row<CaseStudyVariant>
              title="Case study"
              options={CASE_STUDY_VARIANTS}
              value={v.caseStudy}
              onChange={v.setCaseStudy}
            />
            <div className="text-xxsm text-text-dim border-t border-ink-line pt-2 leading-relaxed">
              Saved locally. Pick the one you like — I&apos;ll lock it in for
              the final build.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open design lab"
        className="relative h-12 w-12 rounded-full glass-strong flex items-center justify-center group hover:ring-neon transition-all"
      >
        <span className="absolute inset-0 rounded-full bg-cyan-neon/10 group-hover:bg-cyan-neon/20 transition-colors" />
        <span className="relative text-cyan-neon font-mono text-sm">⚙</span>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-neon animate-pulse" />
      </button>
    </div>
  );
}

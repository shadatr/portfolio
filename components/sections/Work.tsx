"use client";

import React from "react";
import { useVariants } from "../variants/VariantProvider";
import SectionHeading from "../ui-kit/SectionHeading";
import ProjectsBento from "../projects/ProjectsBento";
import ProjectsStacked from "../projects/ProjectsStacked";
import ProjectsCoverflow from "../projects/ProjectsCoverflow";

export default function Work() {
  const { projects: variant } = useVariants();

  return (
    <section id="work" className="relative py-36 md:py-56 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeading
            eyebrow="04 / Selected work"
            title="Things I built."
            accentWord="built."
          />
          <div className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
            All projects — full case studies →
          </div>
        </div>

        <div className="mt-14">
          {variant === "stacked" && <ProjectsStacked />}
          {variant === "coverflow" && <ProjectsCoverflow />}
          {variant === "bento" && <ProjectsBento />}
        </div>
      </div>
    </section>
  );
}

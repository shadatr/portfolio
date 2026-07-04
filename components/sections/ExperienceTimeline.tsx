"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui-kit/SectionHeading";
import { experience } from "@/lib/data";

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(34,211,238,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="03 / Experience"
          title="Where I've worked."
          accentWord="worked."
        />

        <div ref={ref} className="relative mt-16 pl-8 md:pl-16">
          {/* base line */}
          <div className="absolute left-3 md:left-7 top-0 bottom-0 w-px bg-ink-line" />
          {/* progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 md:left-7 top-0 w-px bg-gradient-to-b from-cyan-neon via-cyan-neon to-cyan-glow"
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative"
              >
                {/* node */}
                <div className="absolute left-[-32px] md:left-[-44px] top-1.5 flex items-center justify-center">
                  <div className="relative h-4 w-4 rounded-full bg-cyan-neon shadow-neon-cyan">
                    <span className="absolute inset-0 rounded-full bg-cyan-neon animate-ping opacity-60" />
                  </div>
                </div>

                <Link
                  href={exp.href}
                  data-cursor="hover"
                  className="block group rounded-2xl border border-ink-line bg-ink-surface/40 hover:bg-ink-surface/70 hover:border-cyan-neon/40 transition-all overflow-hidden"
                >
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                    <div>
                      <div className="font-mono text-xxsm uppercase tracking-[0.22em] text-cyan-neon">
                        {exp.period} · {exp.location}
                      </div>
                      <h3 className="mt-2 font-display font-bold text-text-high text-2xl md:text-4xl tracking-tight">
                        {exp.company}
                      </h3>
                      <div className="mt-1 text-text-mid">{exp.role}</div>
                      <p className="mt-4 text-text-mid max-w-2xl leading-relaxed">
                        {exp.blurb}
                      </p>

                      <ul className="mt-5 space-y-2.5 text-sm text-text-mid max-w-2xl">
                        {exp.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="flex gap-3 leading-relaxed"
                          >
                            <span className="text-cyan-neon mt-1.5 h-1 w-1 rounded-full bg-cyan-neon flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {exp.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-xxsm uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-ink-base/60 border border-ink-line text-text-mid"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:text-right flex md:flex-col items-center md:items-end gap-2 mt-2 md:mt-0">
                      <div className="font-mono text-xxsm text-text-dim">
                        0{idx + 1}
                      </div>
                      <div className="font-mono text-xxsm uppercase tracking-[0.18em] text-cyan-neon group-hover:translate-x-1 transition-transform">
                        Case study ↗
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

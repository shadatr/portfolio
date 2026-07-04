"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ============================================================================
   NUMBERS — an unnumbered proof band. Four figures count up once and stop.
   No stories, no captions beyond a label; the numbers do the talking.
   ============================================================================ */

const STATS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 3, label: "apps in production" },
  { to: 4, suffix: "y", label: "shipping end-to-end" },
  { to: 5, label: "systems live" },
  { to: 100, prefix: "<", suffix: "ms", label: "hot path budget" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

export default function Numbers() {
  return (
    <section
      aria-label="By the numbers"
      className="relative overflow-hidden border-t border-ink-line/60 py-24 md:py-36"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-14 px-6 md:grid-cols-4 md:px-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="font-display font-bold leading-none tracking-tight text-text-high text-6xl md:text-7xl">
              {s.prefix && (
                <span className="text-[rgb(var(--accent-glow))]">{s.prefix}</span>
              )}
              <Counter to={s.to} />
              {s.suffix && (
                <span className="font-editorial italic font-normal text-[rgb(var(--accent-glow))] text-4xl md:text-5xl">
                  {s.suffix}
                </span>
              )}
            </span>
            <span className="font-mono text-xxsm uppercase tracking-[0.24em] text-text-dim">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

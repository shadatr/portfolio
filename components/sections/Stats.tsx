"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const MICRO: { label: string; value: string }[] = [
  { label: "Production systems", value: "5" },
  { label: "Languages & runtimes", value: "7+" },
  { label: "Solo on", value: "3 apps" },
  { label: "Side projects shipped", value: "2024 → now" },
];

const RUNNER = [
  "Next.js 16",
  "Rust",
  "Go",
  "ClickHouse",
  "PostgreSQL",
  "Solana",
  "React Native",
  "gRPC",
  "WebSockets",
  "Supabase",
  "Three.js",
  "Framer Motion",
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    function tick(t: number) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n.toLocaleString()}</span>;
}

export default function Stats() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden border-y border-ink-line/60">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="absolute inset-x-0 bottom-0 hairline" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-20 items-end">
          {/* Featured stat — huge */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon flex items-center gap-3"
            >
              <span className="h-px w-8 bg-cyan-neon/60" />
              By the numbers
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 flex items-baseline gap-3"
            >
              <span className="font-display font-bold text-text-high leading-[0.85] tracking-tight text-[120px] md:text-[220px] xl:text-[280px]">
                <Counter to={19} />
              </span>
              <span className="font-editorial italic font-normal leading-none text-text-mid text-5xl md:text-7xl">
                gb
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-md text-md text-text-mid leading-relaxed"
            >
              <span className="font-editorial italic text-cyan-glow">
                the size of an OOM
              </span>{" "}
              I once had to investigate. A node process got killed. I proved it
              wasn&apos;t us.
            </motion.p>
          </div>

          {/* Micro stats — quiet text rows, not boxy cards */}
          <ul className="relative space-y-5 md:space-y-6">
            {MICRO.map((m, i) => (
              <motion.li
                key={m.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="flex items-baseline justify-between gap-4 group"
              >
                <span className="font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim group-hover:text-cyan-neon transition-colors">
                  0{i + 1} / {m.label}
                </span>
                <span className="font-display font-semibold text-text-high text-2xl md:text-3xl tracking-tight tabular-nums">
                  {m.value}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Runner — single-line marquee of tech with bullet dots */}
      <div className="relative mt-20 md:mt-28 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-ink-base to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-ink-base to-transparent" />
        <div className="flex marquee-track whitespace-nowrap gap-12 py-2">
          {[...RUNNER, ...RUNNER].map((tech, i) => (
            <span
              key={i}
              className="font-display text-lg md:text-2xl font-medium uppercase tracking-tight text-text-mid inline-flex items-center gap-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

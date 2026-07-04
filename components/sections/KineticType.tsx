"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  MotionValue,
} from "framer-motion";

/* ============================================================================
   KINETIC TYPE

   A two-row kinetic band that reads the page's scroll velocity and feeds it
   into the marquee: scroll faster and the words speed up and lean; flick the
   other way and the whole band reverses and skews against you. A base drift
   keeps it alive while the page is still. Pure motion-values — no layout
   thrash, runs on the compositor.
   ============================================================================ */

const ROW_TOP = ["Design", "Motion", "Systems", "Detail", "Restraint", "Craft"];
const ROW_BOTTOM = ["Ship", "Iterate", "Refine", "Own the seams", "Sweat the pixels"];

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

function MarqueeRow({
  words,
  baseVelocity,
  scrollVelocityFactor,
}: {
  words: string[];
  baseVelocity: number;
  scrollVelocityFactor: MotionValue<number>;
}) {
  const baseX = useMotionValue(0);
  const directionFactor = useRef(1);

  // x wraps within a single copy's width; we render the set 4× so the wrap
  // is seamless across the −25% travel.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = scrollVelocityFactor.get();
    // scroll direction flips the marquee direction
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    // scroll speed adds on top of the base drift
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden">
      <motion.div style={{ x }} className="flex flex-nowrap whitespace-nowrap">
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex flex-nowrap" aria-hidden={copy > 0}>
            {words.map((w, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center font-display font-semibold uppercase tracking-tight text-[12vw] leading-[0.92] md:text-[8.5vw]"
              >
                <span
                  className={
                    i % 2 === 0
                      ? "text-text-high/90"
                      : "font-editorial italic font-normal lowercase text-cyan-neon/80"
                  }
                >
                  {w}
                </span>
                <span className="mx-[0.18em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-cyan-neon/60 align-middle" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function KineticType() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // map raw velocity → a bounded factor that boosts/reverses the marquee
  const velocityFactor = useTransform(smoothVelocity, [-2, 0, 2], [-4, 0, 4], {
    clamp: false,
  });

  // the whole band leans into the scroll velocity — capped so it never tips over
  const skew = useTransform(smoothVelocity, [-1.5, 0, 1.5], [6, 0, -6], {
    clamp: true,
  });

  return (
    <section
      ref={ref}
      aria-label="Kinetic statement"
      className="relative overflow-hidden py-24 md:py-36 border-y border-ink-line/50"
    >
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="absolute inset-0 grain pointer-events-none" />

      <motion.div style={{ skewX: skew }} className="flex flex-col gap-1 md:gap-3 will-change-transform">
        <MarqueeRow
          words={ROW_TOP}
          baseVelocity={2.4}
          scrollVelocityFactor={velocityFactor}
        />
        <MarqueeRow
          words={ROW_BOTTOM}
          baseVelocity={-1.8}
          scrollVelocityFactor={velocityFactor}
        />
      </motion.div>

      {/* edge fades so words dissolve rather than clip */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-base to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-base to-transparent md:w-40" />

      <div className="absolute inset-x-0 bottom-0 hairline" />
    </section>
  );
}

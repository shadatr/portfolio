"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import MagneticButton from "../ui-kit/MagneticButton";

/* ============================================================================
   HERO — the opening scene.
   Real product shots hang in space as a floating deck: they surface one by
   one from depth, breathe on a slow loop, tilt away from the cursor, and
   sink upward as you scroll. In front, the headline rises line by line out
   of masks. One paragraph, two buttons, nothing else.
   ============================================================================ */

type Shot = {
  src: string;
  alt: string;
  left: string;
  top: string;
  rot: number;
  depth: number; // parallax multiplier
  w: number; // max width px
  float: number; // float loop duration (s)
  mobile: boolean; // shown on small screens?
};

const DECK: Shot[] = [
  {
    src: "/experience/shield/hero.png",
    alt: "NanoShield alerts dashboard",
    left: "2%",
    top: "54%",
    rot: -7,
    depth: 0.9,
    w: 360,
    float: 7,
    mobile: true,
  },
  {
    src: "/tummie/hero.png",
    alt: "Tummie landing page",
    left: "68%",
    top: "10%",
    rot: 6,
    depth: 0.6,
    w: 330,
    float: 8.5,
    mobile: true,
  },
  {
    src: "/lets-note/hero.png",
    alt: "Let's Note AI dashboard",
    left: "6%",
    top: "10%",
    rot: -4,
    depth: 0.45,
    w: 280,
    float: 9.5,
    mobile: false,
  },
  {
    src: "/experience/flare/charts.png",
    alt: "FLARE candlestick chart and orderbook",
    left: "70%",
    top: "60%",
    rot: 5,
    depth: 1.2,
    w: 320,
    float: 6,
    mobile: false,
  },
];

const LINES: { text: string; italic?: boolean }[] = [
  { text: "Shada" },
  { text: "Daab.", italic: true },
];

export default function HeroEditorial() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cursor parallax — the deck leans away from the pointer.
  const mx = useSpring(0, { stiffness: 50, damping: 16 });
  const my = useSpring(0, { stiffness: 50, damping: 16 });

  function onMouseMove(e: React.MouseEvent) {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -44);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -32);
  }

  // Scroll: type drifts up slowly, deck sinks and fades a touch faster.
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const deckY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const deckOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-base isolate"
    >
      <div className="absolute inset-0 bg-pattern" />
      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* The floating deck */}
      <motion.div
        style={{ y: deckY, opacity: deckOpacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {DECK.map((shot, i) => (
          <DeckCard key={shot.src} shot={shot} index={i} mx={mx} my={my} reduce={!!reduce} />
        ))}
      </motion.div>

      {/* Muting veils so the type always wins */}
      <div className="pointer-events-none absolute inset-0 bg-ink-base/35 backdrop-blur-[1.5px]" />
      <div className="pointer-events-none absolute inset-0 center-vignette-soft" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-base/30 via-transparent to-ink-base/85" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-24 pt-36 md:px-10 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-cyan-neon" />
            <span className="absolute inset-0 animate-ping rounded-full bg-cyan-neon opacity-50" />
          </span>
          software engineer · Istanbul
        </motion.div>

        {/* Headline — each line rises out of a mask */}
        <motion.h1
          style={{ y: titleY }}
          className="will-change-transform font-display font-bold text-text-high leading-[0.88] tracking-[-0.03em] text-[68px] md:text-[140px] xl:text-[172px]"
        >
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <motion.span
                initial={{ y: "112%", rotate: 4 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.25 + i * 0.13,
                  ease: [0.22, 0.9, 0.24, 1],
                }}
                className="block origin-left"
              >
                {line.italic ? (
                  <>
                    <span className="font-editorial italic font-normal text-gradient-warm">
                      {line.text.replace(".", "")}
                    </span>
                    {/* The full stop is alive */}
                    <motion.span
                      animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block text-cyan-neon"
                    >
                      .
                    </motion.span>
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 font-editorial text-xl italic text-text-mid md:mt-10 md:text-3xl"
        >
          From scratch to production — on whatever stack the problem needs.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 md:grid-cols-[1.4fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="max-w-xl text-md leading-[1.8] text-text-mid md:text-lg"
          >
            Engineer at Bull Teknoloji, working on real-time trading
            infrastructure. Shipped{" "}
            <span className="text-text-high">Tummie, Let&apos;s Note AI and
            Moonshot</span>{" "}
            solo — design to deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap justify-start gap-3 md:justify-end"
          >
            <MagneticButton href="#work">
              View work <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim"
      >
        <span>scroll</span>
        <motion.span
          animate={reduce ? undefined : { height: [18, 32, 18] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-gradient-to-b from-cyan-neon/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function DeckCard({
  shot,
  index,
  mx,
  my,
  reduce,
}: {
  shot: Shot;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(mx, (v) => v * shot.depth);
  const y = useTransform(my, (v) => v * shot.depth);

  return (
    <motion.div
      style={{ left: shot.left, top: shot.top, x, y }}
      className={`absolute ${shot.mobile ? "" : "hidden md:block"}`}
    >
      {/* Entrance: surfaces from depth, then breathes forever */}
      <motion.div
        initial={{ opacity: 0, y: 90, scale: 0.82, rotate: shot.rot * 2, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: shot.rot, filter: "blur(0px)" }}
        transition={{
          duration: 1.1,
          delay: 0.55 + index * 0.16,
          ease: [0.22, 0.9, 0.24, 1],
        }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: shot.float, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-xl ring-1 ring-text-high/10 shadow-lift"
          style={{ width: `clamp(150px, 24vw, ${shot.w}px)` }}
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="360px"
              className="object-cover object-left-top saturate-[0.9]"
              priority={index < 2}
            />
            {/* Soft top-light so the cards read as glass */}
            <div className="absolute inset-0 bg-gradient-to-b from-text-high/[0.06] via-transparent to-ink-base/40" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ============================================================================
   MOTION LAB

   A specimen sheet of live micro-interactions. Each cell is a real, working
   interaction — not a screenshot — labelled like a lab specimen with its
   spring config or technique. The point isn't the widgets; it's the proof
   that the motion on the rest of the site is authored, not borrowed.

   Six specimens, all framer-motion, all theme-token driven:
     01 magnetic drag      — pointer spring, snap-back
     02 elastic switch     — overshoot toggle
     03 organic morph      — perpetual border-radius blob
     04 staggered letters   — replayable per-character reveal
     05 parallax tilt      — rotateX/Y + travelling glare
     06 kinetic wave        — continuous bar field, energises on hover
   ============================================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

function SpecimenFrame({
  index,
  title,
  spec,
  hint,
  className = "",
  children,
}: {
  index: string;
  title: string;
  spec: string;
  hint: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-ink-surface/30 ring-1 ring-text-high/[0.07] transition-colors duration-500 hover:ring-text-high/15 ${className}`}
    >
      {/* corner crosshairs */}
      <span className="crosshair left-3 top-3" />
      <span className="crosshair right-3 top-3" />

      {/* spec header — index + name only; the interaction speaks for itself */}
      <div className="flex items-baseline gap-2.5 px-5 pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
        <span className="font-display italic text-cyan-neon text-base leading-none not-italic">
          {index}
        </span>
        <span className="text-text-mid">{title}</span>
      </div>

      {/* the live specimen — fills remaining height */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-8 min-h-[180px]">
        {children}
      </div>

      {/* footer hint */}
      <div className="flex items-center gap-2 border-t border-text-high/[0.05] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
        <span className="h-1 w-1 rounded-full bg-cyan-neon/70 transition-transform duration-500 group-hover:scale-150" />
        {hint}
      </div>
    </motion.div>
  );
}

/* ---------- 01 · Magnetic drag --------------------------------------------- */
function MagneticDrag() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* faint target rings */}
      <div className="pointer-events-none absolute h-28 w-28 rounded-full border border-text-dim/25" />
      <div className="pointer-events-none absolute h-16 w-16 rounded-full border border-text-dim/20" />
      <motion.div
        drag
        dragConstraints={{ left: -90, right: 90, top: -60, bottom: 60 }}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 320, bounceDamping: 16 }}
        whileDrag={{ scale: 1.18, rotate: 8, cursor: "grabbing" }}
        whileTap={{ scale: 1.1 }}
        data-fun-pop
        className="relative z-10 grid h-14 w-14 cursor-grab place-items-center rounded-full bg-cyan-neon text-ink-base shadow-soft"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">boop</span>
        <span className="absolute -inset-2 rounded-full ring-1 ring-cyan-neon/30" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-text-high text-ink-base" />
      </motion.div>
    </div>
  );
}

/* ---------- 02 · Elastic switch -------------------------------------------- */
function ElasticSwitch() {
  const [on, setOn] = useState(true);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className="flex items-center gap-4"
    >
      <span
        className={`relative flex h-9 w-[68px] items-center rounded-full px-1 transition-colors duration-500 ${
          on ? "bg-cyan-neon/90" : "bg-ink-raised ring-1 ring-text-high/10"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 22, mass: 0.7 }}
          className={`h-7 w-7 rounded-full ${on ? "bg-ink-base" : "bg-text-mid"}`}
          style={{ marginLeft: on ? "auto" : 0 }}
        />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-mid tabular-nums">
        {on ? "on" : "off"}
      </span>
    </button>
  );
}

/* ---------- 03 · Organic morph --------------------------------------------- */
function OrganicMorph() {
  return (
    <motion.div
      animate={{
        borderRadius: [
          "42% 58% 63% 37% / 41% 44% 56% 59%",
          "63% 37% 42% 58% / 58% 63% 37% 42%",
          "38% 62% 53% 47% / 62% 38% 62% 38%",
          "42% 58% 63% 37% / 41% 44% 56% 59%",
        ],
        rotate: [0, 90, 180, 360],
      }}
      transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
      className="relative h-24 w-24 will-change-transform"
      style={{
        background:
          "radial-gradient(120% 120% at 30% 25%, rgb(var(--accent-glow) / 0.95), rgb(var(--accent-secondary) / 0.65) 70%)",
        boxShadow: "0 0 40px -10px rgb(var(--accent-primary) / 0.45)",
      }}
    >
      <span className="absolute left-7 top-8 h-3 w-3 rounded-full bg-ink-base/80" />
      <span className="absolute right-7 top-8 h-3 w-3 rounded-full bg-ink-base/80" />
      <motion.span
        animate={{ width: [18, 28, 18] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 h-1 -translate-x-1/2 rounded-full bg-ink-base/75"
      />
    </motion.div>
  );
}

/* ---------- 04 · Staggered letters ----------------------------------------- */
function StaggerWord() {
  const word = "PLAY MODE".split("");
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      whileHover="show"
      viewport={{ once: false, margin: "-40px" }}
      variants={{ show: { transition: { staggerChildren: 0.045 } } }}
      className="flex cursor-default select-none"
    >
      {word.map((c, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "110%", opacity: 0, rotate: 8 },
            show: { y: "0%", opacity: 1, rotate: 0 },
          }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="inline-block overflow-hidden font-display text-3xl md:text-4xl font-bold tracking-tight text-text-high"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ---------- 05 · Parallax tilt + glare ------------------------------------- */
function TiltGlare() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [12, -12]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-16, 16]), {
    stiffness: 200,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function leave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div style={{ perspective: 700 }} className="h-full w-full grid place-items-center">
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        data-fun-pop
        className="relative h-28 w-44 overflow-hidden rounded-xl bg-ink-raised/80 ring-1 ring-text-high/10 will-change-transform"
      >
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-dim">
            ◐ depth
          </span>
          <span
            style={{ transform: "translateZ(40px)" }}
            className="font-display text-2xl font-bold tracking-tight text-text-high"
          >
            Tilt
          </span>
        </div>
        {/* travelling glare */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-1/2 h-[200%] w-[200%]"
          style={{
            left: glareX,
            top: glareY,
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, rgb(var(--text-high) / 0.18), transparent 45%)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ---------- 06 · Kinetic wave ---------------------------------------------- */
function KineticWave() {
  const [hot, setHot] = useState(false);
  const bars = Array.from({ length: 11 });
  return (
    <div
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      className="flex h-20 items-center gap-[5px]"
    >
      {bars.map((_, i) => {
        const mid = (bars.length - 1) / 2;
        const dist = Math.abs(i - mid) / mid; // 0 center → 1 edge
        const peak = hot ? 64 - dist * 30 : 30 - dist * 14;
        return (
          <motion.span
            key={i}
            animate={{ height: [peak * 0.35, peak, peak * 0.45] }}
            transition={{
              duration: hot ? 0.7 : 1.4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: i * 0.06,
            }}
            className="w-[5px] rounded-full"
            style={{
              background: hot
                ? "rgb(var(--accent-glow))"
                : "rgb(var(--text-mid) / 0.7)",
            }}
          />
        );
      })}
    </div>
  );
}

export default function MotionLab() {
  return (
    <section
      id="motion-lab"
      className="relative py-36 md:py-52 overflow-hidden border-t border-ink-line/60"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
          02 / The craft
        </motion.div>

        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[40px] md:text-[72px] max-w-3xl"
          >
            Motion,{" "}
            <span className="font-editorial italic font-normal text-gradient-warm">
              engineered.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-sm text-md text-text-mid leading-relaxed md:text-right"
          >
            Every specimen is live. The same springs drive the rest of this
            site.
          </motion.p>
        </div>

        {/* specimen grid — bento rhythm */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
          <SpecimenFrame
            index="01"
            title="Magnetic"
            spec="bounce 320/16"
            hint="drag · throw · snaps home"
            className="lg:col-span-2 lg:row-span-1"
          >
            <MagneticDrag />
          </SpecimenFrame>

          <SpecimenFrame
            index="02"
            title="Elastic"
            spec="spring 600/22"
            hint="click to toggle"
          >
            <ElasticSwitch />
          </SpecimenFrame>

          <SpecimenFrame
            index="03"
            title="Morph"
            spec="border-radius"
            hint="perpetual · 11s loop"
          >
            <OrganicMorph />
          </SpecimenFrame>

          <SpecimenFrame
            index="04"
            title="Play type"
            spec="delay 0.045s"
            hint="hover to replay"
          >
            <StaggerWord />
          </SpecimenFrame>

          <SpecimenFrame
            index="05"
            title="Tilt"
            spec="rotateX/Y · glare"
            hint="move cursor across"
            className="lg:col-span-2"
          >
            <TiltGlare />
          </SpecimenFrame>

          <SpecimenFrame
            index="06"
            title="Kinetic"
            spec="mirror loop"
            hint="hover to energise"
          >
            <KineticWave />
          </SpecimenFrame>
        </div>
      </div>
    </section>
  );
}

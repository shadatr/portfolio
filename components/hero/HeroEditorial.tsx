"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import MagneticButton from "../ui-kit/MagneticButton";

// Screenshots scattered across the FULL viewport — anchored as % so they
// spread to every edge, then drift on cursor. Kept muted so the type leads.
type CollageItem = {
  src: string;
  left: string; // viewport %
  top: string; // viewport %
  rot: number;
  depth: number; // 0-1, how much it drifts with the cursor
  w: number; // base width
};

const COLLAGE: CollageItem[] = [
  // Top band
  { src: "/media1.png", left: "8%", top: "14%", rot: -8, depth: 0.4, w: 220 },
  { src: "/solana.png", left: "42%", top: "6%", rot: 3, depth: 0.3, w: 180 },
  { src: "/tech1.png", left: "78%", top: "12%", rot: 7, depth: 0.5, w: 240 },
  // Middle band — slightly bigger so they peek behind the type
  { src: "/bookItNow1.png", left: "3%", top: "44%", rot: -11, depth: 0.7, w: 260 },
  { src: "/media2.png", left: "82%", top: "42%", rot: 6, depth: 0.55, w: 240 },
  { src: "/solmint1.png", left: "18%", top: "62%", rot: 4, depth: 0.6, w: 210 },
  { src: "/tech2.png", left: "68%", top: "66%", rot: -4, depth: 0.45, w: 230 },
  // Bottom band
  { src: "/ums1.png", left: "10%", top: "82%", rot: -6, depth: 0.55, w: 220 },
  { src: "/media3.png", left: "45%", top: "86%", rot: 5, depth: 0.4, w: 200 },
  { src: "/bookItNow2.png", left: "78%", top: "84%", rot: 8, depth: 0.5, w: 220 },
];

export default function HeroEditorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Mouse parallax: subtle drift on cursor move
  const mx = useSpring(0, { stiffness: 60, damping: 14 });
  const my = useSpring(0, { stiffness: 60, damping: 14 });

  function onMouseMove(e: React.MouseEvent) {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx * 40);
    my.set(ny * 40);
  }

  // Big type slides up on scroll
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const collageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-base isolate"
    >
      {/* Ambient layers */}
      <div className="absolute inset-0 bg-grid-cyan [background-size:48px_48px] opacity-[0.12]" />
      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="absolute inset-0 beams pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.10),transparent_55%)] pointer-events-none" />

      {/* Decorative crosshairs */}
      <span className="crosshair top-24 left-10" />
      <span className="crosshair top-24 right-10" />
      <span className="crosshair bottom-10 left-10" />
      <span className="crosshair bottom-10 right-10" />

      {/* Collage — scattered images spread to every edge, drift with mouse */}
      <motion.div
        style={{ opacity: collageOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        {COLLAGE.map((c, i) => (
          <CollageImage key={i} item={c} mx={mx} my={my} index={i} />
        ))}
      </motion.div>

      {/* Muting layers — desaturate + darken the collage so type leads */}
      <div className="pointer-events-none absolute inset-0 bg-ink-base/45 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute inset-0 center-vignette" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-base/40 via-transparent to-ink-base/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-36 md:pt-48 pb-24 min-h-[100svh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
          Hi, I&apos;m Shada · software engineer · Istanbul
        </motion.div>

        <motion.h1
          style={{ y: titleY }}
          className="will-change-transform font-display font-bold text-text-high leading-[0.86] tracking-[-0.03em] text-[72px] md:text-[148px] xl:text-[180px]"
        >
          <SplitLine delay={0}>I ship</SplitLine>
          <SplitLine delay={0.08}>software</SplitLine>
          <SplitLine delay={0.16}>
            <span className="font-editorial italic font-normal text-gradient-warm">
              that ships
            </span>
            <span className="text-cyan-neon">.</span>
          </SplitLine>
        </motion.h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-md md:text-lg text-text-mid leading-relaxed max-w-2xl"
          >
            <span className="text-text-high">Software engineer</span> who
            ships end-to-end. Three solo apps in production — an AI study
            companion, a gut-health tracker, a Solana watcher — plus a
            real-time RegTech system at Bull Teknoloji by day. I write Rust at
            3am, <span className="text-text-high">design my own screens</span>,
            and answer my own emails.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-3 justify-start md:justify-end"
          >
            <MagneticButton href="#work">
              See the work <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Say hi
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 md:mt-24 grid grid-cols-3 gap-6 max-w-4xl border-t border-cyan-neon/15 pt-6"
        >
          <Pill label="Focus" value="End-to-end builds" />
          <Pill label="Stack" value="TS · Rust · Go" />
          <Pill label="Latitude" value="41.0082° N" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim flex flex-col items-center gap-2"
      >
        <span>scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-cyan-neon/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="font-mono text-xxsm uppercase tracking-[0.22em]">
      <div className="text-text-dim">{label}</div>
      <div className="text-text-high text-xsm mt-1 normal-case tracking-normal font-display font-semibold">
        {value}
      </div>
    </div>
  );
}

function SplitLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function CollageImage({
  item,
  mx,
  my,
  index,
}: {
  item: CollageItem;
  mx: any;
  my: any;
  index: number;
}) {
  const tx = useTransform(mx, (v: number) => v * item.depth);
  const ty = useTransform(my, (v: number) => v * item.depth);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: item.rot }}
      animate={{ opacity: 1, scale: 1, rotate: item.rot }}
      transition={{ duration: 1.2, delay: 0.15 + index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        x: tx,
        y: ty,
        left: item.left,
        top: item.top,
        width: item.w,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="absolute aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-cyan-neon/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] hidden md:block"
    >
      <Image
        src={item.src}
        alt=""
        fill
        sizes="280px"
        className="object-cover saturate-[0.35] contrast-[0.95] brightness-[0.75]"
      />
      {/* per-image wash that ties them all to the palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/10 via-transparent to-violet-pop/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-ink-base/30" />
    </motion.div>
  );
}

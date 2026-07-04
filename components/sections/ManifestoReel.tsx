"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

type Slide = {
  index: string;
  eyebrow: string;
  statement: string;
  italicTail: string;
  body: string;
  visual: "orbit" | "stack" | "wave" | "split" | "polyglot";
};

// Three principles, not five — the reel is a statement about restraint,
// so it has to practice it. One viewport of scroll per principle.
const SLIDES: Slide[] = [
  {
    index: "i.",
    eyebrow: "principle one",
    statement: "I ship the whole",
    italicTail: "thing.",
    body: "Frontend, backend, database, design, deploy. Solo across three production apps. The hardest bug usually lives at the seam between layers — so I own the seams.",
    visual: "orbit",
  },
  {
    index: "ii.",
    eyebrow: "principle two",
    statement: "Real-time means",
    italicTail: "real.",
    body: "Sub-100ms or it doesn't count. I rebuilt our event path from Node to Go after the loop got buried by high-frequency feeds. The metric is the user's perception, not the dashboard.",
    visual: "wave",
  },
  {
    index: "iii.",
    eyebrow: "principle three",
    statement: "Less surface.",
    italicTail: "More depth.",
    body: "I would rather ship one feature that respects your attention than four that compete for it. Restraint is a feature. Whitespace is a feature. Saying no is a feature.",
    visual: "split",
  },
];

const SLIDE_COUNT = SLIDES.length;

export default function ManifestoReel() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${(100 * (SLIDE_COUNT - 1)) / SLIDE_COUNT}%`]
  );

  const progressScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      aria-label="Manifesto"
      className="relative"
      style={{ height: `${SLIDE_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-base">
        <div className="absolute inset-0 bg-pattern" />
        <div className="absolute inset-0 grain pointer-events-none" />

        {/* Header — fixed across slides */}
        <div className="absolute top-0 inset-x-0 z-20 pt-28 md:pt-32 px-6 md:px-12 lg:px-20 flex items-center justify-between font-mono text-xxsm uppercase tracking-[0.3em] text-text-mid">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
            <span>Manifesto</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-text-dim">scroll to advance</span>
            <span className="text-text-high">↓</span>
          </div>
        </div>

        {/* Slide track */}
        <motion.div
          style={{ x: trackX, width: `${SLIDE_COUNT * 100}%` }}
          className="h-full flex"
        >
          {SLIDES.map((slide, i) => (
            <SlideView
              key={slide.index}
              slide={slide}
              index={i}
              total={SLIDE_COUNT}
              progress={smoothProgress}
            />
          ))}
        </motion.div>

        {/* Bottom rail: progress bar + slide markers */}
        <div className="absolute bottom-10 md:bottom-14 inset-x-0 z-20 px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-xl">
              <div className="relative h-px bg-text-dim/30 origin-left">
                <motion.div
                  style={{ scaleX: progressScaleX }}
                  className="absolute inset-0 bg-cyan-neon origin-left"
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em]">
                {SLIDES.map((s, i) => (
                  <SlideTick
                    key={s.index}
                    label={s.index}
                    index={i}
                    total={SLIDE_COUNT}
                    progress={smoothProgress}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-text-dim">
              <span>three principles</span>
              <span className="text-text-mid">— how I work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideTick({
  label,
  index,
  total,
  progress,
}: {
  label: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each slide owns a 1/total window; closeness to the slide drives opacity
  const slideCenter = (index + 0.5) / total;
  const reach = 0.6 / total;
  const opacity = useTransform(progress, (v) => {
    const distance = Math.abs(v - slideCenter);
    if (distance < reach * 0.4) return 1;
    if (distance < reach) return 0.6;
    return 0.35;
  });
  const color = useTransform(progress, (v) => {
    const distance = Math.abs(v - slideCenter);
    return distance < reach * 0.5
      ? "rgb(var(--accent-primary))"
      : "rgb(var(--text-dim))";
  });
  return (
    <motion.span style={{ opacity, color }} className="tabular-nums">
      {label}
    </motion.span>
  );
}

function SlideView({
  slide,
  index,
  total,
  progress,
}: {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Compute slide-local progress: 0 entering, 1 leaving, 0.5 dead-center
  const start = index / total;
  const end = (index + 1) / total;
  const local = useTransform(progress, [start, end], [0, 1], { clamp: false });

  // Content drifts subtly so each slide breathes when active
  const textY = useTransform(local, [0, 0.5, 1], [40, 0, -40]);
  const textOpacity = useTransform(local, [0, 0.25, 0.5, 0.75, 1], [0, 0.85, 1, 0.85, 0]);

  return (
    <div className="relative shrink-0 w-screen h-full flex items-center px-6 md:px-12 lg:px-24">
      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center w-full max-w-7xl mx-auto">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="will-change-transform"
        >
          <div className="flex items-baseline gap-4 font-mono text-xxsm uppercase tracking-[0.3em] text-text-mid">
            <span className="font-display italic text-cyan-neon text-lg leading-none">
              {slide.index}
            </span>
            <span className="hairline flex-1 max-w-[140px]" />
            <span>{slide.eyebrow}</span>
          </div>

          <h2 className="mt-8 font-display font-bold text-text-high leading-[0.94] tracking-[-0.025em] text-[44px] md:text-[80px] xl:text-[104px]">
            {slide.statement}{" "}
            <span className="font-editorial italic font-normal text-gradient-warm">
              {slide.italicTail}
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-md md:text-lg text-text-mid leading-[1.7]">
            {slide.body}
          </p>
        </motion.div>

        <motion.div
          style={{
            opacity: useTransform(local, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
            scale: useTransform(local, [0, 0.5, 1], [0.92, 1, 0.96]),
          }}
          className="relative aspect-square w-full max-w-[460px] mx-auto will-change-transform"
        >
          <SlideVisual variant={slide.visual} progress={local} />
        </motion.div>
      </div>
    </div>
  );
}

function SlideVisual({
  variant,
  progress,
}: {
  variant: Slide["visual"];
  progress: MotionValue<number>;
}) {
  // Spin/animate based on slide-local progress
  const rotate = useTransform(progress, [0, 1], [-12, 12]);
  const draw = useTransform(progress, [0, 1], [0, 1]);

  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      style={{ rotate }}
      aria-hidden
    >
      {/* Concentric guide circles — universal frame */}
      <circle
        cx="200"
        cy="200"
        r="190"
        fill="none"
        stroke="rgb(var(--text-dim) / 0.35)"
        strokeWidth="0.6"
        strokeDasharray="2 6"
      />
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke="rgb(var(--text-dim) / 0.25)"
        strokeWidth="0.6"
      />
      <circle
        cx="200"
        cy="200"
        r="90"
        fill="none"
        stroke="rgb(var(--text-dim) / 0.2)"
        strokeWidth="0.6"
      />

      {variant === "orbit" && <OrbitVisual draw={draw} />}
      {variant === "stack" && <StackVisual draw={draw} />}
      {variant === "wave" && <WaveVisual draw={draw} />}
      {variant === "split" && <SplitVisual draw={draw} />}
      {variant === "polyglot" && <PolyglotVisual draw={draw} />}
    </motion.svg>
  );
}

function OrbitVisual({ draw }: { draw: MotionValue<number> }) {
  // Three orbiting nodes — represents end-to-end coverage
  const nodes = [0, 1, 2];
  return (
    <g>
      <circle
        cx="200"
        cy="200"
        r="6"
        fill="rgb(var(--accent-primary))"
      />
      {nodes.map((n) => {
        const angle = (n / 3) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + Math.cos(angle) * 140;
        const y = 200 + Math.sin(angle) * 140;
        return (
          <g key={n}>
            <line
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="rgb(var(--accent-primary) / 0.5)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            <circle
              cx={x}
              cy={y}
              r="10"
              fill="rgb(var(--ink-base))"
              stroke="rgb(var(--accent-primary))"
              strokeWidth="1.2"
            />
          </g>
        );
      })}
    </g>
  );
}

function StackVisual({ draw }: { draw: MotionValue<number> }) {
  // Stacked planes — represents layered surfaces of design+engineering
  const rectWidth = useTransform(draw, [0, 1], [60, 220]);
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={useTransform(rectWidth, (w) => 200 - w / 2)}
          y={130 + i * 30}
          width={rectWidth}
          height="2"
          rx="1"
          fill={
            i === 1
              ? "rgb(var(--accent-primary))"
              : "rgb(var(--text-mid) / 0.5)"
          }
        />
      ))}
      <text
        x="200"
        y="260"
        textAnchor="middle"
        className="font-mono"
        fontSize="8"
        letterSpacing="3"
        fill="rgb(var(--text-dim))"
      >
        DESIGN · CODE · SHIP
      </text>
    </g>
  );
}

function WaveVisual({ draw }: { draw: MotionValue<number> }) {
  // Sine wave with travelling dot — real-time
  const dotX = useTransform(draw, [0, 1], [60, 340]);
  // Build a quick sine path string
  const pts: string[] = [];
  for (let x = 60; x <= 340; x += 4) {
    const y = 200 + Math.sin((x - 60) / 22) * 36;
    pts.push(`${x},${y}`);
  }
  const d = `M ${pts.join(" L ")}`;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgb(var(--accent-primary) / 0.7)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <motion.circle
        cx={dotX}
        cy={useTransform(dotX, (x) => 200 + Math.sin((x - 60) / 22) * 36)}
        r="6"
        fill="rgb(var(--accent-glow))"
      />
      <text
        x="200"
        y="320"
        textAnchor="middle"
        className="font-mono"
        fontSize="8"
        letterSpacing="3"
        fill="rgb(var(--text-dim))"
      >
        &lt; 100 MS
      </text>
    </g>
  );
}

function PolyglotVisual({ draw }: { draw: MotionValue<number> }) {
  // One engineer at the center; eight uniformly-sized tool shapes around it.
  // Each tool has a different SVG primitive (square / circle / triangle /
  // diamond / hexagon / plus / ring / bar) — different forms, equal weight.
  // Tags spell out the disciplines without making a literal logo wall.
  const TOOLS = [
    { label: "DB" },
    { label: "AI" },
    { label: "WEB" },
    { label: "API" },
    { label: "RT" },
    { label: "iOS" },
    { label: "INFRA" },
    { label: "SVC" },
  ];
  const RADIUS = 150;

  return (
    <g>
      {/* Center node — the engineer */}
      <circle
        cx="200"
        cy="200"
        r="9"
        fill="rgb(var(--accent-primary))"
      />
      <circle
        cx="200"
        cy="200"
        r="18"
        fill="none"
        stroke="rgb(var(--accent-primary) / 0.35)"
        strokeWidth="0.7"
      />

      {TOOLS.map((t, i) => {
        const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + Math.cos(angle) * RADIUS;
        const y = 200 + Math.sin(angle) * RADIUS;
        const labelX = 200 + Math.cos(angle) * (RADIUS + 24);
        const labelY = 200 + Math.sin(angle) * (RADIUS + 24);

        return (
          <g key={t.label}>
            {/* Hairline from center to tool */}
            <line
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="rgb(var(--text-dim) / 0.4)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
            {/* Distinct tool primitive per slot — different forms, same weight */}
            <ToolGlyph index={i} cx={x} cy={y} />
            {/* Label — uppercase mono, sits outside the ring */}
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="2"
              fill="rgb(var(--text-dim))"
            >
              {t.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function ToolGlyph({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  // Eight visually distinct primitives, all roughly the same visual weight.
  const stroke = "rgb(var(--accent-primary))";
  const fill = "rgb(var(--ink-base))";
  const sw = 1.2;
  switch (index) {
    case 0: // square
      return <rect x={cx - 8} y={cy - 8} width="16" height="16" fill={fill} stroke={stroke} strokeWidth={sw} />;
    case 1: // circle
      return <circle cx={cx} cy={cy} r="9" fill={fill} stroke={stroke} strokeWidth={sw} />;
    case 2: // triangle
      return (
        <polygon
          points={`${cx},${cy - 10} ${cx + 9},${cy + 7} ${cx - 9},${cy + 7}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    case 3: // diamond
      return (
        <polygon
          points={`${cx},${cy - 10} ${cx + 10},${cy} ${cx},${cy + 10} ${cx - 10},${cy}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    case 4: // hexagon
      return (
        <polygon
          points={`${cx - 9},${cy - 5} ${cx},${cy - 10} ${cx + 9},${cy - 5} ${cx + 9},${cy + 5} ${cx},${cy + 10} ${cx - 9},${cy + 5}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    case 5: // plus
      return (
        <g>
          <line x1={cx - 9} y1={cy} x2={cx + 9} y2={cy} stroke={stroke} strokeWidth={sw + 0.4} />
          <line x1={cx} y1={cy - 9} x2={cx} y2={cy + 9} stroke={stroke} strokeWidth={sw + 0.4} />
        </g>
      );
    case 6: // ring (concentric)
      return (
        <g>
          <circle cx={cx} cy={cy} r="9" fill="none" stroke={stroke} strokeWidth={sw} />
          <circle cx={cx} cy={cy} r="3" fill={stroke} />
        </g>
      );
    default: // horizontal bar
      return <rect x={cx - 10} y={cy - 3} width="20" height="6" rx="1" fill={fill} stroke={stroke} strokeWidth={sw} />;
  }
}

function SplitVisual({ draw }: { draw: MotionValue<number> }) {
  // Two halves: left full, right pared down — less surface, more depth
  const gap = useTransform(draw, [0, 1], [0, 36]);
  return (
    <g>
      <motion.rect
        x={useTransform(gap, (g) => 80 - g / 2)}
        y="100"
        width="100"
        height="200"
        rx="6"
        fill="none"
        stroke="rgb(var(--text-mid) / 0.5)"
        strokeWidth="0.8"
      />
      <motion.rect
        x={useTransform(gap, (g) => 220 + g / 2)}
        y="140"
        width="100"
        height="120"
        rx="6"
        fill="rgb(var(--accent-primary) / 0.12)"
        stroke="rgb(var(--accent-primary))"
        strokeWidth="1"
      />
      <text
        x="130"
        y="330"
        textAnchor="middle"
        className="font-mono"
        fontSize="8"
        letterSpacing="3"
        fill="rgb(var(--text-dim))"
      >
        BUSY
      </text>
      <text
        x="270"
        y="330"
        textAnchor="middle"
        className="font-mono"
        fontSize="8"
        letterSpacing="3"
        fill="rgb(var(--accent-primary))"
      >
        QUIET
      </text>
    </g>
  );
}

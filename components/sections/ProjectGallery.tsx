"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

type Shot = { title: string; tag: string; thumbnail: string };

// 15 screenshots — 3 rows × 5
const SHOTS: Shot[] = [
  { title: "Media OS · feed", tag: "Next.js", thumbnail: "/media1.png" },
  { title: "Media OS · player", tag: "Next.js", thumbnail: "/media2.png" },
  { title: "Media OS · profile", tag: "Next.js", thumbnail: "/media3.png" },
  { title: "Media OS · search", tag: "Next.js", thumbnail: "/media4.png" },
  { title: "TechDeck · dashboard", tag: "React", thumbnail: "/tech1.png" },

  { title: "TechDeck · settings", tag: "React", thumbnail: "/tech2.png" },
  { title: "TechDeck · live", tag: "WebSockets", thumbnail: "/tech3.png" },
  { title: "BookItNow · landing", tag: "Booking", thumbnail: "/bookItNow1.png" },
  { title: "BookItNow · flow", tag: "Booking", thumbnail: "/bookItNow2.png" },
  { title: "BookItNow · confirm", tag: "Booking", thumbnail: "/bookItNow3.png" },

  { title: "SolMint · mint UI", tag: "Solana", thumbnail: "/solmint1.png" },
  { title: "SolMint · tx confirm", tag: "Solana", thumbnail: "/solmint2.png" },
  { title: "Solana · explorer", tag: "Web3", thumbnail: "/solana.png" },
  { title: "UMS · admin", tag: "Internal", thumbnail: "/ums1.png" },
  { title: "UMS · roles", tag: "Internal", thumbnail: "/ums2.png" },
];

export default function ProjectGallery() {
  const firstRow = SHOTS.slice(0, 5);
  const secondRow = SHOTS.slice(5, 10);
  const thirdRow = SHOTS.slice(10, 15);

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative h-[300vh] pt-40 md:pt-64 pb-32 overflow-hidden antialiased flex flex-col self-auto border-t border-ink-line/40"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="will-change-transform"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20 mb-12 md:mb-20">
          {firstRow.map((shot) => (
            <Card key={shot.title} shot={shot} translate={translateX} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 md:mb-20 space-x-12 md:space-x-20">
          {secondRow.map((shot) => (
            <Card key={shot.title} shot={shot} translate={translateXReverse} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20">
          {thirdRow.map((shot) => (
            <Card key={shot.title} shot={shot} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade for graceful exit */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-base to-transparent" />
    </section>
  );
}

function Header() {
  return (
    <div className="relative mx-auto max-w-7xl py-16 md:py-24 px-6 md:px-10 w-full left-0 top-0">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
      >
        <span className="h-px w-8 bg-cyan-neon/60" />
        05 / Screens
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 max-w-3xl font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[44px] md:text-[88px]"
      >
        A wall of{" "}
        <span className="font-editorial italic font-normal text-gradient-warm">
          shipped
        </span>{" "}
        pixels.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-5 max-w-xl text-md text-text-mid leading-relaxed"
      >
        Every screen below shipped to a real user. Scroll to scrub through it —
        fifteen panels, three rows, drifting in opposite directions.
      </motion.p>
      <div className="mt-4 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim">
        ↓ scroll to scrub
      </div>
    </div>
  );
}

function Card({
  shot,
  translate,
}: {
  shot: Shot;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={shot.title}
      className="group/product h-72 md:h-96 w-[22rem] md:w-[30rem] relative flex-shrink-0 rounded-2xl overflow-hidden ring-1 ring-text-high/[0.08] bg-ink-surface/40 shadow-lift"
    >
      <span className="block group-hover/product:shadow-2xl">
        <Image
          src={shot.thumbnail}
          height={600}
          width={600}
          alt={shot.title}
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
      </span>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-ink-base transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
        <div className="font-mono text-xxsm uppercase tracking-[0.22em] text-cyan-neon">
          {shot.tag}
        </div>
        <h2 className="font-display font-semibold text-text-high text-lg mt-1">
          {shot.title}
        </h2>
      </div>
    </motion.div>
  );
}

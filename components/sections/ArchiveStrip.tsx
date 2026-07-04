"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ============================================================================
   ARCHIVE STRIP

   A single quiet marquee of earlier shipped screens. It replaces the old
   300vh gallery scrub: same evidence of breadth, a fraction of the scroll.
   Unnumbered on purpose — it's an interstitial, not a chapter.
   ============================================================================ */

type Shot = { title: string; tag: string; thumbnail: string };

const SHOTS: Shot[] = [
  { title: "Media OS · feed", tag: "Next.js", thumbnail: "/media1.png" },
  { title: "TechDeck · dashboard", tag: "React", thumbnail: "/tech1.png" },
  { title: "BookItNow · landing", tag: "Booking", thumbnail: "/bookItNow1.png" },
  { title: "SolMint · mint UI", tag: "Solana", thumbnail: "/solmint1.png" },
  { title: "Media OS · player", tag: "Next.js", thumbnail: "/media2.png" },
  { title: "UMS · admin", tag: "Internal", thumbnail: "/ums1.png" },
  { title: "TechDeck · live", tag: "WebSockets", thumbnail: "/tech3.png" },
  { title: "BookItNow · flow", tag: "Booking", thumbnail: "/bookItNow2.png" },
  { title: "Solana · explorer", tag: "Web3", thumbnail: "/solana.png" },
  { title: "Media OS · profile", tag: "Next.js", thumbnail: "/media3.png" },
  { title: "SolMint · tx confirm", tag: "Solana", thumbnail: "/solmint2.png" },
  { title: "TechDeck · settings", tag: "React", thumbnail: "/tech2.png" },
  { title: "BookItNow · confirm", tag: "Booking", thumbnail: "/bookItNow3.png" },
  { title: "UMS · roles", tag: "Internal", thumbnail: "/ums2.png" },
  { title: "Media OS · search", tag: "Next.js", thumbnail: "/media4.png" },
];

export default function ArchiveStrip() {
  return (
    <section
      id="archive"
      aria-label="Archive of earlier shipped screens"
      className="relative py-20 md:py-28 overflow-hidden border-t border-ink-line/40"
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto max-w-7xl px-6 md:px-10 mb-10 flex items-center justify-between font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim"
      >
        <span className="flex items-center gap-3">
          <span className="h-px w-8 bg-text-dim/50" />
          From the archive — earlier shipped screens
        </span>
        <span className="hidden md:block">hover to pause</span>
      </motion.div>

      {/* Marquee — content rendered exactly twice so the -50% wrap is seamless */}
      <div className="group relative">
        <div className="marquee-track group-hover:[animation-play-state:paused] flex w-max gap-5 md:gap-6 pr-5 md:pr-6">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0}
              className="flex gap-5 md:gap-6"
            >
              {SHOTS.map((shot) => (
                <ArchiveCard key={`${copy}-${shot.title}`} shot={shot} />
              ))}
            </div>
          ))}
        </div>

        {/* Edge fades so screens dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-base to-transparent md:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-base to-transparent md:w-36" />
      </div>
    </section>
  );
}

function ArchiveCard({ shot }: { shot: Shot }) {
  return (
    <div className="group/card relative h-44 w-72 md:h-52 md:w-80 shrink-0 overflow-hidden rounded-xl ring-1 ring-text-high/[0.07] bg-ink-surface/40">
      <Image
        src={shot.thumbnail}
        alt={shot.title}
        fill
        sizes="320px"
        className="object-cover object-left-top saturate-[0.45] brightness-[0.8] transition-all duration-500 group-hover/card:saturate-100 group-hover/card:brightness-100"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-base/90 to-transparent px-4 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-neon">
          {shot.tag}
        </div>
        <div className="mt-0.5 font-display font-semibold text-text-high text-sm">
          {shot.title}
        </div>
      </div>
    </div>
  );
}

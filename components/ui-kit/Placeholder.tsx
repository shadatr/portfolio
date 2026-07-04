"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {
  label: string;
  filename?: string;
  ratio?: "video" | "square" | "portrait" | "wide" | "phone";
  className?: string;
  accent?: "cyan" | "violet" | "mint";
  scanlines?: boolean;
  /** "cover" crops to fill (cards); "contain" always shows the full
      screenshot, letterboxed over a blurred copy of itself (case studies). */
  fit?: "cover" | "contain";
};

const RATIOS: Record<NonNullable<Props["ratio"]>, string> = {
  video: "aspect-[16/9]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[21/9]",
  phone: "aspect-[9/19]",
};

const ACCENTS = {
  cyan: {
    border: "border-text-high/15",
    text: "text-cyan-neon",
    glow: "",
  },
  violet: {
    border: "border-text-high/15",
    text: "text-cyan-glow",
    glow: "",
  },
  mint: {
    border: "border-text-high/15",
    text: "text-text-high",
    glow: "",
  },
} as const;

export default function Placeholder({
  label,
  filename,
  ratio = "video",
  className,
  accent = "cyan",
  scanlines = true,
  fit = "cover",
}: Props) {
  const a = ACCENTS[accent];
  // If a real image exists at public/<filename>, it renders on top of the
  // placeholder art; if the file is missing, onError reveals the placeholder.
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!filename && !imgFailed;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-ink-surface/60 backdrop-blur",
        RATIOS[ratio],
        a.border,
        a.glow,
        className
      )}
    >
      <div className="absolute inset-0 bg-pattern opacity-60" />
      {scanlines && <div className="absolute inset-0 scanline" />}
      <div className="absolute inset-0 bg-radial-glow opacity-60" />

      {/* corner markers */}
      <Corner pos="tl" accent={a.text} />
      <Corner pos="tr" accent={a.text} />
      <Corner pos="bl" accent={a.text} />
      <Corner pos="br" accent={a.text} />

      <div className="relative h-full w-full flex flex-col items-center justify-center text-center p-6 gap-2">
        <div
          className={cn(
            "font-mono text-xxsm uppercase tracking-[0.3em]",
            a.text
          )}
        >
          image placeholder
        </div>
        <div className="text-text-high font-display font-semibold text-md md:text-lg">
          {label}
        </div>
        {filename && (
          <div className="font-mono text-xxsm text-text-mid mt-1 px-2 py-1 rounded bg-ink-base/60 border border-ink-line">
            public/{filename}
          </div>
        )}
      </div>

      {showImage && fit === "cover" && (
        <Image
          src={`/${filename}`}
          alt={label}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className="object-cover object-top"
          onError={() => setImgFailed(true)}
        />
      )}

      {showImage && fit === "contain" && (
        <>
          {/* Blurred self-backdrop fills the letterbox */}
          <Image
            src={`/${filename}`}
            alt=""
            aria-hidden
            fill
            sizes="60vw"
            className="scale-110 object-cover blur-2xl opacity-40"
            onError={() => setImgFailed(true)}
          />
          <Image
            src={`/${filename}`}
            alt={label}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="object-contain p-3 md:p-4"
            onError={() => setImgFailed(true)}
          />
        </>
      )}
    </div>
  );
}

function Corner({
  pos,
  accent,
}: {
  pos: "tl" | "tr" | "bl" | "br";
  accent: string;
}) {
  const map: Record<typeof pos, string> = {
    tl: "top-2 left-2 border-t-2 border-l-2",
    tr: "top-2 right-2 border-t-2 border-r-2",
    bl: "bottom-2 left-2 border-b-2 border-l-2",
    br: "bottom-2 right-2 border-b-2 border-r-2",
  };
  return (
    <div
      className={cn(
        "absolute h-3 w-3 border-current",
        map[pos],
        accent
      )}
    />
  );
}

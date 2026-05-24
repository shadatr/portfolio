"use client";

import React from "react";
import { cn } from "@/utils/cn";

type Props = {
  items: string[];
  className?: string;
  speed?: "slow" | "default";
};

export default function Marquee({
  items,
  className,
  speed = "default",
}: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-ink-line/70 py-4",
        className
      )}
    >
      <div
        className={cn(
          "flex whitespace-nowrap gap-10",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-4xl font-semibold uppercase tracking-tight text-text-mid"
          >
            <span className="text-cyan-neon mr-10">✦</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

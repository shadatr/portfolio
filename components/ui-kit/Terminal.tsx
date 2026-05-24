"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/utils/cn";

type Line =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; color?: "default" | "cyan" | "violet" | "green" | "dim" };

type Props = {
  title?: string;
  lines: Line[];
  className?: string;
  speed?: number; // ms per character
};

const COLOR_MAP = {
  default: "text-text-high",
  cyan: "text-cyan-neon",
  violet: "text-violet-pop",
  green: "text-emerald-400",
  dim: "text-text-dim",
};

export default function Terminal({
  title = "moonshot-monitor",
  lines,
  className,
  speed = 14,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    if (!inView) return;
    if (step >= lines.length) return;
    const target = lines[step].text;
    let i = 0;
    setPartial("");
    const id = setInterval(() => {
      i++;
      setPartial(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => setStep((s) => s + 1), 200);
      }
    }, speed);
    return () => clearInterval(id);
  }, [step, inView, lines, speed]);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-ink-line bg-ink-base/90 backdrop-blur overflow-hidden shadow-card font-mono text-xsm",
        className
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-line bg-ink-surface/60">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-mid/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="text-xxsm text-text-dim tracking-wide ml-2">
          {title} — zsh
        </div>
      </div>

      {/* body */}
      <div className="p-4 md:p-5 min-h-[260px] leading-relaxed">
        {lines.slice(0, step).map((line, i) => (
          <Row key={i} line={line} />
        ))}
        {step < lines.length && (
          <Row line={{ ...lines[step], text: partial }} typing />
        )}
      </div>
    </div>
  );
}

function Row({ line, typing = false }: { line: Line; typing?: boolean }) {
  const isCmd = line.type === "cmd";
  const color =
    line.type === "out" && line.color ? COLOR_MAP[line.color] : COLOR_MAP.default;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      className="flex items-start gap-2"
    >
      {isCmd && <span className="text-cyan-neon select-none">❯</span>}
      <span className={isCmd ? COLOR_MAP.default : color}>
        {line.text}
        {typing && <span className="ml-0.5 inline-block h-4 w-2 bg-cyan-neon animate-pulse align-middle" />}
      </span>
    </motion.div>
  );
}

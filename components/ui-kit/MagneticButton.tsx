"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const innerX = useTransform(sx, (v) => v * 0.35);
  const innerY = useTransform(sy, (v) => v * 0.35);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xsm uppercase tracking-[0.18em] transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-cyan-neon text-ink-base hover:bg-cyan-glow shadow-neon-cyan"
      : "bg-transparent text-text-high border border-ink-line hover:border-cyan-neon hover:text-cyan-neon";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      onClick={onClick}
      className={cn(base, styles, className)}
    >
      <motion.span style={{ x: innerX, y: innerY }} className="flex items-center gap-2">
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}

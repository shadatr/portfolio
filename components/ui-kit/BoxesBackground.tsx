"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const COLORS = [
  "rgba(34, 211, 238, 0.85)",   // cyan-neon
  "rgba(168, 85, 247, 0.85)",   // violet-pop
  "rgba(103, 232, 249, 0.85)",  // cyan-glow
  "rgba(192, 132, 252, 0.85)",  // violet-soft
];

export default function BoxesBackground({
  rows = 80,
  cols = 60,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const rowsArr = new Array(rows).fill(0);
  const colsArr = new Array(cols).fill(0);

  return (
    <div
      style={{
        transform: "translate(-40%, -55%) skewX(-48deg) skewY(14deg) scale(0.65) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute inset-0 z-0 flex w-full h-full -top-1/4 -left-1/4 pointer-events-auto",
        className
      )}
    >
      {rowsArr.map((_, i) => (
        <motion.div
          key={`row${i}`}
          className="w-16 h-8 border-l border-ink-line/50 relative"
        >
          {colsArr.map((_, j) => (
            <motion.div
              key={`col${j}`}
              whileHover={{
                backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
                transition: { duration: 0 },
              }}
              animate={{ transition: { duration: 2 } }}
              className="w-16 h-8 border-r border-t border-ink-line/40 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-ink-line/80 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

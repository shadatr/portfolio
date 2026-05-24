"use client";

import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

type Props = {
  words: string;
  className?: string;
  highlight?: string[]; // words to color cyan
  duration?: number;
};

export default function TextGenerate({
  words,
  className,
  highlight = [],
  duration = 0.45,
}: Props) {
  const [scope, animate] = useAnimate();
  const tokens = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)" },
      { duration, delay: stagger(0.04) }
    );
  }, [animate, duration]);

  return (
    <motion.div
      ref={scope}
      className={cn("font-display leading-snug", className)}
    >
      {tokens.map((word, idx) => {
        const isHighlight = highlight.includes(word.replace(/[.,!?]/g, ""));
        return (
          <motion.span
            key={`${word}-${idx}`}
            className={cn(
              "inline-block opacity-0",
              isHighlight ? "text-cyan-neon" : "text-text-high"
            )}
            style={{ filter: "blur(8px)" }}
          >
            {word}
            {idx < tokens.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

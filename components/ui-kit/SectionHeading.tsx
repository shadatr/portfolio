"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type Props = {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  className?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  accentWord,
  className,
  align = "left",
}: Props) {
  const parts = accentWord ? title.split(accentWord) : null;
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.28em] text-cyan-neon"
        >
          <span className="h-px w-8 bg-cyan-neon/60" />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display font-bold text-text-high text-[44px] md:text-[80px] leading-[0.95] tracking-[-0.02em] [text-wrap:balance]"
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="font-editorial italic font-normal text-gradient-warm">
              {accentWord}
            </span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>
    </div>
  );
}

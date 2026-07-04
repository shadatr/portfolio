"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { BillboardCard, TiltCard } from "./ProjectCard";

/* ----------------------------------------------------------------------------
   Selected work — one billboard, then a matched pair.
   The featured project reads like a magazine cover at full width; the other
   two share a row with identical proportions so nothing fights for rank.
   ---------------------------------------------------------------------------- */

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const },
  },
};

export default function ProjectsBento() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col gap-5 md:gap-6"
    >
      <motion.div variants={item}>
        <BillboardCard project={projects[0]} index={1} />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <motion.div variants={item}>
          <TiltCard project={projects[1]} index={2} ratio="video" />
        </motion.div>
        <motion.div variants={item}>
          <TiltCard project={projects[2]} index={3} ratio="video" />
        </motion.div>
        <motion.div variants={item}>
          <TiltCard project={projects[3]} index={4} ratio="video" />
        </motion.div>
      </div>
    </motion.div>
  );
}

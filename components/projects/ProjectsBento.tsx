"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { TiltCard } from "./ProjectCard";

export default function ProjectsBento() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 md:gap-6"
    >
      <div className="md:col-span-2 md:row-span-2">
        <TiltCard project={projects[0]} ratio="video" />
      </div>
      <div>
        <TiltCard project={projects[1]} ratio="phone" />
      </div>
      <div>
        <TiltCard project={projects[2]} ratio="video" />
      </div>
    </motion.div>
  );
}

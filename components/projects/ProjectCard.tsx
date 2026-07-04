"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/lib/data";
import Placeholder from "../ui-kit/Placeholder";
import { cn } from "@/utils/cn";

/* ============================================================================
   TiltCard — media-led project card.
   Full-bleed cover, ghost index numeral, cursor spotlight, soft 3D tilt, and
   a footer that resolves into a single clear action. All color comes from the
   theme/world tokens, so cards re-skin themselves per world automatically.
   ============================================================================ */

/* ----------------------------------------------------------------------------
   BillboardCard — the featured project as a full-width magazine cover.
   The screenshot IS the card; content sits on a scrim in the lower third.
   ---------------------------------------------------------------------------- */
export function BillboardCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      data-fun-pop
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-2xl border border-ink-line transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[rgb(var(--accent-primary)/0.35)] hover:shadow-lift"
    >
      {/* Stretched link — the whole card opens the case study */}
      <Link
        href={project.href}
        aria-label={`${project.name} — case study`}
        data-cursor="hover"
        className="absolute inset-0 z-10"
      />

      {/* External link — real product/source, sits above the stretched link */}
      {project.external && (
        <a
          href={project.external.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="absolute right-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-text-high/15 bg-ink-base/55 px-3 py-1.5 font-mono text-xxsm uppercase tracking-[0.18em] text-text-mid backdrop-blur-sm transition-colors duration-300 hover:border-[rgb(var(--accent-primary)/0.5)] hover:text-[rgb(var(--accent-glow))]"
        >
          {project.external.label} <span aria-hidden>↗</span>
        </a>
      )}
      {/* Cover fills the whole card */}
      <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/10]">
        <Image
          src={`/${project.slug}/hero.png`}
          alt={project.name}
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
        />

        {/* Scrims — heavy at the bottom where the content sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-base/95 via-ink-base/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-base/50 to-transparent" />

        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent-primary) / 0.1), transparent 65%)",
          }}
        />

        {/* Ghost index */}
        {index !== undefined && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 top-3 font-display text-[80px] font-bold leading-none tracking-tight text-text-high/[0.14] transition-colors duration-500 group-hover:text-[rgb(var(--accent-primary)/0.3)] md:text-[110px]"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}

        {/* Content — lower third */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:flex-row md:items-end md:justify-between md:gap-8 md:p-9">
          <div className="max-w-xl">
            <div className="font-mono text-xxsm uppercase tracking-[0.24em] text-cyan-glow">
              {project.tagline}
              <span className="text-text-mid"> · {project.year}</span>
            </div>
            <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-text-high md:text-6xl">
              {project.name}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-[1.7] text-text-mid line-clamp-2 md:text-[15px]">
              {project.oneLiner}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-end md:gap-4">
            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {project.stack.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-text-high/15 bg-ink-base/50 px-2.5 py-1 font-mono text-xxsm text-text-mid backdrop-blur-sm"
                >
                  {s}
                </span>
              ))}
            </div>
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-text-high/20 bg-ink-base/40 text-text-mid backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-transparent group-hover:bg-cyan-neon group-hover:text-ink-base"
            >
              <span className="text-[16px] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TiltCard({
  project,
  index,
  size = "default",
  ratio = "video",
}: {
  project: Project;
  index?: number;
  size?: "default" | "tall" | "wide";
  ratio?: "video" | "phone" | "square" | "wide";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sry = useSpring(ry, { stiffness: 160, damping: 20 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    // Soft tilt — the card should feel like a heavy object, not a toy.
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 7);
    // Cursor spotlight position.
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div
      ref={ref}
      data-fun-pop
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative h-full rounded-2xl border border-ink-line bg-ink-surface/40 overflow-hidden",
        "transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:border-[rgb(var(--accent-primary)/0.35)] hover:shadow-lift hover:-translate-y-1",
        size === "tall" && "row-span-2",
        size === "wide" && "col-span-2"
      )}
      style={{ perspective: 1200 }}
    >
      {/* Stretched link — the whole card opens the case study */}
      <Link
        href={project.href}
        aria-label={`${project.name} — case study`}
        data-cursor="hover"
        className="absolute inset-0 z-10"
      />

      {/* External link — real product/source, sits above the stretched link */}
      {project.external && (
        <a
          href={project.external.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="absolute right-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full border border-text-high/15 bg-ink-base/55 px-2.5 py-1 font-mono text-xxsm uppercase tracking-[0.16em] text-text-mid backdrop-blur-sm transition-colors duration-300 hover:border-[rgb(var(--accent-primary)/0.5)] hover:text-[rgb(var(--accent-glow))]"
        >
          {project.external.label} <span aria-hidden>↗</span>
        </a>
      )}

      {/* Cursor spotlight — follows the mouse, invisible until hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent-primary) / 0.1), transparent 65%)",
        }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex h-full flex-col"
      >
        {/* ---- Cover ---- */}
        <div
          className="relative overflow-hidden"
          style={{ transform: "translateZ(28px)" }}
        >
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]">
            <Placeholder
              label={project.name}
              filename={`${project.slug}/hero.png`}
              ratio={ratio}
              accent={project.accent}
              scanlines={false}
              className="rounded-none border-0"
            />
          </div>

          {/* Scrim so the overlaid meta stays readable on any cover */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-base/85 to-transparent" />

          {/* Ghost index numeral */}
          {index !== undefined && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-2 font-display text-[64px] font-bold leading-none tracking-tight text-text-high/[0.14] transition-colors duration-500 group-hover:text-[rgb(var(--accent-primary)/0.3)]"
            >
              {String(index).padStart(2, "0")}
            </span>
          )}

          {/* Tagline + year — one quiet line on the scrim */}
          <span className="absolute bottom-3 left-4 font-mono text-xxsm uppercase tracking-[0.24em] text-cyan-glow">
            {project.tagline}
            <span className="text-text-dim"> · {project.year}</span>
          </span>
        </div>

        {/* ---- Body ---- */}
        <div
          className="flex grow flex-col gap-4 p-6 md:p-7"
          style={{ transform: "translateZ(18px)" }}
        >
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-text-high md:text-3xl">
              {project.name}
            </h3>
            {/* Accent underline draws itself on hover */}
            <span
              aria-hidden
              className="mt-2 block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[rgb(var(--accent-primary)/0.7)] to-transparent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100"
            />
          </div>

          <p className="max-w-md text-sm leading-[1.75] text-text-mid line-clamp-2">
            {project.oneLiner}
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink-line/80 bg-ink-base/40 px-2.5 py-1 font-mono text-xxsm text-text-mid transition-colors duration-500 group-hover:border-ink-line"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* The single action — a dot that becomes a filled arrow button */}
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line text-text-mid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-transparent group-hover:bg-cyan-neon group-hover:text-ink-base"
            >
              <span className="text-[15px] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

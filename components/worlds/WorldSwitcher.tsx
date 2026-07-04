"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useVariants,
  WORLD_VARIANTS,
  WorldVariant,
} from "../variants/VariantProvider";

/* ============================================================================
   WorldSwitcher — the world dock. A floating pill at bottom-center that lets
   visitors jump between the five worlds. Switching plays a short full-screen
   veil that announces the destination while the palette + ambient layer swap
   underneath it.
   ============================================================================ */

export default function WorldSwitcher() {
  const { world, setWorld } = useVariants();
  const [entering, setEntering] = useState<WorldVariant | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const travel = (w: WorldVariant) => {
    if (w === world || entering) return;
    setEntering(w);
    // Swap the world at the veil's peak so the reveal lands on the new one.
    timers.current.push(setTimeout(() => setWorld(w), 380));
    timers.current.push(setTimeout(() => setEntering(null), 1050));
  };

  const target = WORLD_VARIANTS.find((v) => v.id === entering);

  return (
    <>
      {/* Transition veil */}
      <AnimatePresence>
        {entering && (
          <motion.div
            key="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgb(var(--ink-base))]"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
              transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-2xl text-[rgb(var(--accent-glow))]">
                {target?.glyph}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.42em] text-[rgb(var(--text-mid))]">
                entering {target?.label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="glass-strong flex items-center gap-0.5 rounded-full p-1.5">
          <span className="hidden select-none pl-2.5 pr-1.5 font-mono text-[9px] uppercase tracking-[0.26em] text-[rgb(var(--text-dim))] sm:block">
            worlds
          </span>
          {WORLD_VARIANTS.map((w) => {
            const active = w.id === world;
            return (
              <button
                key={w.id}
                onClick={() => travel(w.id)}
                aria-label={`Enter ${w.label} world`}
                aria-pressed={active}
                title={`${w.label} — ${w.hint}`}
                className={`group relative flex h-9 items-center gap-1.5 rounded-full px-2.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:px-3 ${
                  active
                    ? "bg-[rgb(var(--accent-primary)/0.14)] ring-1 ring-[rgb(var(--accent-primary)/0.35)]"
                    : "hover:bg-[rgb(var(--text-high)/0.05)]"
                }`}
              >
                <span
                  className={`text-[13px] leading-none transition-colors duration-500 ${
                    active
                      ? "text-[rgb(var(--accent-glow))]"
                      : "text-[rgb(var(--text-dim))] group-hover:text-[rgb(var(--text-mid))]"
                  }`}
                >
                  {w.glyph}
                </span>
                <span
                  className={`hidden font-mono text-[10px] uppercase leading-none tracking-[0.18em] transition-colors duration-500 md:block ${
                    active
                      ? "text-[rgb(var(--text-high))]"
                      : "text-[rgb(var(--text-dim))] group-hover:text-[rgb(var(--text-mid))]"
                  }`}
                >
                  {w.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

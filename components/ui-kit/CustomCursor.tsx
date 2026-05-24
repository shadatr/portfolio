"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let rx = 0,
      ry = 0,
      dx = 0,
      dy = 0;
    let raf = 0;

    function onMove(e: MouseEvent) {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      }
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement;
      if (!t) return;
      const isInteractive =
        t.closest("a, button, [data-cursor='hover'], input, textarea, select");
      if (ring.current) {
        if (isInteractive) {
          ring.current.classList.add("scale-150", "bg-cyan-neon/15");
        } else {
          ring.current.classList.remove("scale-150", "bg-cyan-neon/15");
        }
      }
    }

    function loop() {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-cyan-neon"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 rounded-full border border-cyan-neon/60 transition-[transform,background-color] duration-200 ease-out"
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
}

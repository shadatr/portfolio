"use client";

import React, { useEffect, useRef } from "react";
import { useVariants } from "../variants/VariantProvider";

/* ============================================================================
   WorldLayer — the ambient, full-viewport atmosphere behind every scroll
   world. Fixed, pointer-transparent, painted below the content (the content's
   ink-base panels become translucent veils in world mode, so this glows
   through). ShadaOS renders its own desktop and needs no ambient layer.
   ============================================================================ */

function usePrefersReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return ref;
}

/* ------------------------------- SPACE ------------------------------------
   A starfield you travel through: stars parallax with scroll and cursor, a
   ringed planet drifts past as you descend, and shooting stars streak by. */
function SpaceLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Star = { x: number; y: number; z: number; tw: number };
    let stars: Star[] = [];
    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;
    let mx = 0;
    let my = 0;
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null =
      null;
    let nextShot = 240;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 240 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: 0.2 + Math.random() * 0.8,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const onMouse = (e: PointerEvent) => {
      mx = e.clientX / W - 0.5;
      my = e.clientY / H - 0.5;
    };

    const drawPlanet = (cx: number, cy: number, R: number, hueA: string, hueB: string) => {
      const g = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, R * 0.15, cx, cy, R);
      g.addColorStop(0, hueA);
      g.addColorStop(1, hueB);
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.32);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.7, R * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(157,180,255,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    const frame = () => {
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      for (const s of stars) {
        // Scroll moves the field upward — you fly downward through space.
        const px = (((s.x - mx * 30 * s.z) % W) + W) % W;
        const py = (((s.y - scroll * 0.18 * s.z - my * 24 * s.z) % H) + H) % H;
        const a = (0.3 + 0.7 * Math.abs(Math.sin(t * 1.2 + s.tw))) * s.z;
        ctx.fillStyle = `rgba(205,216,255,${a.toFixed(2)})`;
        const size = s.z * 1.8;
        ctx.fillRect(px, py, size, size);
      }

      // Two planets pinned to scroll positions — they drift past as you travel.
      const doc = Math.max(document.documentElement.scrollHeight - H, 1);
      const p = scroll / doc;
      drawPlanet(
        W * 0.82 - mx * 18,
        H * (1.25 - p * 1.6),
        Math.min(W, H) * 0.13,
        "#8FA6E8",
        "#141B4D"
      );
      drawPlanet(
        W * 0.12 - mx * 10,
        H * (2.4 - p * 2.8),
        Math.min(W, H) * 0.07,
        "#C9A2E8",
        "#2A1440"
      );

      // Occasional shooting star.
      if (!shooting && --nextShot <= 0) {
        shooting = {
          x: Math.random() * W * 0.7,
          y: Math.random() * H * 0.35,
          vx: 7 + Math.random() * 5,
          vy: 3.5 + Math.random() * 2.5,
          life: 1,
        };
        nextShot = 300 + Math.random() * 500;
      }
      if (shooting) {
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.02;
        const grad = ctx.createLinearGradient(
          shooting.x,
          shooting.y,
          shooting.x - shooting.vx * 9,
          shooting.y - shooting.vy * 9
        );
        grad.addColorStop(0, `rgba(220,230,255,${(shooting.life * 0.9).toFixed(2)})`);
        grad.addColorStop(1, "rgba(220,230,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.vx * 9, shooting.y - shooting.vy * 9);
        ctx.stroke();
        if (shooting.life <= 0) shooting = null;
      }

      if (!reduced.current) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMouse);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}

/* ------------------------------- LIQUID -----------------------------------
   Gooey coral metaballs on molten near-black. The blur+contrast trick makes
   blobs merge; one drop lazily follows the cursor and fuses with the rest. */
function LiquidLayer() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const drop = dropRef.current;
    if (!drop) return;
    let raf = 0;
    let tx = 0.6;
    let ty = 0.35;
    let x = tx;
    let y = ty;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };
    const lerp = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      drop.style.left = `${x * 100}%`;
      drop.style.top = `${y * 100}%`;
      if (!reduced.current) raf = requestAnimationFrame(lerp);
    };
    lerp();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div
      ref={fieldRef}
      aria-hidden
      className="h-full w-full"
      // Solid ground is required for the goo (contrast) trick to threshold on.
      style={{
        background: "rgb(18 15 12)",
        filter: "blur(26px) contrast(18)",
      }}
    >
      <div className="wl-goo-blob" style={{ width: "34vmax", top: "8%", left: "6%", animationDuration: "17s" }} />
      <div className="wl-goo-blob" style={{ width: "26vmax", top: "48%", left: "30%", animationDuration: "23s", animationDirection: "alternate-reverse" }} />
      <div className="wl-goo-blob" style={{ width: "20vmax", top: "18%", left: "58%", animationDuration: "19s" }} />
      <div className="wl-goo-blob" style={{ width: "15vmax", top: "62%", left: "70%", animationDuration: "27s", animationDirection: "alternate-reverse" }} />
      <div
        ref={dropRef}
        className="wl-goo-blob"
        style={{ width: "11vmax", top: "35%", left: "60%", animation: "none", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

/* ------------------------------ DEEP DIVE ---------------------------------
   Scrolling is diving. The water column darkens with depth, sun rays fade,
   bubbles rise past you, jellyfish pulse by — and a fixed depth meter tracks
   where in the story you are. */
const DEPTH_STOPS: [number, string][] = [
  [0, "#0E4E74"],
  [0.25, "#0A3358"],
  [0.55, "#062040"],
  [0.8, "#04122B"],
  [1, "#02081A"],
];

function lerpColor(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

function depthColor(p: number, shift = 0) {
  const d = Math.min(Math.max(p + shift, 0), 1);
  for (let i = 1; i < DEPTH_STOPS.length; i++) {
    if (d <= DEPTH_STOPS[i][0]) {
      const [p0, c0] = DEPTH_STOPS[i - 1];
      const [p1, c1] = DEPTH_STOPS[i];
      return lerpColor(c0, c1, (d - p0) / (p1 - p0));
    }
  }
  return DEPTH_STOPS[DEPTH_STOPS.length - 1][1];
}

function DeepLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Bubble = { x: number; y: number; r: number; v: number; w: number };
    let bubbles: Bubble[] = [];
    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bubbles = Array.from({ length: 34 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1 + Math.random() * 3.4,
        v: 0.3 + Math.random() * 0.8,
        w: Math.random() * Math.PI * 2,
      }));
    };

    const jelly = (cx: number, cy: number, s: number, hue: number, phase: number) => {
      const pulse = 1 + Math.sin(t * 1.8 + phase) * 0.09;
      ctx.save();
      ctx.translate(cx, cy + Math.sin(t * 0.7 + phase) * 12);
      ctx.scale(pulse, 1);
      const g = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s);
      g.addColorStop(0, `hsla(${hue}, 90%, 76%, 0.75)`);
      g.addColorStop(1, `hsla(${hue}, 90%, 58%, 0.06)`);
      ctx.beginPath();
      ctx.arc(0, 0, s, Math.PI, 0);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = `hsla(${hue}, 90%, 80%, 0.35)`;
      ctx.lineWidth = 1.1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * s * 0.3, 2);
        ctx.quadraticCurveTo(
          i * s * 0.3 + Math.sin(t * 2.2 + i + phase) * 7,
          s * 0.9,
          i * s * 0.28 + Math.sin(t * 1.7 + i + phase) * 12,
          s * 1.6
        );
        ctx.stroke();
      }
      ctx.restore();
    };

    const frame = () => {
      const doc = Math.max(document.documentElement.scrollHeight - H, 1);
      const p = Math.min(window.scrollY / doc, 1);
      t += 0.016;

      // Water column — darkens as you dive.
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, depthColor(p, -0.08));
      g.addColorStop(1, depthColor(p, 0.14));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Sun rays — only near the surface, gone by mid-dive.
      const rayAlpha = Math.max(0, 0.16 - p * 0.4);
      if (rayAlpha > 0.003) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 3; i++) {
          const x0 = W * (0.25 + i * 0.22) + Math.sin(t * 0.4 + i * 2) * 30;
          const grad = ctx.createLinearGradient(x0, 0, x0 - W * 0.12, H * 0.7);
          grad.addColorStop(0, `rgba(190,235,255,${rayAlpha.toFixed(3)})`);
          grad.addColorStop(1, "rgba(190,235,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x0 - 26, 0);
          ctx.lineTo(x0 + 26, 0);
          ctx.lineTo(x0 - W * 0.1 + 60, H * 0.72);
          ctx.lineTo(x0 - W * 0.1 - 60, H * 0.72);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // Bubbles always rise past the diver.
      ctx.fillStyle = "rgba(200,236,255,0.4)";
      for (const b of bubbles) {
        b.y -= b.v;
        b.w += 0.03;
        if (b.y < -8) {
          b.y = H + 8;
          b.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(b.x + Math.sin(b.w) * 6, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bioluminescence grows with depth.
      const glow = 0.45 + p * 0.55;
      ctx.save();
      ctx.globalAlpha = glow;
      jelly(W * 0.22, H * (0.55 - Math.sin(t * 0.2) * 0.04), 30, 190, 0);
      jelly(W * 0.68, H * 0.35, 20, 285, 2.2);
      jelly(W * 0.84, H * 0.68, 14, 320, 4.1);
      ctx.restore();

      // Depth meter readout.
      if (meterRef.current) {
        meterRef.current.textContent = `−${Math.round(p * 140)}m`;
      }

      if (!reduced.current) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
      {/* Depth meter — fixed at the right edge, above content, below nav. */}
      <div className="pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-1 md:flex">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[rgb(var(--accent-primary)/0.5)] to-transparent" />
        <div
          ref={meterRef}
          className="font-mono text-[11px] tracking-[0.2em] text-[rgb(var(--accent-glow))]"
        >
          −0m
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-[rgb(var(--text-dim))]">
          depth
        </div>
      </div>
    </>
  );
}

/* ------------------------------- TOY BOX ----------------------------------
   A dark plum playroom: big soft clay blobs drift and morph slowly, lit like
   toys under a nightlight. Pure CSS animation — GPU-cheap. */
function ToyboxLayer() {
  return (
    <div aria-hidden className="h-full w-full overflow-hidden">
      <div className="wl-toy" style={{ width: "36vmax", top: "-8%", left: "-6%", background: "radial-gradient(circle at 34% 30%, rgba(255,143,163,0.5), rgba(255,143,163,0.05) 70%)", animationDuration: "21s" }} />
      <div className="wl-toy" style={{ width: "30vmax", top: "42%", right: "-8%", background: "radial-gradient(circle at 36% 32%, rgba(155,140,232,0.45), rgba(155,140,232,0.04) 70%)", animationDuration: "26s", animationDirection: "alternate-reverse" }} />
      <div className="wl-toy" style={{ width: "22vmax", bottom: "-10%", left: "28%", background: "radial-gradient(circle at 35% 30%, rgba(127,200,248,0.34), rgba(127,200,248,0.04) 70%)", animationDuration: "18s" }} />
      <div className="wl-toy" style={{ width: "14vmax", top: "16%", left: "56%", background: "radial-gradient(circle at 36% 32%, rgba(255,196,107,0.3), rgba(255,196,107,0.03) 70%)", animationDuration: "24s", animationDirection: "alternate-reverse" }} />
    </div>
  );
}

/* ------------------------------ dispatcher -------------------------------- */
export default function WorldLayer() {
  const { world } = useVariants();
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {world === "space" && <SpaceLayer />}
      {world === "liquid" && <LiquidLayer />}
      {world === "deep" && <DeepLayer />}
      {world === "toybox" && <ToyboxLayer />}
    </div>
  );
}

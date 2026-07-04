"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

type GeometryKind = "knot" | "icosa" | "torus";

type Capability = {
  id: string;
  label: string;
  number: string;
  tagline: string;
  italicTail: string;
  detail: string;
  geometry: GeometryKind;
  rotationSpeed: number;
  distort: number;
  stack: string[];
};

const CAPABILITIES: Capability[] = [
  {
    id: "engineering",
    label: "Engineering",
    number: "01",
    tagline: "Real systems,",
    italicTail: "real users.",
    detail:
      "Five production systems shipping today. Real-time data paths in Go, AI orchestration in TypeScript, on-chain watchers in Rust. The seams are mine.",
    geometry: "knot",
    rotationSpeed: 0.24,
    distort: 0.34,
    stack: ["TypeScript", "Rust", "Go", "PostgreSQL", "Solana"],
  },
  {
    id: "design",
    label: "Design",
    number: "02",
    tagline: "The screen is",
    italicTail: "the product.",
    detail:
      "Spacing, type, motion, restraint. I design the screens I ship, the type that anchors them, and the micro-interactions that make them feel honest.",
    geometry: "icosa",
    rotationSpeed: 0.12,
    distort: 0.22,
    stack: ["Figma", "Framer Motion", "Tailwind", "Three.js"],
  },
  {
    id: "product",
    label: "Product",
    number: "03",
    tagline: "Saying no",
    italicTail: "is a feature.",
    detail:
      "What ships and what doesn't. The roadmap, the cuts, the moment to launch versus the moment to polish. Three solo apps in the wild keep this honest.",
    geometry: "torus",
    rotationSpeed: 0.18,
    distort: 0.46,
    stack: ["Roadmaps", "Launches", "Iteration", "Restraint"],
  },
];

const AUTO_INTERVAL = 5600;
const SHAPE_SPACING = 4.6;

function ShapeGeometry({ kind }: { kind: GeometryKind }) {
  if (kind === "knot") {
    return <torusKnotGeometry args={[1, 0.34, 280, 36]} />;
  }
  if (kind === "icosa") {
    return <icosahedronGeometry args={[1.3, 1]} />;
  }
  return <torusGeometry args={[1.05, 0.42, 32, 96]} />;
}

function CapabilityShape({
  cap,
  position,
  active,
}: {
  cap: Capability;
  position: [number, number, number];
  active: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const targetScale = active ? 1.25 : 0.5;
  const targetOpacity = active ? 1 : 0.18;
  const scaleRef = useRef(targetScale);
  const opacityRef = useRef(targetOpacity);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * cap.rotationSpeed * 0.7;
    ref.current.rotation.y += dt * cap.rotationSpeed;

    scaleRef.current += (targetScale - scaleRef.current) * Math.min(1, dt * 4);
    ref.current.scale.setScalar(scaleRef.current);

    const mat = ref.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      opacityRef.current += (targetOpacity - opacityRef.current) * Math.min(1, dt * 4);
      mat.opacity = opacityRef.current;
    }
  });

  return (
    <Float
      speed={active ? 1.1 : 0.6}
      rotationIntensity={active ? 0.5 : 0.2}
      floatIntensity={active ? 1 : 0.4}
      position={position}
    >
      <mesh ref={ref}>
        <ShapeGeometry kind={cap.geometry} />
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={active ? 0.1 : 0.04}
          metalness={0.85}
          roughness={0.18}
          distort={cap.distort}
          speed={1.5}
          transparent
          opacity={targetOpacity}
        />
      </mesh>
    </Float>
  );
}

function Carousel({ activeIndex }: { activeIndex: number }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0.05, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const carouselTargetX = -activeIndex * SHAPE_SPACING;
  const carouselX = useRef(0);

  useFrame((_, dt) => {
    if (!group.current) return;

    carouselX.current +=
      (carouselTargetX - carouselX.current) * Math.min(1, dt * 3.2);
    group.current.position.x = carouselX.current;

    if (!dragging.current) {
      velocity.current.x *= 0.94;
      velocity.current.y *= 0.94;
      target.current.x += velocity.current.x;
      target.current.y += velocity.current.y;
    }
    group.current.rotation.x +=
      (target.current.x - group.current.rotation.x) * 0.08;
    group.current.rotation.y +=
      (target.current.y - group.current.rotation.y) * 0.08;
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    target.current.y += dx * 0.0055;
    target.current.x += dy * 0.0055;
    velocity.current = { x: dy * 0.0006, y: dx * 0.0006 };
  };
  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <mesh>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.BackSide} />
      </mesh>
      {CAPABILITIES.map((cap, i) => (
        <CapabilityShape
          key={cap.id}
          cap={cap}
          position={[i * SHAPE_SPACING, 0, 0]}
          active={i === activeIndex}
        />
      ))}
    </group>
  );
}

export default function Capabilities3D() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cap = CAPABILITIES[active];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % CAPABILITIES.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, active]);

  return (
    <section
      id="capabilities"
      className="relative py-36 md:py-56 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
          05 / What I do
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 font-display font-bold text-text-high leading-[0.95] tracking-[-0.02em] text-[40px] md:text-[72px] max-w-3xl"
        >
          Three threads,{" "}
          <span className="font-editorial italic font-normal text-gradient-warm">
            one knot.
          </span>
        </motion.h2>

        {/* Text on the left, 3D on the right. No card, no bezel. */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* Left: capability text + tabs */}
          <div>
            <div className="relative min-h-[300px] md:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="flex items-baseline gap-4 font-mono text-xxsm uppercase tracking-[0.3em] text-text-mid">
                    <span className="font-display italic text-cyan-neon text-2xl leading-none">
                      {cap.number}
                    </span>
                    <span className="hairline flex-1 max-w-[100px]" />
                    <span>{cap.label}</span>
                  </div>

                  <h3 className="mt-5 font-display font-bold text-text-high text-3xl md:text-5xl leading-[1.05] tracking-tight">
                    {cap.tagline}{" "}
                    <span className="font-editorial italic font-normal text-cyan-glow">
                      {cap.italicTail}
                    </span>
                  </h3>

                  <p className="mt-5 max-w-xl text-md text-text-mid leading-relaxed">
                    {cap.detail}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim">
                    {cap.stack.map((s) => (
                      <span key={s} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-text-dim/60" />
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-2 flex-wrap">
              {CAPABILITIES.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActive(i)}
                    className={`group relative h-9 px-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2 ${
                      isActive
                        ? "bg-text-high/[0.06] ring-1 ring-text-high/15"
                        : "hover:bg-text-high/[0.03]"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span
                      className={`h-1 rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-6 bg-cyan-neon"
                          : "w-1 bg-text-dim/70 group-hover:bg-text-mid"
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
                        isActive ? "text-text-high" : "text-text-mid"
                      }`}
                    >
                      {c.label}
                    </span>
                    {isActive && !paused && (
                      <motion.span
                        key={`progress-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: AUTO_INTERVAL / 1000,
                          ease: "linear",
                        }}
                        className="absolute -bottom-1 left-3 right-3 h-px bg-cyan-neon/60 origin-left"
                      />
                    )}
                  </button>
                );
              })}
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim hidden md:inline">
                {paused ? "paused" : "auto-cycling"}
              </span>
            </div>
          </div>

          {/* Right: 3D — no frame, no border, just the canvas. */}
          <div className="relative aspect-square w-full max-w-[600px] mx-auto">
            <Canvas
              camera={{ position: [0, 0, 7.2], fov: 45 }}
              dpr={[1, 2]}
              gl={{ alpha: true, antialias: true }}
            >
              <AdaptiveDpr pixelated />
              <ambientLight intensity={0.55} />
              <pointLight position={[5, 5, 5]} intensity={1.05} color="#ffffff" />
              <pointLight position={[-5, -3, -2]} intensity={0.55} color="#ffffff" />
              <Suspense fallback={null}>
                <Carousel activeIndex={active} />
                <Environment preset="night" />
              </Suspense>
            </Canvas>

            {/* Tiny telemetry caption — sits below the canvas, no frame */}
            <div className="absolute -bottom-2 inset-x-0 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-text-dim pointer-events-none">
              <span>
                form&nbsp;
                <span className="text-text-mid">
                  {cap.geometry === "knot" && "torusKnot"}
                  {cap.geometry === "icosa" && "icosahedron"}
                  {cap.geometry === "torus" && "torus"}
                </span>
              </span>
              <span className="flex items-center gap-2">
                drag to spin
                <span className="h-1 w-1 rounded-full bg-cyan-neon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

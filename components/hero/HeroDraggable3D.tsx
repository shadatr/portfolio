"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import MagneticButton from "../ui-kit/MagneticButton";

function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.15;
    ref.current.rotation.y += dt * 0.2;
  });

  return (
    <Float speed={1.3} rotationIntensity={1} floatIntensity={1.4}>
      <mesh ref={ref} scale={1.05}>
        <torusKnotGeometry args={[1, 0.32, 240, 36]} />
        <MeshDistortMaterial
          color="#22D3EE"
          emissive="#A855F7"
          emissiveIntensity={0.45}
          metalness={0.75}
          roughness={0.12}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function DraggableGroup() {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!ref.current) return;
    if (!dragging.current) {
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      target.current.y += 0.002 + velocity.current.x;
      target.current.x += velocity.current.y;
    }
    ref.current.rotation.x +=
      (target.current.x - ref.current.rotation.x) * 0.1;
    ref.current.rotation.y +=
      (target.current.y - ref.current.rotation.y) * 0.1;
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
    target.current.y += dx * 0.005;
    target.current.x += dy * 0.005;
    velocity.current = { x: dy * 0.0005, y: dx * 0.0005 };
  };
  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <group
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Invisible drag-catcher so the whole canvas spins the knot */}
      <mesh>
        <sphereGeometry args={[6, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.BackSide} />
      </mesh>
      <Knot />
    </group>
  );
}

export default function HeroDraggable3D() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-base isolate"
    >
      {/* Ambient */}
      <div className="absolute inset-0 bg-pattern" />
      <div className="absolute inset-0 aurora opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.10),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.12),transparent_55%)] pointer-events-none" />

      {/* Full-viewport 3D canvas — drag anywhere to spin */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.45} />
          <pointLight position={[5, 5, 5]} intensity={1.3} color="#22D3EE" />
          <pointLight position={[-5, -3, -2]} intensity={0.9} color="#A855F7" />
          <Suspense fallback={null}>
            <DraggableGroup />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Mute layers so type reads above the knot */}
      <div className="pointer-events-none absolute inset-0 bg-ink-base/30" />
      <div className="pointer-events-none absolute inset-0 center-vignette-soft" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-base/30 via-transparent to-ink-base/80" />

      {/* Crosshairs */}
      <span className="crosshair top-24 left-10" />
      <span className="crosshair top-24 right-10" />
      <span className="crosshair bottom-10 left-10" />
      <span className="crosshair bottom-10 right-10" />

      {/* Content — pointer-events-none on wrapper so drag passes through */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-36 md:pt-48 pb-24 min-h-[100svh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
          Hi, I&apos;m Shada · software engineer · Istanbul
        </motion.div>

        <h1 className="font-display font-bold text-text-high leading-[0.86] tracking-[-0.03em] text-[72px] md:text-[148px] xl:text-[180px]">
          <SplitLine delay={0}>I ship</SplitLine>
          <SplitLine delay={0.08}>software</SplitLine>
          <SplitLine delay={0.16}>
            <span className="font-editorial italic font-normal text-gradient-warm">
              that ships
            </span>
            <span className="text-cyan-neon">.</span>
          </SplitLine>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-md md:text-lg text-text-mid leading-relaxed max-w-2xl"
          >
            <span className="text-text-high">Software engineer</span> who
            ships end-to-end. Three solo apps in production — an AI study
            companion, a gut-health tracker, a Solana watcher — plus a
            real-time RegTech system at Bull Teknoloji by day. I write Rust at
            3am, <span className="text-text-high">design my own screens</span>,
            and answer my own emails.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="pointer-events-auto flex flex-wrap gap-3 justify-start md:justify-end"
          >
            <MagneticButton href="#work">
              See the work <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Say hi
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xxsm uppercase tracking-[0.3em] text-text-dim flex items-center gap-3 pointer-events-none"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-neon animate-pulse" />
        drag the scene · scroll for more
      </motion.div>
    </section>
  );
}

function SplitLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

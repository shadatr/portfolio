"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { motion } from "framer-motion";
import MagneticButton from "../ui-kit/MagneticButton";

const SHOTS = [
  "/media1.png",
  "/media2.png",
  "/tech1.png",
  "/tech2.png",
  "/bookItNow1.png",
  "/bookItNow2.png",
  "/solmint1.png",
  "/solana.png",
  "/ums1.png",
  "/media3.png",
];

function Card({
  src,
  position,
  rotation,
}: {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const tex = useLoader(TextureLoader, src);
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Each card floats on its own phase
    ref.current.position.y =
      initialY + Math.sin(t * 0.6 + position[0] * 0.4) * 0.08;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[2.0, 1.25]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0.75}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!group.current) return;
    if (!dragging.current) {
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      // gentle ambient spin while idle
      target.current.y += 0.0025 + velocity.current.x;
      target.current.x += velocity.current.y * 0.5;
    }
    // soften pitch
    target.current.x = Math.max(-0.5, Math.min(0.5, target.current.x));
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
    target.current.y += dx * 0.005;
    target.current.x += dy * 0.0025;
    velocity.current = { x: dy * 0.0003, y: dx * 0.0006 };
  };
  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  // Arrange cards in a tilted ring + a few outer satellites for depth
  const cards = useMemo(() => {
    const ring: {
      src: string;
      position: [number, number, number];
      rotation: [number, number, number];
    }[] = [];
    const radius = 3.6;
    const inner = SHOTS.slice(0, 7);
    inner.forEach((src, i) => {
      const angle = (i / inner.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i % 2 === 0 ? 0.4 : -0.4) + Math.sin(i) * 0.3;
      // Face the center
      const rotY = -angle + Math.PI / 2;
      ring.push({
        src,
        position: [x, y, z],
        rotation: [Math.sin(i) * 0.08, rotY, Math.cos(i) * 0.06],
      });
    });
    // Outer satellites
    const outer = SHOTS.slice(7);
    outer.forEach((src, i) => {
      const angle = ((i + 0.5) / outer.length) * Math.PI * 2;
      const r = 5.6;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (i % 2 === 0 ? 1.4 : -1.2) + Math.cos(i) * 0.3;
      const rotY = -angle + Math.PI / 2;
      ring.push({
        src,
        position: [x, y, z],
        rotation: [Math.sin(i + 1) * 0.1, rotY, Math.cos(i + 1) * 0.08],
      });
    });
    return ring;
  }, []);

  return (
    <group
      ref={group}
      rotation={[-0.15, 0, 0]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Invisible drag-catcher so empty space also rotates the scene */}
      <mesh>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.BackSide} />
      </mesh>
      {cards.map((c, i) => (
        <Card key={i} {...c} />
      ))}
    </group>
  );
}

export default function HeroCoverflow3D() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-base isolate"
    >
      {/* Ambient */}
      <div className="absolute inset-0 bg-grid-cyan [background-size:48px_48px] opacity-[0.10]" />
      <div className="absolute inset-0 aurora opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.10),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.10),transparent_55%)] pointer-events-none" />

      {/* 3D canvas — full viewport, drag anywhere */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.6, 7.2], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 4, 5]} intensity={1.0} color="#22D3EE" />
          <pointLight position={[-5, -3, -2]} intensity={0.6} color="#A855F7" />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Mute layers so type leads */}
      <div className="pointer-events-none absolute inset-0 bg-ink-base/35" />
      <div className="pointer-events-none absolute inset-0 center-vignette" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-base/30 via-transparent to-ink-base/80" />

      {/* Crosshairs */}
      <span className="crosshair top-24 left-10" />
      <span className="crosshair top-24 right-10" />
      <span className="crosshair bottom-10 left-10" />
      <span className="crosshair bottom-10 right-10" />

      {/* Content */}
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

      {/* Drag hint, anchored bottom-center */}
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

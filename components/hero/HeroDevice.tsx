"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { HeroFrame, HeroCopy } from "./HeroShell";

function Laptop() {
  const lid = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!lid.current) return;
    const t = state.clock.elapsedTime;
    lid.current.rotation.y = Math.sin(t * 0.4) * 0.18;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={lid} position={[-1.1, -0.2, 0]} rotation={[0, 0.3, 0]}>
        {/* base */}
        <RoundedBox args={[3.2, 0.12, 2.1]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.25} />
        </RoundedBox>
        {/* lid */}
        <group position={[0, 0.08, -1.04]} rotation={[-Math.PI / 3.2, 0, 0]}>
          <RoundedBox args={[3.2, 2.0, 0.1]} radius={0.04} smoothness={4} position={[0, 1, 0]}>
            <meshStandardMaterial color="#0B1224" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          {/* screen glow */}
          <mesh position={[0, 1, 0.06]}>
            <planeGeometry args={[2.95, 1.78]} />
            <meshStandardMaterial
              emissive="#22D3EE"
              emissiveIntensity={1.2}
              color="#06080F"
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Phone() {
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.9}>
      <group position={[1.6, 0.2, 0.4]} rotation={[0.1, -0.4, 0.1]}>
        <RoundedBox args={[0.9, 1.85, 0.1]} radius={0.12} smoothness={6}>
          <meshStandardMaterial color="#0F172A" metalness={0.85} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.78, 1.7]} />
          <meshStandardMaterial
            emissive="#A855F7"
            emissiveIntensity={1.1}
            color="#06080F"
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroDevice() {
  return (
    <HeroFrame>
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-40 pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <HeroCopy />
        <div className="relative h-[420px] md:h-[560px] w-full">
          <div className="absolute inset-0 rounded-3xl glass" />
          <Canvas camera={{ position: [0, 0.4, 5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.35} />
            <pointLight position={[3, 4, 4]} intensity={1.3} color="#22D3EE" />
            <pointLight position={[-4, -1, 2]} intensity={0.9} color="#A855F7" />
            <Suspense fallback={null}>
              <Laptop />
              <Phone />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xxsm text-text-mid">
            <span>● desktop · mobile</span>
            <span className="text-cyan-neon">live preview</span>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

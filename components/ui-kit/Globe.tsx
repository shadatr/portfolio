"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Convert lat/lon to a 3D point on a unit sphere
function latLonToVec3(lat: number, lon: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const ISTANBUL = { lat: 41.0082, lon: 28.9784 };
const PEERS = [
  { lat: 52.52, lon: 13.405 }, // Berlin
  { lat: 40.7128, lon: -74.006 }, // New York
  { lat: 1.3521, lon: 103.8198 }, // Singapore
  { lat: 51.5074, lon: -0.1278 }, // London
  { lat: 35.6762, lon: 139.6503 }, // Tokyo
  { lat: 37.7749, lon: -122.4194 }, // San Francisco
];

function Wireframe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08;
  });

  // Build dot grid roughly evenly spaced on a sphere (Fibonacci sphere)
  const dots = useMemo(() => {
    const N = 560;
    const pts: { pos: THREE.Vector3; size: number }[] = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = ga * i;
      const x = Math.cos(t) * r;
      const z = Math.sin(t) * r;
      pts.push({ pos: new THREE.Vector3(x, y, z).multiplyScalar(1.5), size: 0.018 });
    }
    return pts;
  }, []);

  const istanbul = useMemo(() => latLonToVec3(ISTANBUL.lat, ISTANBUL.lon, 1.5), []);
  const peers = useMemo(
    () => PEERS.map((p) => latLonToVec3(p.lat, p.lon, 1.5)),
    []
  );

  // Build arc geometries from Istanbul to each peer
  const arcs = useMemo(() => {
    return peers.map((end) => {
      const start = istanbul.clone();
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(1.5 + distance * 0.35);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      return geom;
    });
  }, [istanbul, peers]);

  return (
    <group ref={ref}>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.49, 48, 48]} />
        <meshBasicMaterial color="#0a1a2a" transparent opacity={0.85} />
      </mesh>

      {/* Dot points */}
      {dots.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[d.size, 6, 6]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.65} />
        </mesh>
      ))}

      {/* Istanbul pulse */}
      <mesh position={istanbul}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FBBF24" />
      </mesh>
      <mesh position={istanbul}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.25} />
      </mesh>

      {/* Peer city dots */}
      {peers.map((p, i) => (
        <mesh key={`peer-${i}`} position={p}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#A855F7" />
        </mesh>
      ))}

      {/* Arcs */}
      {arcs.map((geom, i) => (
        <line key={`arc-${i}`}>
          <primitive object={geom} attach="geometry" />
          <lineBasicMaterial color="#67E8F9" transparent opacity={0.55} />
        </line>
      ))}
    </group>
  );
}

export default function Globe({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.4, 4.6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#22D3EE" />
        <Suspense fallback={null}>
          <Wireframe />
        </Suspense>
      </Canvas>
    </div>
  );
}

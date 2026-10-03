"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

type CanvasProps = React.ComponentProps<typeof Canvas>;

// Probe once per page load — browsers with hardware acceleration off (or
// blocklisted GPUs) can't create a WebGL context, and three throws on mount.
let webglSupport: boolean | null = null;
function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    webglSupport = !!gl;
    (gl as WebGLRenderingContext | null)
      ?.getExtension("WEBGL_lose_context")
      ?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D scene disabled:", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function SafeCanvas({
  fallback = null,
  ...props
}: CanvasProps & { fallback?: React.ReactNode }) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (!supported) return <>{fallback}</>;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Canvas {...props} />
    </CanvasErrorBoundary>
  );
}

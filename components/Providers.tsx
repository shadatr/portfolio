"use client";

import React from "react";
import { VariantProvider } from "./variants/VariantProvider";
import CustomCursor from "./ui-kit/CustomCursor";
import Nav from "./ui-kit/Nav";
import WorldLayer from "./worlds/WorldLayer";
import WorldSwitcher from "./worlds/WorldSwitcher";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VariantProvider>
      <CustomCursor />
      <WorldLayer />
      <Nav />
      {children}
      <WorldSwitcher />
      {/* Session-wide film-grain — fixed overlay, GPU-cheap, theme-aware via CSS var */}
      <div className="pointer-events-none fixed inset-0 z-[60] grain" />
    </VariantProvider>
  );
}

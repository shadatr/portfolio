"use client";

import React from "react";
import { VariantProvider } from "./variants/VariantProvider";
import VariantPanel from "./variants/VariantPanel";
import CustomCursor from "./ui-kit/CustomCursor";
import Nav from "./ui-kit/Nav";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VariantProvider>
      <CustomCursor />
      <Nav />
      {children}
      <VariantPanel />
    </VariantProvider>
  );
}

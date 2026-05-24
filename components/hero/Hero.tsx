"use client";

import React from "react";
import { useVariants } from "../variants/VariantProvider";
import HeroCoverflow3D from "./HeroCoverflow3D";
import HeroEditorial from "./HeroEditorial";
import HeroDraggable3D from "./HeroDraggable3D";
import HeroMorphType from "./HeroMorphType";
import HeroDevice from "./HeroDevice";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  const { hero } = useVariants();
  if (hero === "editorial") return <HeroEditorial />;
  if (hero === "drag3d") return <HeroDraggable3D />;
  if (hero === "morph-type") return <HeroMorphType />;
  if (hero === "device") return <HeroDevice />;
  if (hero === "particles") return <HeroParticles />;
  return <HeroCoverflow3D />;
}

"use client";

import React from "react";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Skills from "@/components/sections/Skills";
import NowRunning from "@/components/sections/NowRunning";
import CareerJourney from "@/components/sections/CareerJourney";
import Work from "@/components/sections/Work";
import ProjectGallery from "@/components/sections/ProjectGallery";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <Stats />
      <About />
      <Skills />
      <NowRunning />
      <CareerJourney />
      <Work />
      <ProjectGallery />
      <Contact />
    </main>
  );
}

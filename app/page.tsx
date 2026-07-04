"use client";

import React from "react";
import Hero from "@/components/hero/Hero";
import Work from "@/components/sections/Work";
import ProjectSpotlight from "@/components/sections/ProjectSpotlight";
import About from "@/components/sections/About";
import Numbers from "@/components/sections/Numbers";
import Stack from "@/components/sections/Stack";
import DayJob from "@/components/sections/DayJob";
import Location from "@/components/sections/Location";
import CareerJourney from "@/components/sections/CareerJourney";
import NowRunning from "@/components/sections/NowRunning";
import MotionLab from "@/components/sections/MotionLab";
import Worlds from "@/components/sections/Worlds";
import Contact from "@/components/sections/Contact";

/*
  Narrative arc — one idea per screen, air between every beat:
    Hero             one line, one paragraph, two buttons
    Work        01   the three case studies (the reason the site exists)
    Spotlight        pinned cinematic moment for the flagship build
    MotionLab   02   creativity you can touch
    About       03   the story in a breath
    Numbers          four figures count up — proof band
    Stack       04   the toolbox — proximity-lit chips, core tools marked
    DayJob      05   NanoShield + FLARE get a stage, not a timeline entry
    CareerJourney 06 four beats, one column
    NowRunning  07   the present tense — one terminal
    Location         breather — a globe and a coordinate
    Worlds           five tiles that re-skin the site in place — the finale
    Contact     07   one action, said once, said big
*/
export default function Page() {
  return (
    <main className="relative z-10">
      <Hero />
      <Work />
      <ProjectSpotlight />
      <MotionLab />
      <About />
      <Numbers />
      <Stack />
      <DayJob />
      <CareerJourney />
      <NowRunning />
      <Location />
      <Worlds />
      <Contact />
    </main>
  );
}

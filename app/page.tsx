"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import LabelBottomNavigation from "@/components/hearder";
import Home from "@/components/Home";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";


function Page() {
  return (
    <div className="bg-darkPurple text-secondary ">
      {/* <div className="w-screen flex justify-center items-center">
      <LabelBottomNavigation/>
      </div> */}
      <TracingBeam className="h-full">
        <Home/>
        <About/>
        <Work/>
        <Contact/>
      </TracingBeam>
    </div>
  );
}

export default Page;

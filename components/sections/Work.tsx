"use client";

import React from "react";
import SectionHeading from "../ui-kit/SectionHeading";
import ProjectsBento from "../projects/ProjectsBento";

export default function Work() {
  return (
    <section
      id="work"
      className="relative py-36 md:py-56 overflow-hidden border-t border-ink-line/60"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="01 / Projects"
          title="Selected work."
          accentWord="work."
        />

        <div className="mt-16 md:mt-20">
          <ProjectsBento />
        </div>
      </div>
    </section>
  );
}

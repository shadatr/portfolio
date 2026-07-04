"use client";

import React from "react";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { aidventureStudy } from "@/lib/case-studies";

export default function Page() {
  return <CaseStudyView study={aidventureStudy} />;
}

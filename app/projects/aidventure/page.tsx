import React from "react";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { aidventureStudy } from "@/lib/case-studies";
import { studyMetadata } from "@/lib/seo";

export const metadata = studyMetadata(aidventureStudy, "/projects/aidventure");

export default function Page() {
  return <CaseStudyView study={aidventureStudy} />;
}

import React from "react";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { letsNoteStudy } from "@/lib/case-studies";
import { studyMetadata } from "@/lib/seo";

export const metadata = studyMetadata(letsNoteStudy, "/projects/lets-note");

export default function Page() {
  return <CaseStudyView study={letsNoteStudy} />;
}

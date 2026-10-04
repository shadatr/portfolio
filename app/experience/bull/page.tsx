import React from "react";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { bullStudy } from "@/lib/case-studies";
import { studyMetadata } from "@/lib/seo";

export const metadata = studyMetadata(bullStudy, "/experience/bull");

export default function Page() {
  return <CaseStudyView study={bullStudy} />;
}

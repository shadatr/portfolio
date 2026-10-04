import React from "react";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { tummieStudy } from "@/lib/case-studies";
import { studyMetadata } from "@/lib/seo";

export const metadata = studyMetadata(tummieStudy, "/projects/tummie");

export default function Page() {
  return <CaseStudyView study={tummieStudy} />;
}

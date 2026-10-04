import type { Metadata } from "next";
import type { CaseStudy } from "@/components/case-study/types";

// Absolute base for OG/canonical URLs. Vercel sets VERCEL_PROJECT_PRODUCTION_URL
// at build time; NEXT_PUBLIC_SITE_URL overrides it once a custom domain exists.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

function clip(text: string, max = 160) {
  return text.length <= max ? text : text.slice(0, max - 1).trimEnd() + "…";
}

export function studyMetadata(study: CaseStudy, path: string): Metadata {
  const title = `${study.meta.name} — ${study.meta.tagline}`;
  const description = clip(study.summary);
  const image = { url: `/${study.hero.filename}`, alt: study.hero.label };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "article", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

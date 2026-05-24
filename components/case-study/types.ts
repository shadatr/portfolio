import type { Project, ExperienceItem } from "@/lib/data";

export type Chapter = {
  number: string; // "01"
  kicker: string; // "The problem"
  title: string;
  body: string;
  bullets?: string[];
  placeholder: {
    label: string;
    filename: string;
    ratio?: "video" | "phone" | "square" | "wide" | "portrait";
  };
};

export type CaseStudy = {
  slug: string;
  meta: {
    eyebrow: string;
    name: string;
    tagline: string;
    role: string;
    year: string;
    period?: string;
    location?: string;
    stack: string[];
    accent: "cyan" | "violet" | "mint";
    links?: { label: string; href: string }[];
  };
  hero: {
    label: string;
    filename: string;
  };
  summary: string;
  chapters: Chapter[];
  next: { name: string; href: string };
};

// Helpers — construct case studies from data
export function fromProject(p: Project, study: Omit<CaseStudy, "meta" | "next"> & {
  meta?: Partial<CaseStudy["meta"]>;
  next: CaseStudy["next"];
}): CaseStudy {
  return {
    slug: p.slug,
    meta: {
      eyebrow: "Project",
      name: p.name,
      tagline: p.tagline,
      role: p.role,
      year: p.year,
      stack: p.stack,
      accent: p.accent,
      ...(study.meta || {}),
    },
    hero: study.hero,
    summary: study.summary,
    chapters: study.chapters,
    next: study.next,
  };
}

export function fromExperience(
  e: ExperienceItem,
  study: Omit<CaseStudy, "meta" | "next"> & {
    meta?: Partial<CaseStudy["meta"]>;
    next: CaseStudy["next"];
    accent?: "cyan" | "violet" | "mint";
  }
): CaseStudy {
  return {
    slug: e.slug,
    meta: {
      eyebrow: "Experience",
      name: e.company,
      tagline: e.role,
      role: e.role,
      year: e.period,
      period: e.period,
      location: e.location,
      stack: e.stack,
      accent: study.accent || "cyan",
      ...(study.meta || {}),
    },
    hero: study.hero,
    summary: study.summary,
    chapters: study.chapters,
    next: study.next,
  };
}

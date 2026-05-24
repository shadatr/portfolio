"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type HeroVariant =
  | "coverflow3d"
  | "editorial"
  | "drag3d"
  | "morph-type"
  | "device"
  | "particles";
export type ProjectsVariant = "bento" | "stacked" | "coverflow";
export type CaseStudyVariant =
  | "blog-content"
  | "sticky"
  | "horizontal"
  | "alternating";

export type FontVariant = "editorial" | "clean" | "refined" | "tech";
export type ThemeVariant =
  | "midnight"
  | "embers"
  | "forest"
  | "graphite"
  | "paper";

export const HERO_VARIANTS: { id: HeroVariant; label: string }[] = [
  { id: "coverflow3d", label: "3D coverflow (drag)" },
  { id: "editorial", label: "Editorial collage" },
  { id: "drag3d", label: "Draggable 3D knot" },
  { id: "morph-type", label: "Scroll-morph type" },
  { id: "device", label: "Laptop + phone" },
  { id: "particles", label: "Particle field" },
];

export const PROJECT_VARIANTS: { id: ProjectsVariant; label: string }[] = [
  { id: "bento", label: "Bento tilt grid" },
  { id: "stacked", label: "Stacked cards" },
  { id: "coverflow", label: "3D coverflow" },
];

export const CASE_STUDY_VARIANTS: { id: CaseStudyVariant; label: string }[] = [
  { id: "blog-content", label: "Blog content" },
  { id: "sticky", label: "Sticky-pin" },
  { id: "horizontal", label: "Horizontal" },
  { id: "alternating", label: "Alternating panels" },
];

export const FONT_VARIANTS: { id: FontVariant; label: string }[] = [
  { id: "editorial", label: "Editorial (Bricolage + Instrument)" },
  { id: "clean", label: "Clean (Inter only)" },
  { id: "refined", label: "Refined (Fraunces)" },
  { id: "tech", label: "Mono-tech (Space Grotesk)" },
];

export const THEME_VARIANTS: { id: ThemeVariant; label: string }[] = [
  { id: "midnight", label: "Midnight · cyan + violet" },
  { id: "embers", label: "Embers · orange + rose" },
  { id: "forest", label: "Forest · mint + sky" },
  { id: "graphite", label: "Graphite · achromatic" },
  { id: "paper", label: "Paper · light editorial" },
];

type Variants = {
  hero: HeroVariant;
  projects: ProjectsVariant;
  caseStudy: CaseStudyVariant;
  font: FontVariant;
  theme: ThemeVariant;
};

type Ctx = Variants & {
  setHero: (v: HeroVariant) => void;
  setProjects: (v: ProjectsVariant) => void;
  setCaseStudy: (v: CaseStudyVariant) => void;
  setFont: (v: FontVariant) => void;
  setTheme: (v: ThemeVariant) => void;
};

const DEFAULTS: Variants = {
  hero: "coverflow3d",
  projects: "bento",
  caseStudy: "blog-content",
  font: "editorial",
  theme: "midnight",
};

const VariantContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "shada-variants-v1";

export function VariantProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Variants>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Migrate legacy theme names
        const legacyMap: Record<string, ThemeVariant> = {
          cyan: "midnight",
          sunset: "embers",
          mint: "forest",
          mono: "graphite",
        };
        if (parsed.theme && legacyMap[parsed.theme]) {
          parsed.theme = legacyMap[parsed.theme];
        }
        setState({ ...DEFAULTS, ...parsed });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  // Apply font variant as a class on <html> so CSS vars swap
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("fonts-editorial", "fonts-clean", "fonts-refined", "fonts-tech");
    root.classList.add(`fonts-${state.font}`);
  }, [state.font]);

  // Apply theme variant as a class on <html> so accent + surface vars swap
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove(
      "theme-midnight",
      "theme-embers",
      "theme-forest",
      "theme-graphite",
      "theme-paper",
      // legacy names — clean up old localStorage values too
      "theme-cyan",
      "theme-sunset",
      "theme-mint",
      "theme-mono"
    );
    root.classList.add(`theme-${state.theme}`);
  }, [state.theme]);

  const value: Ctx = {
    ...state,
    setHero: (v) => setState((s) => ({ ...s, hero: v })),
    setProjects: (v) => setState((s) => ({ ...s, projects: v })),
    setCaseStudy: (v) => setState((s) => ({ ...s, caseStudy: v })),
    setFont: (v) => setState((s) => ({ ...s, font: v })),
    setTheme: (v) => setState((s) => ({ ...s, theme: v })),
  };

  return (
    <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
  );
}

export function useVariants() {
  const ctx = useContext(VariantContext);
  if (!ctx) throw new Error("useVariants must be used within VariantProvider");
  return ctx;
}

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
  | "obsidian"
  | "paper"
  | "graphite"
  // Legacy values kept for back-compat with existing localStorage entries.
  | "embers"
  | "forest";

export type BackgroundVariant =
  | "none"
  | "dots"
  | "lines"
  | "grid"
  | "topo"
  | "diagonal";

/* Worlds — full-experience skins. Each swaps the color tokens AND mounts an
   ambient animated layer. */
export type WorldVariant = "space" | "liquid" | "deep" | "toybox";

export const HERO_VARIANTS: { id: HeroVariant; label: string; hint: string }[] = [
  { id: "editorial", label: "Editorial collage", hint: "screenshots drift behind big type" },
  { id: "coverflow3d", label: "3D coverflow", hint: "drag a ring of screens in space" },
  { id: "drag3d", label: "Draggable knot", hint: "an interactive 3D form" },
  { id: "morph-type", label: "Scroll-morph type", hint: "typography reshapes on scroll" },
  { id: "device", label: "Laptop + phone", hint: "product-shot style intro" },
  { id: "particles", label: "Particle field", hint: "ambient point cloud" },
];

export const PROJECT_VARIANTS: { id: ProjectsVariant; label: string; hint: string }[] = [
  { id: "bento", label: "Bento grid", hint: "asymmetric tilt grid" },
  { id: "stacked", label: "Stacked cards", hint: "sticky scroll layering" },
  { id: "coverflow", label: "3D coverflow", hint: "horizontal 3D feed" },
];

export const CASE_STUDY_VARIANTS: { id: CaseStudyVariant; label: string; hint: string }[] = [
  { id: "blog-content", label: "Blog content", hint: "long-form reader" },
  { id: "sticky", label: "Sticky-pin", hint: "pinned visual + scrolling notes" },
  { id: "horizontal", label: "Horizontal", hint: "scroll sideways" },
  { id: "alternating", label: "Alternating", hint: "left/right panels" },
];

export const FONT_VARIANTS: { id: FontVariant; label: string; hint: string }[] = [
  { id: "editorial", label: "Editorial", hint: "Bricolage + Instrument Serif" },
  { id: "refined", label: "Refined", hint: "Fraunces — print magazine" },
  { id: "tech", label: "Mono-tech", hint: "Space Grotesk — engineered" },
  { id: "clean", label: "Clean", hint: "Inter only — neutral" },
];

export const THEME_VARIANTS: { id: ThemeVariant; label: string; hint: string }[] = [
  { id: "midnight", label: "Midnight Glass", hint: "night flight, observatory, calm tech" },
  { id: "obsidian", label: "Obsidian & Bone", hint: "monograph, atelier, burnished amber" },
  { id: "paper", label: "Atelier Paper", hint: "print magazine, editorial, museum" },
  { id: "graphite", label: "Graphite", hint: "Swiss, brutalist-minimal, gallery" },
];

export const BACKGROUND_VARIANTS: { id: BackgroundVariant; label: string; hint: string }[] = [
  { id: "none", label: "None", hint: "pure surface — just the theme" },
  { id: "dots", label: "Dots", hint: "soft pinpoint grid, organic" },
  { id: "lines", label: "Lines", hint: "horizontal rule, ledger feel" },
  { id: "diagonal", label: "Diagonal", hint: "45° hairlines, editorial" },
  { id: "topo", label: "Topo", hint: "repeating rings, atmospheric" },
  { id: "grid", label: "Grid", hint: "the classic square mesh" },
];

export const WORLD_VARIANTS: {
  id: WorldVariant;
  label: string;
  hint: string;
  glyph: string;
}[] = [
  { id: "space", label: "Space", hint: "fly through a starfield", glyph: "✦" },
  { id: "liquid", label: "Liquid", hint: "everything flows", glyph: "◉" },
  { id: "deep", label: "Deep Dive", hint: "sink into the abyss", glyph: "≋" },
  { id: "toybox", label: "Toy Box", hint: "soft & squishy", glyph: "◕" },
];

type Variants = {
  hero: HeroVariant;
  projects: ProjectsVariant;
  caseStudy: CaseStudyVariant;
  font: FontVariant;
  theme: ThemeVariant;
  background: BackgroundVariant;
  world: WorldVariant;
};

type Ctx = Variants & {
  setHero: (v: HeroVariant) => void;
  setProjects: (v: ProjectsVariant) => void;
  setCaseStudy: (v: CaseStudyVariant) => void;
  setFont: (v: FontVariant) => void;
  setTheme: (v: ThemeVariant) => void;
  setBackground: (v: BackgroundVariant) => void;
  setWorld: (v: WorldVariant) => void;
};

const DEFAULTS: Variants = {
  hero: "editorial",
  projects: "bento",
  caseStudy: "blog-content",
  font: "editorial",
  theme: "midnight",
  background: "none",
  world: "toybox",
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
        const legacyMap: Record<string, ThemeVariant> = {
          cyan: "midnight",
          sunset: "obsidian",
          mint: "midnight",
          mono: "graphite",
          embers: "obsidian",
          forest: "midnight",
        };
        if (parsed.theme && legacyMap[parsed.theme]) {
          parsed.theme = legacyMap[parsed.theme];
        }
        // ShadaOS world was retired — send stored sessions to the default.
        if (parsed.world === "os") parsed.world = "toybox";
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
      "theme-obsidian",
      "theme-paper",
      "theme-graphite",
      // legacy aliases
      "theme-embers",
      "theme-forest",
      "theme-cyan",
      "theme-sunset",
      "theme-mint",
      "theme-mono"
    );
    root.classList.add(`theme-${state.theme}`);
  }, [state.theme]);

  // Apply world as a class on <html> — world tokens are defined after theme
  // tokens in globals.css, so the active world always wins the palette.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove(
      "world-space",
      "world-liquid",
      "world-deep",
      "world-toybox",
      "world-os" // retired
    );
    root.classList.add(`world-${state.world}`);
  }, [state.world]);

  // Apply background pattern as a class on <html> so the CSS vars resolve.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove(
      "pattern-none",
      "pattern-dots",
      "pattern-lines",
      "pattern-grid",
      "pattern-topo",
      "pattern-diagonal"
    );
    root.classList.add(`pattern-${state.background}`);
  }, [state.background]);

  const value: Ctx = {
    ...state,
    setHero: (v) => setState((s) => ({ ...s, hero: v })),
    setProjects: (v) => setState((s) => ({ ...s, projects: v })),
    setCaseStudy: (v) => setState((s) => ({ ...s, caseStudy: v })),
    setFont: (v) => setState((s) => ({ ...s, font: v })),
    setTheme: (v) => setState((s) => ({ ...s, theme: v })),
    setBackground: (v) => setState((s) => ({ ...s, background: v })),
    setWorld: (v) => setState((s) => ({ ...s, world: v })),
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

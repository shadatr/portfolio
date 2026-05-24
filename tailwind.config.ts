const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme-aware surfaces (driven by --ink-* CSS vars per theme class)
        ink: {
          base: "rgb(var(--ink-base) / <alpha-value>)",
          surface: "rgb(var(--ink-surface) / <alpha-value>)",
          raised: "rgb(var(--ink-raised) / <alpha-value>)",
          line: "rgb(var(--ink-line) / <alpha-value>)",
        },
        cyan: {
          neon: "rgb(var(--accent-primary) / <alpha-value>)",
          glow: "rgb(var(--accent-glow) / <alpha-value>)",
          deep: "#0E7490",
        },
        violet: {
          pop: "rgb(var(--accent-secondary) / <alpha-value>)",
          soft: "rgb(var(--accent-secondary-soft) / <alpha-value>)",
          DEFAULT: "rgb(var(--accent-secondary) / <alpha-value>)",
        },
        text: {
          high: "rgb(var(--text-high) / <alpha-value>)",
          mid: "rgb(var(--text-mid) / <alpha-value>)",
          dim: "rgb(var(--text-dim) / <alpha-value>)",
        },
        // Legacy aliases (so we don't break anything still referencing them)
        primary: "rgb(var(--ink-base) / <alpha-value>)",
        secondary: "rgb(var(--text-high) / <alpha-value>)",
        darkPurple: "rgb(var(--ink-base) / <alpha-value>)",
        lightPurple1: "rgb(var(--accent-primary) / <alpha-value>)",
        lightPurple2: "rgb(var(--accent-secondary) / <alpha-value>)",
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "ui-serif", "Georgia"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xxsm: "10px",
        xsm: "14px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xlg: "30px",
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "grid-fade": "gridFade 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gridFade: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.35" },
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 30px -5px rgb(var(--accent-primary) / 0.55)",
        "neon-violet": "0 0 30px -5px rgb(var(--accent-secondary) / 0.55)",
        "card":
          "0 24px 48px -12px rgba(0,0,0,0.6), 0 0 0 1px rgb(var(--accent-primary) / 0.06)",
      },
      backgroundImage: {
        "grid-cyan":
          "linear-gradient(rgb(var(--accent-primary) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent-primary) / 0.08) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgb(var(--accent-primary) / 0.18), transparent 60%)",
      },
    },
    screens: {
      sm: "200px",
      md: "900px",
      lg: "1300px",
      xl: "1440px",
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

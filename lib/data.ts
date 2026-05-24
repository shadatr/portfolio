export type Stack = string;

export type Project = {
  slug: "lets-note" | "tummie" | "moonshot";
  name: string;
  tagline: string;
  oneLiner: string;
  role: string;
  year: string;
  stack: Stack[];
  accent: "cyan" | "violet" | "mint";
  href: string;
};

export type ExperienceItem = {
  slug: "bull" | "oktan";
  company: string;
  role: string;
  period: string;
  location: string;
  blurb: string;
  bullets: string[];
  stack: Stack[];
  href: string;
};

export const projects: Project[] = [
  {
    slug: "lets-note",
    name: "Let's Note AI",
    tagline: "AI study companion",
    oneLiner:
      "An AI study platform that turns PDFs, slides, audio lectures and YouTube videos into summaries, flashcards, quizzes, podcasts and a chatbot that knows your material.",
    role: "Full-stack engineer · solo build",
    year: "2025",
    stack: ["Rust", "Axum", "Next.js 15", "Supabase", "Gemini 2.0", "AssemblyAI"],
    accent: "cyan",
    href: "/projects/lets-note",
  },
  {
    slug: "tummie",
    name: "Tummie",
    tagline: "AI gut-health companion",
    oneLiner:
      "A React Native app that quietly correlates food, mood, cycle and bowel data to surface real gut-health triggers — adaptive logging, AI-generated treatment plans, and forecasts that update daily.",
    role: "Mobile · backend · AI · UI design",
    year: "2025",
    stack: ["React Native", "Expo", "Node.js", "Supabase", "Gemini 2.5"],
    accent: "violet",
    href: "/projects/tummie",
  },
  {
    slug: "moonshot",
    name: "Moonshot Monitor",
    tagline: "Real-time Solana token watcher",
    oneLiner:
      "A single Rust binary that subscribes to the Moonshot Solana program over WebSocket, decodes create/buy/sell events, enriches them with on-chain metadata, and posts to Discord within seconds.",
    role: "Solo backend · infra",
    year: "2024",
    stack: ["Rust", "Tokio", "Solana SDK", "Serenity"],
    accent: "mint",
    href: "/projects/moonshot",
  },
];

export const experience: ExperienceItem[] = [
  {
    slug: "bull",
    company: "Bull Teknoloji",
    role: "Software Engineer",
    period: "Dec 2024 — Present",
    location: "Istanbul, Türkiye · Hybrid",
    blurb:
      "Two flagship platforms: NanoShield — a real-time trading risk system around an FPGA core — which I lead end-to-end, and FLARE — a low-latency trading & finance reporting platform where I rebuilt the data path from Next.js to Go to handle high-frequency market data.",
    bullets: [
      "NanoShield (RegTech): led end-to-end full-stack development of a real-time risk management platform monitoring and enforcing limits on financial instruments — Next.js 16 UI, Go backend (HTTP + WebSocket + gRPC), PostgreSQL with NOTIFY/LISTEN triggers.",
      "FLARE (reporting): contributed across the stack — Next.js + Go server backed by ClickHouse — building real-time market data, orderbook, time-and-sales and candlestick views for trading-floor users.",
      "Owned the Next.js → Go migration of the FLARE data path after the single-threaded Node.js event loop got starved by high-frequency feeds.",
    ],
    stack: ["Next.js 16", "Go", "ClickHouse", "PostgreSQL", "gRPC", "WebSockets"],
    href: "/experience/bull",
  },
  {
    slug: "oktan",
    company: "OKTAN Sağlık ARGE A.Ş.",
    role: "AI Engineer Intern",
    period: "3-month internship",
    location: "Türkiye",
    blurb:
      "First professional exposure to deploying AI in production — healthcare-adjacent smart systems, real data, and the unglamorous parts of making models useful.",
    bullets: [
      "Deployed AI applications into production-adjacent environments and tuned them against real-world data.",
      "Learned from internal smart-system platforms and contributed feature work alongside senior engineers.",
    ],
    stack: ["Python", "ML", "AI deployment"],
    href: "/experience/oktan",
  },
];

export const skills = {
  Frontend: [
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Three.js",
  ],
  Backend: ["Rust", "Go", "Node.js", "Axum", "Express", "gRPC"],
  Data: ["PostgreSQL", "Supabase", "ClickHouse", "SeaORM", "Redis"],
  "AI & Web3": ["LLM integration", "Gemini", "RAG", "Solana", "Web3.js"],
  Tools: ["Git", "Docker", "Figma", "Linux", "PostHog", "Sentry"],
};

import { projects, experience } from "./data";
import { CaseStudy, fromProject, fromExperience } from "@/components/case-study/types";

const lookup = (slug: string) => projects.find((p) => p.slug === slug)!;
const expLookup = (slug: string) => experience.find((e) => e.slug === slug)!;

/* ============================================================================
   PROJECTS
   ============================================================================ */

export const letsNoteStudy: CaseStudy = fromProject(lookup("lets-note"), {
  slug: "lets-note",
  hero: {
    label: "Let's Note AI — product hero",
    filename: "lets-note/hero.png",
  },
  summary:
    "Let's Note AI is an AI-powered study platform that ingests almost anything a student has — PDFs, DOCX, PPTX, MP3/AAC, recorded lectures, YouTube links — and turns it into structured summaries, flashcards, quizzes, an AI-generated podcast, and a chatbot grounded in the user's own material. I built it solo: Rust + Axum backend, Next.js 15 frontend, Supabase, with Google Gemini 2.0 and AssemblyAI doing the heavy AI lifting.",
  chapters: [
    {
      number: "01",
      kicker: "The problem",
      title: "Study tools handle one piece. Students need the whole pipeline.",
      body:
        "Students juggle a dozen tabs: one app transcribes audio, another summarizes, a third makes flashcards, a fourth turns them into quizzes. Each one re-uploads the same source. Each one forgets context the moment you switch. I wanted a single workspace where uploading once unlocks everything — summary, flashcards, quiz, podcast, chat — all grounded in the same material.",
      bullets: [
        "Lectures (MP3/AAC/ALAC) → transcript via AssemblyAI, then summary.",
        "Documents (PDF, DOCX, PPTX) → text extraction → study artifacts.",
        "YouTube links → captions → searchable knowledge base.",
      ],
      placeholder: {
        label: "The pipeline — many sources, one workspace",
        filename: "lets-note/01-pipeline.png",
      },
    },
    {
      number: "02",
      kicker: "Why Rust for the API",
      title: "Picking the language that wouldn't fight me at scale.",
      body:
        "Most edtech AI tools are built on Python or Node. I picked Rust + Axum because the workload is mostly file ingest, LLM streaming, and concurrent background jobs — exactly where Rust's typed-channels, ownership rules, and predictable latency pay off. SeaORM gives me Postgres without a runtime overhead. The whole API runs on a 5–10 connection pool and Tokio's full async runtime.",
      bullets: [
        "Axum 0.7 + Tower middleware for routing and JWT auth.",
        "SeaORM 1.1 over Supabase Postgres — entities for users, lectures, materials, decks, flashcards, quizzes, usage.",
        "tiktoken-rs to count tokens before sending — usage limits enforced server-side per user.",
        "Sentry + structured tracing for production observability.",
      ],
      placeholder: {
        label: "Service architecture — Rust API + Next.js client",
        filename: "lets-note/02-architecture.png",
      },
    },
    {
      number: "03",
      kicker: "The hard part",
      title: "Six input formats, one consistent contract.",
      body:
        "Every format is its own world. DOCX is XML in a zip. PPTX is XML in a different zip. PDFs are pretending to be documents. Audio files are bytes. YouTube transcripts come via a sidecar Python script. I built a single Rust file-processing layer (`utils/files_processing.rs`) that normalizes all of them into a clean text stream before anything AI-related runs — so the prompt logic downstream never has to care about the source.",
      bullets: [
        "DOCX via `docx-rs`, PPTX via `quick-xml`, PDF via `lopdf`.",
        "Audio decoded with `symphonia` (MP3/AAC/ALAC), transcribed via AssemblyAI.",
        "YouTube transcripts fetched via a small Python helper, called from Rust.",
        "All sources funneled into the same `LectureMaterial` table — chat, flashcards, quiz all read from the same store.",
      ],
      placeholder: {
        label: "File ingest layer — one path, many formats",
        filename: "lets-note/03-ingest.png",
      },
    },
    {
      number: "04",
      kicker: "AI without breaking the bank",
      title: "Quota-aware prompt design.",
      body:
        "LLM cost is the silent killer in edtech. I made every prompt template explicit (stored in `/prompts/`), counted every outgoing token with tiktoken-rs, and enforced per-user quotas in the `UsageService` before the model was even called. Members get unlimited; free users get a budget. Failed generations refund the quota.",
      placeholder: {
        label: "Quota + prompt templates",
        filename: "lets-note/04-quotas.png",
      },
    },
    {
      number: "05",
      kicker: "Frontend that earns the trust",
      title: "Next.js 15 + BlockNote + Tiptap, designed in-house.",
      body:
        "The frontend is Next.js 15 / React 19 with BlockNote and Tiptap for rich editing, a PDF viewer for source-of-truth, and audio recording/playback so students can capture lectures in-app. I designed every screen myself — the empty states, the streaming chat, the flashcard reveal animation. The product had to feel like a calm study desk, not another AI demo.",
      bullets: [
        "BlockNote + Tiptap-markdown for the note editor.",
        "Streaming chat replies (Vercel AI SDK, Google Gemini provider).",
        "Stripe + Paddle for billing, Supabase SSR for auth.",
        "PostHog for product analytics, Sentry for error tracking on both ends.",
      ],
      placeholder: {
        label: "Editor, flashcards & chat UI",
        filename: "lets-note/05-ui.png",
      },
    },
  ],
  next: { name: "Tummie", href: "/projects/tummie" },
});

export const tummieStudy: CaseStudy = fromProject(lookup("tummie"), {
  slug: "tummie",
  hero: {
    label: "Tummie — product hero",
    filename: "tummie/hero.png",
  },
  summary:
    "Tummie is a React Native gut-health app I built end-to-end — mobile, backend, AI, design. Users log food, water, bowel data, symptoms and cycle days; an LLM pipeline detects patterns, generates a personalized treatment plan, and forecasts how the next 7 days might feel. Tracker apps already log; Tummie's job is to find the signal in the log.",
  chapters: [
    {
      number: "01",
      kicker: "The problem",
      title: "Logging is the easy part. Finding the trigger is the product.",
      body:
        "People with IBS, SIBO and similar conditions are told to keep food diaries. Most apps log and stop there. Tummie has to actually answer the question users came for: what's making this worse, what's helping, and what should I try tomorrow? That meant building an analysis pipeline on top of the logger, not bolting one on later.",
      bullets: [
        "Daily logs: gut feeling, symptoms, foods, bowel data, water, period days.",
        "AI analysis: pattern findings, detected conditions, root causes, plan tasks.",
        "Personalized plans with daily actions, milestones and gentle reminders.",
      ],
      placeholder: {
        label: "Logging → analysis → plan",
        filename: "tummie/01-loop.png",
      },
    },
    {
      number: "02",
      kicker: "Architecture",
      title: "Expo + Express + Supabase + a scheduled AI layer.",
      body:
        "Frontend is a React Native (Expo) app with expo-router, Reanimated, gesture handler, secure-store auth, and Zustand for state — twelve domain stores cover auth, home, log, plans, patterns, results, periods, content, notifications, subscription, theme, and the conversion-onboarding flow. Backend is Express 5 on Node 22 talking to Supabase Postgres, with `node-schedule` running cron jobs that batch-analyze logs and refresh plans overnight. Push notifications via the Expo Server SDK.",
      bullets: [
        "Expo 54 + RN 0.81 + Expo Router 6 + Reanimated 4.",
        "Express 5, helmet, rate-limit, zod, multer for image uploads.",
        "Supabase Postgres + AI-generated tables: user_plans, plan_daily_actions, plan_milestones, plan_tasks, pattern_findings, detected_conditions.",
        "OpenRouter API with Gemini 2.5 powering the analysis layer.",
      ],
      placeholder: {
        label: "Mobile · API · DB · scheduler",
        filename: "tummie/02-architecture.png",
      },
    },
    {
      number: "03",
      kicker: "The interesting part",
      title: "Adaptive logging — the questions change as you log.",
      body:
        "A static form bores users into giving up. Tummie's `adaptive-logging.service` asks follow-up questions based on what you've already logged today: ate spicy → check for reflux; logged bloating → ask about fermented foods last meal. Less form, more conversation. The follow-ups are LLM-generated against a tight schema so the answers stay analyzable.",
      placeholder: {
        label: "Adaptive logging flow",
        filename: "tummie/03-adaptive-logging.png",
        ratio: "phone",
      },
    },
    {
      number: "04",
      kicker: "Gut score with cycle awareness",
      title: "A daily metric that knows about your hormones.",
      body:
        "Gut symptoms in menstruating users shift dramatically across the cycle. A flat score that ignores that misleads users. Tummie's `scoring.service` applies cycle-aware modifiers — luteal week boosts the bloating baseline, late-luteal expects energy dips — so a user doesn't see 'you're getting worse' when their body is doing what it always does on day 24.",
      bullets: [
        "Predictions service forecasts energy, mood and bloating risk for the next 7 days.",
        "Solutions service surfaces 'today's support items' based on symptoms + cycle phase.",
        "Recommendations service shows articles in `library/` matched to current context.",
      ],
      placeholder: {
        label: "Gut score & 7-day forecast",
        filename: "tummie/04-gut-score.png",
        ratio: "phone",
      },
    },
    {
      number: "05",
      kicker: "Designing for empathy",
      title: "Friendly, never clinical. No streaks to break.",
      body:
        "Bowel-data apps can feel like medical paperwork. I designed the UI to feel like a warm notebook — soft illustrations (Fraunces + Plus Jakarta Sans pairing), haptics on confirms, no shaming red icons. There are no streaks to break. Reflections are weekly, not daily, because that's when patterns actually emerge and analysis is meaningful. The paywall (Superwall + RevenueCat) is honest about what's free vs paid.",
      placeholder: {
        label: "Onboarding & illustration system",
        filename: "tummie/05-design.png",
        ratio: "phone",
      },
    },
  ],
  next: { name: "Moonshot Monitor", href: "/projects/moonshot" },
});

export const moonshotStudy: CaseStudy = fromProject(lookup("moonshot"), {
  slug: "moonshot",
  hero: {
    label: "Moonshot Monitor — terminal hero",
    filename: "moonshot/hero.png",
  },
  summary:
    "Moonshot Monitor is a single Rust binary that watches the Solana blockchain for new tokens created under the Moonshot program (`MoonCVVNZFSYkqNXP6bxHLPL6QQJiMagDL3qcqUQTrG`) and posts enriched updates to Discord — usually within seconds of the mint. No queue, no database, no orchestration. One Tokio process doing one job well.",
  chapters: [
    {
      number: "01",
      kicker: "The problem",
      title: "Speed is the entire product.",
      body:
        "When a new memecoin mints, the first few minutes are when interesting things happen. Most dashboards poll on a 30-second interval, which is forever in crypto-time. The goal: see new mints within seconds of the on-chain event, with all the metadata needed to make a decision — and pipe it straight to a Discord channel where my watchers already live.",
      placeholder: {
        label: "Latency budget — RPC → enrich → Discord",
        filename: "moonshot/01-latency.png",
      },
    },
    {
      number: "02",
      kicker: "Why Rust",
      title: "Tight loop, predictable latency, no GC pauses.",
      body:
        "I chose Rust over Node because the hot path is small, latency-sensitive, and never sleeps. Tokio handles thousands of concurrent tasks without thread overhead. The binary subscribes to a Solana `transactionSubscribe` WebSocket filtered to the Moonshot program, decodes the event stream, and fans out enrichment work to background tasks.",
      bullets: [
        "Tokio + tokio-tungstenite for the WebSocket subscription.",
        "`solana-client` / `solana-sdk` 1.18.16 for RPC + decoding.",
        "Serenity for Discord posting (rustls backend, no openssl dep).",
        "Parses three event types: `BuyEvent`, `SellEvent`, `CreateEvent`. Only create events trigger a post.",
      ],
      placeholder: {
        label: "src/ — main.rs · event.rs · ws_client.rs · new_tokens.rs",
        filename: "moonshot/02-tree.png",
      },
    },
    {
      number: "03",
      kicker: "The pipeline",
      title: "Mint → metadata → previous mints → Discord.",
      body:
        "On each `CreateEvent`, the binary kicks off two concurrent fetches: the token's metadata from its `uri`, and every other token the creator has minted in the past. Both run as Tokio tasks via `tokio::spawn`, joined with `try_join!`. That second lookup is the actual edge — it lets the channel see in one message whether the creator has 200 prior rug-pulls or is fresh.",
      placeholder: {
        label: "Discord embed — token + creator history",
        filename: "moonshot/03-discord.png",
      },
    },
    {
      number: "04",
      kicker: "What I learned",
      title: "Small tools are still worth making.",
      body:
        "Not every project needs to be a platform. Sometimes the right answer is one binary, one process, one job — deployable to any Linux box with `cargo build --release` and a webhook URL. Building this taught me how much complexity I usually accept by default, and how good it feels to write something that just does its thing and never wakes anyone up.",
      placeholder: {
        label: "Deploy & logs",
        filename: "moonshot/04-deploy.png",
      },
    },
  ],
  next: { name: "Let's Note AI", href: "/projects/lets-note" },
});

/* ============================================================================
   EXPERIENCE
   ============================================================================ */

export const bullStudy: CaseStudy = fromExperience(expLookup("bull"), {
  slug: "bull",
  accent: "cyan",
  hero: {
    label: "Bull Teknoloji — NanoShield & FLARE",
    filename: "experience/bull-hero.png",
  },
  summary:
    "I joined Bull Teknoloji as a software engineer in December 2024 and work across two flagship platforms: NanoShield — a real-time trading risk management system built around an FPGA core — which I lead end-to-end, and FLARE — a low-latency trading & reporting platform where I rebuilt the data path from Next.js to Go after the single-threaded Node.js event loop got buried by high-frequency market feeds.",
  chapters: [
    {
      number: "01",
      kicker: "FLARE · the migration story",
      title: "Next.js wasn't built for a fire-hose. So I moved the data path to Go.",
      body:
        "FLARE delivers low-latency market data, orderbooks, candlesticks and time-and-sales to trading-floor users. The initial version routed real-time data through Next.js API routes. It worked until volume hit production levels — then the single-threaded Node.js event loop got starved by the constant message firehose, blocking everything else on the server. UI requests timed out. Charts froze.",
      bullets: [
        "Diagnosed: Node's single-threaded model + JSON parse cost on high-frequency feeds = event-loop starvation.",
        "Moved the entire data path to a Go server (`golang-bullflare-ui-server`) with goroutines + channels for true parallelism.",
        "Each market data domain — market data, orderbook depth, candlesticks, time-and-sales, symbol messages, positions — got its own WebSocket endpoint backed by goroutines reading from ClickHouse.",
        "Next.js kept what it's good at: rendering the UI and proxying user-facing requests.",
        "Result: charts stay live under production load and the UI thread never blocks on data work.",
      ],
      placeholder: {
        label: "Before / after — Node event loop vs Go goroutines",
        filename: "experience/bull-01-migration.png",
      },
    },
    {
      number: "02",
      kicker: "FLARE · the architecture",
      title: "Go + ClickHouse + gRPC + a dashboard built for traders.",
      body:
        "The Go server (`gorilla/mux`, `gorilla/websocket`, `clickhouse-go/v2`, `golang-jwt`) exposes parallel HTTP + WebSocket endpoints — `/api/marketData/*` and `/api/marketData/*/ws` — backed by ClickHouse for the time-series side. The Next.js frontend (React 19, Turbopack, Zustand, SWR, lightweight-charts + ECharts) consumes those streams and renders a drag-and-drop dashboard (`@dnd-kit`) of resizable panels (`react-resizable-panels`). User-defined filter groups are persisted server-side per user.",
      bullets: [
        "Market data, orderbook depth, candlestick, time-and-sales — each one a typed WebSocket handler in Go.",
        "ClickHouse for analytical queries; gRPC for downstream service calls; JWT auth in the middleware.",
        "Frontend: lightweight-charts (TradingView), ECharts, drag-and-drop layouts, saved filter groups, CSV export.",
      ],
      placeholder: {
        label: "FLARE — dashboard hero",
        filename: "experience/bull-02-flare.png",
      },
    },
    {
      number: "03",
      kicker: "NanoShield · the project I lead",
      title: "Real-time risk management around an FPGA core.",
      body:
        "NanoShield is a real-time trading risk management system — a Next.js 16 frontend, a Go backend (HTTP + WebSocket + gRPC), and a PostgreSQL schema with composite types, RLS, and NOTIFY/LISTEN triggers. Writes go through an external gRPC service into Postgres; reads come back direct; real-time updates flow through Postgres triggers → Go broadcasters → a WebSocket hub → SWR cache invalidation in the frontend.",
      bullets: [
        "Six Go broadcasters — alerts, orders, positions, limits, health, activity — each one polling Postgres, hashing for change detection, and pushing through a central WebSocket hub.",
        "Hybrid SWR + WebSocket pattern: SWR for initial fetch + safety-net polling, WebSocket for instant invalidation.",
        "Custom JWT auth with refresh-token deduplication (shared-promise pattern) so 50 concurrent 401s only refresh once.",
        "Two Postgres pools — authDB and shieldDB — so auth tokens never compete with risk-data queries for connections.",
        "Entity hierarchy: Instruments → AccountGroup → Account → User, each with their own limit types as PostgreSQL composite columns.",
      ],
      placeholder: {
        label: "NanoShield — dashboard & alerts",
        filename: "experience/bull-03-nanoshield.png",
      },
    },
    {
      number: "04",
      kicker: "Problem-solving · the OOM I almost owned",
      title: "A 19 GB node process got killed. I had to prove it wasn't us.",
      body:
        "One afternoon the kernel killed a 19 GB `node` process on the Shield server. The first instinct on a team is to blame the Next.js service — it's the obvious node process. I wrote up an incident investigation: pulled `journalctl` for the window, audited service memory after recovery, checked socket counts, and looked for files modified at `14:19:37`. Two files lined up: `vivado_lab.log` and `vivado_lab.jou` — modified the same minute as the kill. Vivado (Xilinx FPGA tooling) was running on the same box.",
      bullets: [
        "Inspected steady-state UI processes: ~100 MB RSS. No persistent leak.",
        "Verified socket counts (`ss -tanp | grep :3000`) — 63, normal for the workload.",
        "Time-correlated `find -newermt` to surface what changed in the OOM window.",
        "Wrote a precise message to the FPGA team with the exact commands they could run to confirm. Added systemd `MemoryMax` limits + a memory-watch logger so the next time we'd have a smoking gun.",
        "Conclusion: strong evidence the OOM was an FPGA toolchain spike, not the UI. Wrote it up in a 12-page postmortem so the decision was reproducible.",
      ],
      placeholder: {
        label: "OOM postmortem — timeline + evidence",
        filename: "experience/bull-04-postmortem.png",
      },
    },
    {
      number: "05",
      kicker: "How I work here",
      title: "Cross-functional, document-first.",
      body:
        "Hardware engineers, quants, and designers all sit at the same table. The product moves fast because we write design docs first — RBAC, alerts architecture, position checks, limits page, OOM postmortem — and code second. Most of my value here is being the person who can talk across all three teams and translate intent into a system contract.",
      placeholder: {
        label: "Design docs — RBAC, alerts, limits, position checks",
        filename: "experience/bull-05-docs.png",
      },
    },
  ],
  next: { name: "OKTAN Sağlık ARGE", href: "/experience/oktan" },
});

export const oktanStudy: CaseStudy = fromExperience(expLookup("oktan"), {
  slug: "oktan",
  accent: "violet",
  hero: {
    label: "OKTAN Sağlık ARGE — internship",
    filename: "experience/oktan-hero.png",
  },
  summary:
    "Three-month AI engineering internship at OKTAN Sağlık ARGE A.Ş. — my first professional exposure to deploying AI in production-adjacent environments, learning from the company's internal smart systems, and seeing what 'production' actually looks like beyond a notebook.",
  chapters: [
    {
      number: "01",
      kicker: "The setting",
      title: "Healthcare-adjacent R&D, real data, senior engineers.",
      body:
        "OKTAN is a Turkish health R&D company building smart systems. I joined the AI team as an intern and was given the kind of access that interns rarely get: real datasets, real deployment paths, the engineers willing to explain the why. My job was to deploy AI applications and observe how they behaved once they left the notebook.",
      placeholder: {
        label: "OKTAN — workspace",
        filename: "experience/oktan-01-team.png",
      },
    },
    {
      number: "02",
      kicker: "What I did",
      title: "Deployed models, tuned them, and learned the boring parts.",
      body:
        "The work itself was unglamorous and exactly right for the moment. I deployed AI models and supporting services, tuned them against real-world data, and contributed to feature work alongside senior engineers — the parts of ML nobody puts in tutorials.",
      bullets: [
        "Deployed AI models and supporting services into production-adjacent environments.",
        "Tuned models against real, messy data — the kind notebooks never show.",
        "Learned from the internal smart-systems platform — observability, monitoring, deployment paths.",
      ],
      placeholder: {
        label: "Deployment & monitoring",
        filename: "experience/oktan-02-deploy.png",
      },
    },
    {
      number: "03",
      kicker: "What I took with me",
      title: "Production is the design constraint. Not an afterthought.",
      body:
        "OKTAN reframed how I build. A model that only works in a notebook isn't a product. Every project I've shipped since — Let's Note AI, Tummie, Moonshot, NanoShield — assumes deployment, observability, and a feedback loop from day one. That's the actual lesson of this internship.",
      placeholder: {
        label: "Reflections & takeaways",
        filename: "experience/oktan-03-reflections.png",
      },
    },
  ],
  next: { name: "Bull Teknoloji", href: "/experience/bull" },
});

export const studies = {
  "lets-note": letsNoteStudy,
  tummie: tummieStudy,
  moonshot: moonshotStudy,
  bull: bullStudy,
  oktan: oktanStudy,
};

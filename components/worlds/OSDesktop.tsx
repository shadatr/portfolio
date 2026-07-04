"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, experience, skills } from "@/lib/data";
import Terminal from "@/components/ui-kit/Terminal";

/* ============================================================================
   ShadaOS — the portfolio as a playful fake operating system.
   Menu bar · wallpaper · desktop icons · draggable windows · dock.
   Every app renders real content from lib/data.ts; case studies open their
   existing routes.
   ============================================================================ */

type AppId =
  | "lets-note"
  | "tummie"
  | "moonshot"
  | "about"
  | "skills"
  | "experience"
  | "chat"
  | "terminal"
  | "trash";

type WinState = { open: boolean; min: boolean; z: number };

const ACCENT_GRADIENT: Record<string, string> = {
  cyan: "linear-gradient(120deg, #2FB8C9, #1E5FA8)",
  violet: "linear-gradient(120deg, #8A63E8, #C24B9A)",
  mint: "linear-gradient(120deg, #3FCF8E, #1E8A6E)",
};

const APPS: {
  id: AppId;
  icon: string;
  title: string;
  file: string;
  w: number;
  x: number; // initial offset, % of desktop width
  y: number; // % of desktop height
}[] = [
  { id: "lets-note", icon: "📚", title: "Let's Note AI", file: "lets-note.app", w: 480, x: 16, y: 12 },
  { id: "tummie", icon: "🫧", title: "Tummie", file: "tummie.app", w: 480, x: 22, y: 20 },
  { id: "moonshot", icon: "🌙", title: "Moonshot Monitor", file: "moonshot.app", w: 480, x: 28, y: 28 },
  { id: "about", icon: "📝", title: "about.txt", file: "about.txt", w: 440, x: 44, y: 10 },
  { id: "skills", icon: "⚙️", title: "System Capabilities", file: "skills.prefs", w: 500, x: 36, y: 24 },
  { id: "experience", icon: "🗂️", title: "experience.log", file: "experience.log", w: 500, x: 30, y: 16 },
  { id: "chat", icon: "💬", title: "hire-me.chat", file: "hire-me.chat", w: 420, x: 50, y: 22 },
  { id: "terminal", icon: "🖥️", title: "shada — zsh", file: "terminal", w: 480, x: 40, y: 32 },
  { id: "trash", icon: "🗑️", title: "Trash", file: "rejected ideas", w: 400, x: 52, y: 34 },
];

/* --------------------------------- apps ---------------------------------- */

function ProjectApp({ slug }: { slug: "lets-note" | "tummie" | "moonshot" }) {
  const p = projects.find((x) => x.slug === slug)!;
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex h-28 items-end rounded-lg p-3"
        style={{ background: ACCENT_GRADIENT[p.accent] }}
      >
        <div>
          <div className="font-display text-lg font-bold leading-tight text-white drop-shadow">
            {p.name}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
            {p.tagline} · {p.year}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-text-mid">{p.oneLiner}</p>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
        {p.role}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-ink-line bg-ink-base/60 px-2 py-1 font-mono text-[10px] text-text-mid"
          >
            {s}
          </span>
        ))}
      </div>
      <Link
        href={p.href}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-[rgb(var(--accent-primary)/0.14)] px-3.5 py-2 text-sm font-medium text-[rgb(var(--accent-glow))] ring-1 ring-[rgb(var(--accent-primary)/0.3)] transition-colors hover:bg-[rgb(var(--accent-primary)/0.22)]"
      >
        Open full case study →
      </Link>
    </div>
  );
}

function AboutApp() {
  return (
    <div className="flex flex-col gap-3 font-mono text-[13px] leading-relaxed text-text-mid">
      <p>
        <span className="text-[rgb(var(--accent-glow))]">$ whoami</span>
        <br />
        Shada Daab — software engineer &amp; designer, Istanbul.
      </p>
      <p>
        By day I build low-latency trading platforms at Bull Teknoloji — Next.js
        UIs over Go backends, real-time risk systems around an FPGA core.
      </p>
      <p>
        By night I ship AI products end-to-end: an AI study companion, a
        gut-health app, a Solana token watcher written in Rust. Design included
        — I like software that feels alive.
      </p>
      <p className="text-text-dim">
        This whole OS is one of five worlds this portfolio can wear. Try the
        dock at the bottom. 🌍
      </p>
    </div>
  );
}

function SkillsApp() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} className="rounded-xl border border-ink-line bg-ink-base/50 p-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--accent-glow))]">
            {group}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {items.map((s) => (
              <span key={s} className="rounded-md bg-text-high/[0.05] px-2 py-1 text-[11px] text-text-mid">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceApp() {
  return (
    <div className="flex flex-col gap-4">
      {experience.map((e) => (
        <div key={e.slug} className="rounded-xl border border-ink-line bg-ink-base/50 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="font-display text-sm font-semibold text-text-high">
              {e.role} · {e.company}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
              {e.period}
            </div>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-text-mid">{e.blurb}</p>
          <Link
            href={e.href}
            className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(var(--accent-glow))] hover:underline"
          >
            read the log →
          </Link>
        </div>
      ))}
    </div>
  );
}

function ChatApp() {
  const [draft, setDraft] = useState("");
  const send = () => {
    const body = encodeURIComponent(draft || "Hi Shada — saw your portfolio and…");
    window.location.href = `mailto:shadadaab@gmail.com?subject=${encodeURIComponent(
      "Found you through ShadaOS"
    )}&body=${body}`;
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-ink-base/70 px-3.5 py-2 text-[13px] text-text-mid">
          hey! 👋 inbox is open — freelance, full-time, or just to talk shop.
        </div>
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-ink-base/70 px-3.5 py-2 text-[13px] text-text-mid">
          type below and hit send — it opens a real email to me.
        </div>
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="your message…"
          className="min-w-0 flex-1 rounded-full border border-ink-line bg-ink-base/60 px-3.5 py-2 text-[13px] text-text-high placeholder:text-text-dim focus:outline-none focus:ring-1 focus:ring-[rgb(var(--accent-primary)/0.5)]"
        />
        <button
          onClick={send}
          className="rounded-full bg-[rgb(var(--accent-primary)/0.16)] px-4 py-2 text-[13px] font-medium text-[rgb(var(--accent-glow))] ring-1 ring-[rgb(var(--accent-primary)/0.35)] transition-colors hover:bg-[rgb(var(--accent-primary)/0.26)]"
        >
          send
        </button>
      </div>
      <div className="flex gap-3 border-t border-ink-line pt-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        <a href="https://github.com/shadatr" target="_blank" rel="noreferrer" className="text-text-dim transition-colors hover:text-[rgb(var(--accent-glow))]">
          github ↗
        </a>
        <a href="https://www.linkedin.com/in/shada-daab-990451266/" target="_blank" rel="noreferrer" className="text-text-dim transition-colors hover:text-[rgb(var(--accent-glow))]">
          linkedin ↗
        </a>
        <a href="mailto:shadadaab@gmail.com" className="text-text-dim transition-colors hover:text-[rgb(var(--accent-glow))]">
          email ↗
        </a>
      </div>
    </div>
  );
}

function TrashApp() {
  const ideas = [
    ["☀️ light mode", "too bright. we live in the dark now."],
    ["🖱️ autoplaying music", "you're welcome."],
    ["📄 PDF-style resume site", "this OS is the resume."],
    ["🌀 skill percentage bars", "React: 87%? measured how?"],
    ["✨ blockchain portfolio", "no."],
  ];
  return (
    <div className="flex flex-col gap-2">
      {ideas.map(([name, why]) => (
        <div key={name} className="flex items-baseline justify-between gap-3 rounded-lg bg-ink-base/50 px-3 py-2">
          <span className="text-[13px] text-text-mid line-through decoration-text-dim/60">{name}</span>
          <span className="text-right font-mono text-[10px] text-text-dim">{why}</span>
        </div>
      ))}
      <div className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
        items cannot be restored. ideas were bad.
      </div>
    </div>
  );
}

function TerminalApp() {
  return (
    <Terminal
      title="shada — zsh — 80×24"
      speed={10}
      lines={[
        { type: "cmd", text: "whoami" },
        { type: "out", text: "shada — engineer, designer, night-shipper", color: "green" },
        { type: "cmd", text: "ls ~/worlds" },
        { type: "out", text: "space/  liquid/  deep/  toybox/  shadaos/  ← you are here", color: "dim" },
        { type: "cmd", text: "cat /etc/motd" },
        { type: "out", text: "every pixel here is handmade. poke around.", color: "cyan" },
        { type: "cmd", text: "./hire-shada --now" },
        { type: "out", text: "opening hire-me.chat … say hi 👋", color: "green" },
      ]}
    />
  );
}

function AppContent({ id }: { id: AppId }) {
  switch (id) {
    case "lets-note":
    case "tummie":
    case "moonshot":
      return <ProjectApp slug={id} />;
    case "about":
      return <AboutApp />;
    case "skills":
      return <SkillsApp />;
    case "experience":
      return <ExperienceApp />;
    case "chat":
      return <ChatApp />;
    case "terminal":
      return <TerminalApp />;
    case "trash":
      return <TrashApp />;
  }
}

/* --------------------------------- shell --------------------------------- */

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{now}</span>;
}

function BootScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 1700);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-[rgb(var(--ink-base))]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-display text-3xl font-bold tracking-tight text-text-high"
      >
        Shada<span className="text-[rgb(var(--accent-glow))]">OS</span>
      </motion.div>
      <div className="h-1 w-44 overflow-hidden rounded-full bg-text-high/10">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.35, ease: [0.4, 0, 0.2, 1] }}
          className="h-full w-full rounded-full bg-[rgb(var(--accent-primary))]"
        />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
        loading worlds · mounting /dev/portfolio
      </div>
    </motion.div>
  );
}

export default function OSDesktop() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const zTop = useRef(10);
  const [booting, setBooting] = useState(true);
  const [wins, setWins] = useState<Record<AppId, WinState>>(() =>
    Object.fromEntries(
      APPS.map((a) => [a.id, { open: false, min: false, z: 1 }])
    ) as Record<AppId, WinState>
  );

  // Boot only once per browser session.
  useEffect(() => {
    if (sessionStorage.getItem("shadaos-booted")) setBooting(false);
  }, []);
  const finishBoot = () => {
    sessionStorage.setItem("shadaos-booted", "1");
    setBooting(false);
    openApp("about");
  };
  useEffect(() => {
    // If we skipped boot (already booted this session), still greet once.
    if (!booting && !sessionStorage.getItem("shadaos-greeted")) {
      sessionStorage.setItem("shadaos-greeted", "1");
      openApp("about");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting]);

  const openApp = (id: AppId) =>
    setWins((w) => ({
      ...w,
      [id]: { open: true, min: false, z: ++zTop.current },
    }));
  const closeApp = (id: AppId) =>
    setWins((w) => ({ ...w, [id]: { ...w[id], open: false } }));
  const minApp = (id: AppId) =>
    setWins((w) => ({ ...w, [id]: { ...w[id], min: true } }));
  const focusApp = (id: AppId) =>
    setWins((w) =>
      w[id].z === zTop.current ? w : { ...w, [id]: { ...w[id], z: ++zTop.current } }
    );

  const openCount = useMemo(
    () => Object.values(wins).filter((w) => w.open).length,
    [wins]
  );

  return (
    <div
      ref={desktopRef}
      className="relative h-[100svh] w-full select-none overflow-hidden"
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 -z-10">
        <div className="aurora absolute inset-0" />
        <div className="bg-pattern absolute inset-0 opacity-60" />
        <div className="center-vignette absolute inset-0" />
      </div>

      <AnimatePresence>{booting && <BootScreen onDone={finishBoot} />}</AnimatePresence>

      {/* Menu bar */}
      <div className="glass relative z-40 flex h-8 items-center gap-4 px-3 text-[12px] text-text-mid">
        <span className="font-display font-bold text-text-high">
          ❖ Shada<span className="text-[rgb(var(--accent-glow))]">OS</span>
        </span>
        <span className="hidden font-medium sm:block">Portfolio</span>
        <span className="hidden text-text-dim sm:block">
          {openCount} window{openCount === 1 ? "" : "s"} open
        </span>
        <span className="flex-1" />
        <a href="https://github.com/shadatr" target="_blank" rel="noreferrer" className="hidden font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:text-text-high sm:block">
          gh
        </a>
        <a href="https://www.linkedin.com/in/shada-daab-990451266/" target="_blank" rel="noreferrer" className="hidden font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:text-text-high sm:block">
          in
        </a>
        <span>🔋 ∞</span>
        <Clock />
      </div>

      {/* Desktop icons */}
      <div className="absolute left-3 top-12 z-10 grid grid-cols-1 gap-1 sm:left-4">
        {APPS.map((a) => (
          <button
            key={a.id}
            onDoubleClick={() => openApp(a.id)}
            onClick={() => openApp(a.id)}
            className="group flex w-[76px] flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-text-high/[0.06] focus-visible:bg-text-high/[0.08]"
          >
            <span className="text-[26px] leading-none drop-shadow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
              {a.icon}
            </span>
            <span className="max-w-full truncate font-mono text-[9.5px] text-text-mid">
              {a.file}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {APPS.map((a) => {
        const w = wins[a.id];
        if (!w.open) return null;
        return (
          <motion.div
            key={a.id}
            drag
            dragConstraints={desktopRef}
            dragMomentum={false}
            dragElastic={0}
            onPointerDown={() => focusApp(a.id)}
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{
              opacity: w.min ? 0 : 1,
              scale: w.min ? 0.9 : 1,
              y: w.min ? 40 : 0,
              pointerEvents: w.min ? "none" : "auto",
            }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            style={{
              zIndex: w.z,
              left: `${a.x}%`,
              top: `${a.y}%`,
              width: `min(${a.w}px, 92vw)`,
            }}
            className="glass-strong absolute overflow-hidden rounded-xl"
          >
            {/* Title bar */}
            <div className="flex cursor-grab items-center gap-2 border-b border-text-high/[0.06] bg-ink-base/40 px-3 py-2 active:cursor-grabbing">
              <button
                aria-label={`Close ${a.title}`}
                onClick={() => closeApp(a.id)}
                onPointerDown={(e) => e.stopPropagation()}
                className="h-3 w-3 rounded-full bg-[#FF5F57] transition-transform hover:scale-110"
              />
              <button
                aria-label={`Minimize ${a.title}`}
                onClick={() => minApp(a.id)}
                onPointerDown={(e) => e.stopPropagation()}
                className="h-3 w-3 rounded-full bg-[#FEBC2E] transition-transform hover:scale-110"
              />
              <span className="h-3 w-3 rounded-full bg-[#28C840]/50" />
              <span className="ml-2 truncate font-mono text-[11px] text-text-mid">
                {a.icon} {a.title}
              </span>
            </div>
            <div className="max-h-[54vh] overflow-y-auto p-4" onPointerDown={(e) => e.stopPropagation()}>
              <AppContent id={a.id} />
            </div>
          </motion.div>
        );
      })}

      {/* Dock — sits above the global world switcher pill */}
      <div className="absolute bottom-[4.4rem] left-1/2 z-40 -translate-x-1/2">
        <div className="glass-strong flex items-end gap-1 rounded-2xl px-2.5 py-2">
          {APPS.map((a) => {
            const w = wins[a.id];
            return (
              <button
                key={a.id}
                onClick={() => (w.open && !w.min ? minApp(a.id) : openApp(a.id))}
                aria-label={a.title}
                title={a.title}
                className="group relative flex flex-col items-center px-0.5"
              >
                <span className="text-[22px] leading-none transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-125">
                  {a.icon}
                </span>
                <span
                  className={`mt-1 h-1 w-1 rounded-full transition-opacity ${
                    w.open ? "bg-[rgb(var(--accent-glow))] opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import MagneticButton from "../ui-kit/MagneticButton";

type Bubble = {
  side: "in" | "out"; // "in" = from someone else; "out" = from Shada
  who: string;
  initials: string;
  avatarBg: string; // gradient class
  text: string;
  reaction?: string;
  delay: number;
};

const CHAT: Bubble[] = [
  {
    side: "in",
    who: "Recruiter",
    initials: "R",
    avatarBg: "bg-gradient-to-br from-violet-soft to-violet-pop",
    text: "Hey Shada — saw the FLARE work. Got 10 min for a quick call?",
    delay: 0.15,
  },
  {
    side: "out",
    who: "Shada",
    initials: "S",
    avatarBg: "bg-gradient-to-br from-cyan-glow to-cyan-neon",
    text: "Hi! Yes — send the brief over too if you have one 👀",
    delay: 0.55,
  },
  {
    side: "in",
    who: "Founder",
    initials: "F",
    avatarBg: "bg-gradient-to-br from-rose-300 to-rose-500",
    text: "Hey, looking for someone who can ship end-to-end. Solo. Aggressive timeline.",
    reaction: "🔥",
    delay: 1.0,
  },
  {
    side: "out",
    who: "Shada",
    initials: "S",
    avatarBg: "bg-gradient-to-br from-cyan-glow to-cyan-neon",
    text: "My favorite kind. What are we building?",
    delay: 1.45,
  },
  {
    side: "in",
    who: "Friend",
    initials: "M",
    avatarBg: "bg-gradient-to-br from-emerald-300 to-emerald-500",
    text: "is this where i ask you to redesign my site",
    delay: 1.95,
  },
  {
    side: "out",
    who: "Shada",
    initials: "S",
    avatarBg: "bg-gradient-to-br from-cyan-glow to-cyan-neon",
    text: "yes 🙂",
    delay: 2.35,
  },
];

const links = [
  { href: "https://github.com/shadatr", icon: GitHubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/shada-daab-990451266/",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  { href: "https://twitter.com/itsshdab", icon: XIcon, label: "X / Twitter" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-40 md:py-64 overflow-hidden border-t border-cyan-neon/15"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.12),transparent_55%)]" />
      <div className="absolute inset-0 aurora opacity-60 pointer-events-none" />

      <span className="crosshair top-10 left-10" />
      <span className="crosshair top-10 right-10" />
      <span className="crosshair bottom-10 left-10" />
      <span className="crosshair bottom-10 right-10" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
          {/* Left — editorial CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-neon shadow-[0_0_12px_rgba(34,211,238,0.9)] animate-pulse" />
              06 / inbox open
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display font-bold text-text-high text-[64px] md:text-[128px] xl:text-[156px] leading-[0.86] tracking-[-0.03em]"
            >
              Slide{" "}
              <span className="font-editorial italic font-normal text-gradient-warm">
                in.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 max-w-xl text-md md:text-lg text-text-mid leading-relaxed"
            >
              These are real-ish conversations. If you&apos;ve got a brief, a
              role, a wild idea, or a friend&apos;s site to fix — the inbox is
              open. Open to full-time, part-time, freelance, remote.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton href="mailto:shadadaab@gmail.com">
                <EmailIcon sx={{ fontSize: 18 }} /> shadadaab@gmail.com
              </MagneticButton>
              <MagneticButton
                href="https://www.linkedin.com/in/shada-daab-990451266/"
                variant="ghost"
              >
                LinkedIn ↗
              </MagneticButton>
            </motion.div>

            <div className="mt-7 flex items-center gap-2">
              {links.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  data-cursor="hover"
                  className="h-11 w-11 grid place-items-center rounded-full border border-ink-line hover:border-cyan-neon hover:text-cyan-neon transition-colors"
                >
                  <Icon sx={{ fontSize: 20 }} />
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xsm text-text-mid font-mono">
              <span className="flex items-center gap-1.5">
                <PlaceIcon sx={{ fontSize: 16 }} /> Istanbul, Türkiye
              </span>
              <span className="text-text-dim">·</span>
              <span>+90 534 605 5578</span>
            </div>
          </div>

          {/* Right — chat illustration */}
          <ChatIllustration />
        </div>

        {/* Footer signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-28 pt-8 border-t border-ink-line/60 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim"
        >
          <span>© {new Date().getFullYear()} Shada Daab</span>
          <span className="font-editorial italic normal-case tracking-normal text-text-mid">
            designed &amp; built with care · in Istanbul
          </span>
          <span>v3.0 · {new Date().toISOString().slice(0, 10)}</span>
        </motion.div>
      </div>
    </section>
  );
}

function ChatIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      {/* Bubbles — no card frame, just floating on the dark background */}
      <div className="space-y-4 md:space-y-5">
        {CHAT.map((b, i) => (
          <ChatBubble key={i} bubble={b} />
        ))}
      </div>

      {/* Typing indicator */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.8, duration: 0.4 }}
        className="mt-5 flex items-center gap-2 pl-12"
      >
        <div className="rounded-2xl rounded-bl-md bg-ink-surface/60 px-3 py-2 flex items-center gap-1">
          <Dot delay={0} />
          <Dot delay={0.15} />
          <Dot delay={0.3} />
        </div>
        <span className="font-mono text-xxsm text-text-dim">
          someone is typing…
        </span>
      </motion.div>
    </motion.div>
  );
}

function ChatBubble({ bubble }: { bubble: Bubble }) {
  const isOut = bubble.side === "out";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: bubble.delay,
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={`flex items-end gap-2.5 ${isOut ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 h-9 w-9 rounded-full grid place-items-center font-display font-semibold text-sm text-ink-base ${bubble.avatarBg} shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]`}
      >
        {bubble.initials}
      </div>

      {/* Bubble + meta */}
      <div className={`flex flex-col ${isOut ? "items-end" : "items-start"} max-w-[78%]`}>
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.22em] text-text-dim mb-1 ${
            isOut ? "text-right" : "text-left"
          }`}
        >
          {bubble.who}
        </div>
        <div className="relative">
          <div
            className={`px-4 py-2.5 text-sm leading-relaxed ${
              isOut
                ? "bg-cyan-neon text-ink-base rounded-2xl rounded-br-md font-medium"
                : "bg-ink-surface/70 text-text-high rounded-2xl rounded-bl-md"
            }`}
          >
            {bubble.text}
          </div>
          {bubble.reaction && (
            <span
              className={`absolute -bottom-2 ${isOut ? "-left-2" : "-right-2"} text-lg select-none`}
            >
              {bubble.reaction}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: 1.1,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className="h-1.5 w-1.5 rounded-full bg-text-mid"
    />
  );
}

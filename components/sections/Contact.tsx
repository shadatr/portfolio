"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

/* ============================================================================
   CONTACT — one action, said once, said big.
   A giant email you can click or copy, three social links, one meta line.
   ============================================================================ */

const EMAIL = "shadadaab@gmail.com";

const LINKS = [
  { href: "https://github.com/shadatr", icon: GitHubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/shada-daab-990451266/",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  { href: "https://twitter.com/itsshdab", icon: XIcon, label: "X / Twitter" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link still works.
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-ink-line/60 py-40 md:py-64"
    >
      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-3 font-mono text-xxsm uppercase tracking-[0.3em] text-cyan-neon"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
          08 / Contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-display font-bold text-text-high text-[52px] md:text-[110px] leading-[0.9] tracking-[-0.03em] [text-wrap:balance]"
        >
          Let&apos;s work{" "}
          <span className="font-editorial italic font-normal text-gradient-warm">
            together.
          </span>
        </motion.h2>

        {/* The email IS the interface */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 md:mt-24"
        >
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="group relative inline-block font-display font-semibold tracking-tight text-text-high transition-colors duration-500 hover:text-[rgb(var(--accent-glow))] text-[clamp(22px,5.2vw,64px)]"
          >
            {EMAIL}
            <span
              aria-hidden
              className="absolute -bottom-2 left-0 block h-[3px] w-full origin-left scale-x-0 rounded-full bg-[rgb(var(--accent-primary))] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100"
            />
          </a>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={copy}
              data-cursor="hover"
              className={`rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-500 ${
                copied
                  ? "border-[rgb(var(--accent-primary)/0.5)] bg-[rgb(var(--accent-primary)/0.12)] text-[rgb(var(--accent-glow))]"
                  : "border-ink-line text-text-mid hover:border-[rgb(var(--accent-primary)/0.4)] hover:text-text-high"
              }`}
            >
              {copied ? "copied ✓" : "copy email"}
            </button>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          {LINKS.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              data-cursor="hover"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink-line text-text-mid transition-all duration-500 hover:-translate-y-1 hover:border-[rgb(var(--accent-primary)/0.5)] hover:text-[rgb(var(--accent-glow))]"
            >
              <Icon sx={{ fontSize: 20 }} />
            </Link>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 font-mono text-xxsm uppercase tracking-[0.26em] text-text-dim"
        >
          Istanbul · UTC+3 · full-time / freelance / remote
        </motion.p>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-28 flex flex-col items-center justify-between gap-3 border-t border-ink-line/60 pt-8 font-mono text-xxsm uppercase tracking-[0.22em] text-text-dim md:flex-row"
        >
          <span>© {new Date().getFullYear()} Shada Daab</span>
          <span className="font-editorial italic normal-case tracking-normal text-text-mid">
            designed &amp; built by Shada Daab
          </span>
          <span>v4.0</span>
        </motion.div>
      </div>
    </section>
  );
}

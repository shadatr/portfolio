"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between transition-all rounded-full",
          scrolled
            ? "glass-strong mx-3 md:mx-auto py-2 px-3"
            : "py-2 px-2"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group" data-cursor="hover">
          <div className="relative h-8 w-8 rounded-lg bg-ink-raised border border-cyan-neon/30 grid place-items-center overflow-hidden">
            <span className="font-display text-cyan-neon font-bold text-sm">
              S
            </span>
            <span className="absolute inset-0 bg-radial-glow opacity-50" />
          </div>
          <div className="font-display font-semibold text-text-high tracking-tight hidden md:block">
            shada<span className="text-cyan-neon">.</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={isHome ? l.href.replace("/", "") : l.href}
              className="text-xxsm md:text-xsm font-mono uppercase tracking-[0.18em] px-2 md:px-3 py-2 rounded-full text-text-mid hover:text-cyan-neon transition-colors"
              data-cursor="hover"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

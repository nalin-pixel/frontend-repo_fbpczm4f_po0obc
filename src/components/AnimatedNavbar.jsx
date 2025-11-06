import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Settings, Home, LayoutGrid } from 'lucide-react';

export default function AnimatedNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-white">
        <a href="/" className="group inline-flex items-center gap-2">
          <Rocket className="h-5 w-5 text-purple-400 transition group-hover:rotate-12" />
          <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-lg font-semibold text-transparent">Vibe Modes</span>
        </a>
        <nav className="hidden items-center gap-6 sm:flex">
          <NavLink href="#modes">Modes</NavLink>
          <NavLink href="#wellbeing">Wellbeing</NavLink>
          <NavLink href="#footer">About</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#modes" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-white/10">Get Started</a>
          <button aria-label="Settings" className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <motion.a
      href={href}
      className="relative text-sm text-zinc-300 transition hover:text-white"
      whileHover={{ y: -1 }}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
        layoutId="nav-underline"
      />
    </motion.a>
  );
}

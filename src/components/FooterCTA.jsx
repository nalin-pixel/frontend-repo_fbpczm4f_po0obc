import React from 'react';
import { motion } from 'framer-motion';

export default function FooterCTA() {
  return (
    <footer className="relative w-full bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/30 via-fuchsia-600/20 to-cyan-600/30 p-10 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold">Ready to explore your personalized space?</h3>
          <p className="mt-2 max-w-2xl text-zinc-200">
            Choose a mode above to get redirected into a tailored interface. Your selection is saved for future visits.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#modes" className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-100">Select a mode</a>
            <a href="#wellbeing" className="rounded-lg border border-white/20 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10">Check wellbeing</a>
          </div>
        </motion.div>
        <div className="mt-8 text-center text-sm text-zinc-400">
          Built with love, motion, and accessibility in mind.
        </div>
      </div>
    </footer>
  );
}

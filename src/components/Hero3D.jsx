import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative min-h-[78vh] w-full overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Full-width Spline cover background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-20 pb-16 sm:pt-28 lg:flex-row lg:justify-between lg:pt-32">
        <motion.div
          className="z-10 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 backdrop-blur">
            <Sparkles className="h-4 w-4 text-purple-300" />
            Introducing Vamverse
          </div>
          <h1 className="mt-3 bg-gradient-to-br from-white via-zinc-100 to-purple-200 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl">
            Digital wellbeing for every generation
          </h1>
          <p className="mt-5 text-balance text-lg text-zinc-300">
            Vamverse helps Adults, Youth, and Enterprises build healthy digital habits. Choose a mode
            that fits your world—our adaptive platform personalizes focus, safety, and balance.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <motion.a
              href="#modes"
              className="group inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-medium text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500"
              whileTap={{ scale: 0.98 }}
            >
              <Rocket className="h-5 w-5 transition group-hover:translate-x-0.5" />
              Explore modes
            </motion.a>
            <a
              href="#wellbeing"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-medium text-zinc-200 backdrop-blur transition hover:bg-white/10"
            >
              See wellbeing insights
            </a>
          </div>
        </motion.div>

        <motion.div
          className="z-10 mt-14 grid grid-cols-2 gap-4 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {["Personalized", "Protective", "Measurable", "Scalable"].map((tag, i) => (
            <motion.div
              key={tag}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-zinc-200 backdrop-blur"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

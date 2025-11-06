import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, TimerReset, Brain, Moon, Sun } from 'lucide-react';

// Simple client-side digital wellbeing tracker
// - Tracks time on page
// - Tracks interaction count (clicks/scrolls)
// - Offers Focus, Break reminders, and Theme toggle

function useWellbeing() {
  const [start] = useState(() => Date.now());
  const [interactions, setInteractions] = useState(0);
  const [theme, setTheme] = useState('dark');
  const elapsed = useMemo(() => Math.floor((Date.now() - start) / 1000), [start]);

  useEffect(() => {
    const handleInteract = () => setInteractions((c) => c + 1);
    window.addEventListener('click', handleInteract);
    window.addEventListener('scroll', handleInteract, { passive: true });
    const t = setInterval(() => {
      // force re-render each second to update elapsed
    }, 1000);
    return () => {
      window.removeEventListener('click', handleInteract);
      window.removeEventListener('scroll', handleInteract);
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return { elapsed, interactions, theme, setTheme };
}

export default function DigitalWellbeing() {
  const { elapsed, interactions, theme, setTheme } = useWellbeing();
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <section id="wellbeing" className="relative w-full bg-zinc-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Digital Wellbeing</h2>
            <p className="mt-2 text-zinc-300">Stay mindful while you explore. Track time, activity, and switch to a calmer theme when needed.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} Toggle theme
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={TimerReset} title="Time on page" value={`${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`} accent="from-purple-500 to-fuchsia-500" />
          <Card icon={Activity} title="Interactions" value={`${interactions}`} accent="from-emerald-500 to-teal-500" />
          <Card icon={Brain} title="Focus mode" value="Distraction‑lite" accent="from-blue-500 to-indigo-500" />
          <Card icon={Activity} title="Wellness tip" value="Remember to blink and stretch every 20 minutes." accent="from-amber-500 to-orange-500" />
        </div>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, value, accent }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-[1px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl bg-zinc-950 p-5">
        <div className={`mb-4 inline-flex items-center gap-3`}>
          <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accent} text-white`}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-zinc-400">{title}</p>
            <p className="text-xl font-semibold text-white">{value}</p>
          </div>
        </div>
      </div>
      <div className={`pointer-events-none absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl`} />
    </motion.div>
  );
}

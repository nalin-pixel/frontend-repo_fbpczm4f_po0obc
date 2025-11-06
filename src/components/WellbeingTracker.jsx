import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Timer, MousePointer, Moon, Sun, BarChart3 } from 'lucide-react';

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec]
    .map((v) => String(v).padStart(2, '0'))
    .join(':');
}

export default function WellbeingTracker() {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(Date.now());
  const [clicks, setClicks] = useState(0);
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('wb_dark') === '1'; } catch { return true; }
  });

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('wb_dark', dark ? '1' : '0'); } catch {}
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  const session = now - start;
  const pace = useMemo(() => (clicks ? (session / clicks) : 0), [session, clicks]);

  return (
    <section id="wellbeing" className="relative w-full bg-zinc-50 py-16 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Digital Wellbeing</h2>
            <p className="mt-1 text-zinc-600 dark:text-zinc-300">Live session metrics. Your data stays in your browser.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? 'Light mode' : 'Dark mode'}
            </button>
            <button
              onClick={() => { setClicks(0); }}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Reset metrics
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard icon={Timer} label="Session Time" value={formatDuration(session)} accent="from-purple-500 to-fuchsia-500" />
          <StatCard icon={MousePointer} label="Interactions" value={`${clicks}`} accent="from-blue-500 to-cyan-500" />
          <StatCard icon={Activity} label="Avg sec / click" value={pace ? (pace / 1000).toFixed(1) : '—'} accent="from-emerald-500 to-teal-500" />
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <BarChart3 className="h-4 w-4" />
            Interactions over time (last 30s)
          </div>
          <Sparkline clicks={clicks} onClick={() => setClicks((c) => c + 1)} />
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Tip: Click anywhere on the graph to simulate interactions.</p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-2xl`} />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">{label}</div>
          <div className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-white">{value}</div>
        </div>
        <div className="rounded-xl bg-zinc-100 p-3 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}

function Sparkline({ clicks, onClick }) {
  const [data, setData] = useState(() => Array(30).fill(0));

  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => {
        const next = d.slice(1).concat([Math.max(0, d[d.length - 1] - 1)]);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setData((d) => {
      const next = d.slice();
      next[next.length - 1] = Math.min(10, (next[next.length - 1] || 0) + 2);
      return next;
    });
  }, [clicks]);

  const max = Math.max(10, ...data);

  return (
    <div onClick={onClick} className="h-32 w-full cursor-crosshair select-none rounded-xl bg-gradient-to-b from-zinc-50 to-zinc-100 p-3 dark:from-zinc-800 dark:to-zinc-900">
      <svg width="100%" height="100%" viewBox={`0 0 100 ${max}`} preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2"
          points={data.map((v, i) => `${(i / (data.length - 1)) * 100},${max - v}`).join(' ')}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

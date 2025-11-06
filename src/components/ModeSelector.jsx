import React from 'react';
import { motion } from 'framer-motion';
import { Child, User, Building2 } from 'lucide-react';

const modes = [
  {
    key: 'youth',
    title: 'Youth Mode',
    desc: 'Bright, playful visuals with extra guidance and guardrails.',
    color: 'from-pink-500 to-rose-500',
    icon: Child,
    href: '/youth'
  },
  {
    key: 'adult',
    title: 'Adult Mode',
    desc: 'Balanced animations, privacy-first defaults, and focus tools.',
    color: 'from-blue-500 to-indigo-500',
    icon: User,
    href: '/adult'
  },
  {
    key: 'enterprise',
    title: 'Enterprise Mode',
    desc: 'Compliance-ready dashboards, SSO, and granular controls.',
    color: 'from-emerald-500 to-teal-500',
    icon: Building2,
    href: '/enterprise'
  }
];

export default function ModeSelector() {
  return (
    <section id="modes" className="relative w-full bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your mode
          </h2>
          <p className="mt-3 text-zinc-300">Each mode tunes animations, content density, and wellbeing policies.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {modes.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.a
                key={m.key}
                href={m.href}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${m.color} p-[1px]`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
              >
                <div className="h-full w-full rounded-2xl bg-black p-6">
                  <div className="mb-4 inline-flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${m.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{m.title}</h3>
                      <p className="text-sm text-zinc-300">{m.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-zinc-300">
                    <span className="transition group-hover:text-white">Tap to continue</span>
                    <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

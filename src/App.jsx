import React, { useEffect } from 'react';
import Hero3D from './components/Hero3D';
import ModeSelector from './components/ModeSelector';
import WellbeingTracker from './components/WellbeingTracker';
import FooterCTA from './components/FooterCTA';

function App() {
  // Auto-redirect to saved mode if the route is root
  useEffect(() => {
    const path = window.location.pathname;
    const preferred = (() => { try { return localStorage.getItem('preferred_mode'); } catch { return null; } })();
    const known = ['/youth', '/adult', '/enterprise'];
    if (path === '/' && preferred) {
      const map = { youth: '/youth', adult: '/adult', enterprise: '/enterprise' };
      const target = map[preferred];
      if (target) window.location.replace(target);
    }
    // If navigated to a mode page directly, enhance the experience
    if (known.includes(path)) {
      document.title = `${path.slice(1)} mode – Futuristic Experience`;
    }
  }, []);

  // Simple mode layouts based on route without external router
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/youth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-50 text-zinc-900">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight">Youth Mode</h1>
          <p className="mt-3 text-lg text-zinc-700">Playful motion, vibrant gradients, and guided tips.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-pink-200/70 bg-white p-6 shadow-lg">
                <div className="h-32 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 opacity-90" />
                <h3 className="mt-4 text-xl font-semibold">Interactive Card {i + 1}</h3>
                <p className="text-zinc-600">Tap and explore—micro-animations guide the way.</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-sm text-zinc-600">Want a different feel? <a href="/" className="underline">Change mode</a></div>
        </section>
      </div>
    );
  }
  if (path === '/adult') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-zinc-900">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-5xl font-bold tracking-tight">Adult Mode</h1>
          <p className="mt-3 text-lg text-zinc-700">Calm motion, readable typography, focus-first layout.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Overview","Projects","Calendar"].map((t) => (
              <div key={t} className="rounded-2xl border border-indigo-200/60 bg-white p-6 shadow-sm">
                <div className="h-32 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-400 opacity-80" />
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="text-zinc-600">Designed to help you get things done without distractions.</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-sm text-zinc-600">Prefer another vibe? <a href="/" className="underline">Change mode</a></div>
        </section>
      </div>
    );
  }
  if (path === '/enterprise') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-5xl font-semibold tracking-tight">Enterprise Mode</h1>
          <p className="mt-3 text-lg text-zinc-700">Reduced motion, high-contrast UI, analytics-ready modules.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {["Teams","Security","Compliance","Insights"].map((t) => (
              <div key={t} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-70" />
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="text-sm text-zinc-600">Enterprise-grade component with clear affordances.</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-sm text-zinc-600">Need a different setup? <a href="/" className="underline">Change mode</a></div>
        </section>
      </div>
    );
  }

  // Default landing with 3D hero and selectors
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Hero3D />
      <ModeSelector />
      <WellbeingTracker />
      <FooterCTA />
    </div>
  );
}

export default App;

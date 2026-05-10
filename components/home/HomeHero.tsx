import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { gsap } from '@/src/lib/gsap-register';
import { ArrowRight, MapPin, ShieldCheck, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/src/constants';

export function HomeHero() {
  const navigate = useNavigate();
  const bentoRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !bentoRef.current) return;
    const cells = bentoRef.current.querySelectorAll('.bento-cell');
    if (!cells.length) return;
    gsap.from(cells, {
      opacity: 0,
      y: 22,
      scale: 0.98,
      duration: 0.55,
      stagger: 0.09,
      ease: 'power3.out',
      delay: 0.12,
      clearProps: 'transform',
    });
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-linear-to-br from-[#e8eef9] via-[#f8fafc] to-[#fff4ec] pb-16 pt-14 md:pb-22 md:pt-20 lg:pb-28 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(26,60,110,0.12),transparent)]"
      />
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#1a3c6e]/10 blur-3xl" aria-hidden />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#f97316]/15 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a3c6e] shadow-sm ring-1 ring-slate-200/80">
              Trusted locally
            </span>
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/60">
              Verified providers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-balance font-bold leading-[1.08] tracking-tight text-[#0f2847] md:leading-[1.06]"
            style={{ fontSize: 'clamp(2.25rem, 5vw + 1rem, 3.85rem)' }}
          >
            Book experts near you —{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-[#1a3c6e] to-[#2563eb] bg-clip-text text-transparent">
                faster
              </span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-[#f97316]/35 blur-[2px]"
                aria-hidden
              />
            </span>{' '}
            with{' '}
            <span className="text-[#f97316]">Leads4u</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600 lg:mx-0"
          >
            Home, vehicle, wellness, education, and professional services — matched to vetted locals so you waste less time
            and get quality work done.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              onClick={() => navigate('/services/home-services')}
              size="lg"
              className="h-14 gap-2 rounded-2xl bg-[#1a3c6e] px-8 text-base font-semibold shadow-lg shadow-[#1a3c6e]/25 hover:bg-[#152e55]"
            >
              Browse services
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a href={getWhatsAppLink('Hi, I need help finding the right service on Leads4u.')} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-slate-300/90 bg-white/80 px-8 text-base font-semibold text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white"
              >
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-600 lg:justify-start"
          >
            <li className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80">
                <ShieldCheck className="h-[1.125rem] w-[1.125rem] text-emerald-600" />
              </span>
              <span className="font-medium text-slate-700">Vetted listings</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80">
                <Timer className="h-[1.125rem] w-[1.125rem] text-[#1a3c6e]" />
              </span>
              <span className="font-medium text-slate-700">Quick responses</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80">
                <MapPin className="h-[1.125rem] w-[1.125rem] text-[#f97316]" />
              </span>
              <span className="font-medium text-slate-700">Nearby pros</span>
            </li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="absolute inset-0 -z-10 scale-105 rounded-[2rem] bg-linear-to-br from-[#1a3c6e]/20 via-transparent to-[#f97316]/20 blur-xl" aria-hidden />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/60 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/80 backdrop-blur-md md:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-dashed border-slate-300/60 opacity-70" aria-hidden />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#f97316]/10 blur-2xl" aria-hidden />

            <div ref={bentoRef} className="grid gap-4 sm:grid-cols-2">
              <div className="bento-cell rounded-2xl bg-linear-to-br from-[#1a3c6e] to-[#274d8f] p-5 text-white shadow-inner transition-transform duration-300 hover:scale-[1.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/75">Popular right now</p>
                <p className="mt-3 text-2xl font-bold leading-tight">7 categories</p>
                <p className="mt-2 text-sm text-white/85">Explore home, logistics, pets, and more.</p>
              </div>
              <div className="bento-cell flex flex-col justify-center rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Avg. vibe</p>
                <p className="mt-3 text-xl font-bold text-[#0f2847]">Clear & calm</p>
                <p className="mt-2 text-sm leading-snug text-slate-600">Simple paths to WhatsApp help or deeper service pages.</p>
              </div>
              <div className="bento-cell rounded-2xl border border-emerald-200/70 bg-linear-to-br from-emerald-50/90 to-teal-50/50 p-5 transition-transform duration-300 hover:scale-[1.01] sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800/80">For customers</p>
                    <p className="mt-2 text-lg font-bold text-emerald-950">Find pros in minutes</p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0 rounded-xl bg-white font-semibold text-emerald-900 shadow-sm hover:bg-emerald-50"
                    onClick={() => navigate('/services/home-services')}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '@/src/constants';

export function HomeProviderCta() {
  const navigate = useNavigate();

  return (
    <section className="relative pb-24 pt-16 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-orange-400/35 bg-linear-to-br from-[#182a52] via-[#1a3c6e] to-[#0f2847] p-9 text-white shadow-[0_32px_64px_-32px_rgba(15,40,71,0.85)] md:p-14 lg:flex lg:min-h-[22rem] lg:items-center lg:justify-between lg:gap-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-[#f97316]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-40%] right-[-15%] h-[440px] w-[440px] rounded-full bg-orange-400/15 blur-[100px]"
          />

          <div className="relative z-10 max-w-xl lg:max-w-[26rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
              Provider program
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight md:text-[2.5rem] lg:text-[2.75rem]">
              Grow bookings with warmed-up leads
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-200/95">
              Join thousands of locals who rely on steady demand, simple WhatsApp pings, and a profile that earns trust fast.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                onClick={() => navigate('/auth?mode=register')}
                size="lg"
                className="h-14 rounded-2xl border-0 bg-white px-8 text-base font-bold text-[#0f2847] shadow-lg shadow-black/25 hover:bg-slate-100"
              >
                Register free
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-14 rounded-2xl border-white/55 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10"
              >
                <a href={getWhatsAppLink('Hi, I want to grow my service business with Leads4U.')} target="_blank" rel="noreferrer">
                  Talk on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-12 w-full max-w-sm lg:mx-0 lg:mt-0 lg:max-w-none lg:flex-1 lg:shrink lg:justify-end xl:flex xl:justify-end">
            <div className="relative xl:translate-x-2">
              <div className="absolute inset-4 rounded-[1.5rem] border border-white/10 bg-black/25 blur-xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[1.65rem] border border-white/20 bg-linear-to-br from-white/15 to-white/5 p-6 shadow-2xl backdrop-blur-md md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/95 shadow-inner">
                      <Zap className="h-6 w-6 text-white" aria-hidden />
                    </div>
                    <div>
                      <p className="font-semibold tracking-tight">New lead queued</p>
                      <p className="mt-1 text-xs text-slate-200/80">Urgent plumbing · 12 min ago</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90">
                    Hot
                  </span>
                </div>
                <div className="mt-8 space-y-3">
                  <div className="h-2.5 max-w-[55%] rounded-full bg-white/45" />
                  <div className="h-2.5 rounded-full bg-white/25" />
                  <div className="flex items-center gap-2 pt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-300" aria-hidden />
                    <p className="text-xs font-medium text-emerald-100/95">Higher close rate vs. cold calls</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

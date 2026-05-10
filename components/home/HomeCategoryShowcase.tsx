import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, getWhatsAppLink } from '@/src/constants';
import { SectionHeader } from './SectionHeader';

export function HomeCategoryShowcase() {
  const navigate = useNavigate();
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const activeCategory = CATEGORIES[activeServiceSlide];
  const progress = ((activeServiceSlide + 1) / CATEGORIES.length) * 100;

  const goToPrevService = () => {
    setActiveServiceSlide((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  };

  const goToNextService = () => {
    setActiveServiceSlide((prev) => (prev + 1) % CATEGORIES.length);
  };

  useEffect(() => {
    if (isSliderPaused) return;

    const timer = setInterval(() => {
      setActiveServiceSlide((prev) => (prev + 1) % CATEGORIES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isSliderPaused]);

  return (
    <section data-home-reveal className="relative bg-slate-50/80 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="md:max-w-xl md:text-left">
            <SectionHeader
              eyebrow="Categories"
              title="Swipe through everything we cover"
              description="Tap a lane below or use arrows — each hub opens sub-services instantly."
              align="left"
              className="!mb-0 md:!mb-0"
            />
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center md:flex-col md:items-end">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {activeServiceSlide + 1} / {CATEGORIES.length}
            </p>
            <div className="h-2 w-full min-w-[200px] overflow-hidden rounded-full bg-slate-200/90 sm:w-48">
              <div
                className="h-full rounded-full bg-linear-to-r from-[#1a3c6e] to-[#3b74c9] transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-2">
              {CATEGORIES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveServiceSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeServiceSlide ? 'w-8 bg-[#1a3c6e]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to service category ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="group/slide relative overflow-hidden rounded-[2rem] border border-white/90 bg-white shadow-[0_20px_50px_-20px_rgba(15,40,71,0.18)] ring-1 ring-slate-200/60"
          onMouseEnter={() => setIsSliderPaused(true)}
          onMouseLeave={() => setIsSliderPaused(false)}
        >
          <button
            type="button"
            onClick={goToPrevService}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 text-[#1a3c6e] shadow-md backdrop-blur-sm transition hover:scale-[1.03] hover:bg-white hover:shadow-lg md:flex"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNextService}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 text-[#1a3c6e] shadow-md backdrop-blur-sm transition hover:scale-[1.03] hover:bg-white hover:shadow-lg md:flex"
            aria-label="Next service"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {/* Mobile FAB nav */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2 md:hidden">
            <button
              type="button"
              onClick={goToPrevService}
              className="rounded-xl border border-white/70 bg-black/55 p-2.5 text-white backdrop-blur-sm"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNextService}
              className="rounded-xl border border-white/70 bg-black/55 p-2.5 text-white backdrop-blur-sm"
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeServiceSlide * 100}%)` }}
          >
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="min-w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div className="relative min-h-[280px] overflow-hidden lg:min-h-[520px]">
                    <img
                      src={cat.images[0]}
                      alt={cat.name}
                      className="h-full min-h-[280px] w-full object-cover lg:min-h-[520px]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0f2847]/90 via-[#0f2847]/20 to-transparent lg:bg-linear-to-r lg:from-[#0f2847]/80 lg:via-[#0f2847]/15 lg:to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
                      <div className="inline-flex max-w-full items-center gap-3 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg ring-1 ring-white/50 backdrop-blur-sm">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#eef3fb] to-white shadow-inner ring-1 ring-slate-200/70">
                          <cat.icon className="h-5 w-5 text-[#1a3c6e]" />
                        </span>
                        <span className="text-base font-bold tracking-tight text-[#0f2847]">{cat.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center bg-linear-to-br from-[#f8fafc] to-white px-6 py-8 md:p-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f97316]">Featured hub</p>
                    <h3 className="mt-2 text-4xl font-bold tracking-tight text-[#0f2847] md:text-[2.6rem] md:leading-tight">
                      {cat.name}
                    </h3>
                    <p className="mt-4 max-w-prose leading-relaxed text-slate-600">
                      Transparent communication, dependable timing, and people who actually show up — pick a tile or jump straight
                      in.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                      {cat.subcategories.slice(0, 4).map((sub) => (
                        <button
                          key={sub.slug}
                          type="button"
                          onClick={() => navigate(`/services/${cat.slug}/${sub.slug}`)}
                          className="group/btn rounded-2xl border border-slate-200/90 bg-white p-2 text-left shadow-sm ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1a3c6e]/20"
                        >
                          <div className="relative aspect-[5/3] overflow-hidden rounded-xl bg-slate-200">
                            <img
                              src={sub.images[0]}
                              alt={sub.name}
                              className="h-full w-full object-cover transition duration-500 ease-out group-hover/btn:scale-[1.04]"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent opacity-70" />
                          </div>
                          <p className="pt-2.5 text-sm font-semibold text-slate-800">{sub.name}</p>
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {cat.subcategories.slice(4).map((sub) => (
                        <button
                          key={sub.slug}
                          type="button"
                          onClick={() => navigate(`/services/${cat.slug}/${sub.slug}`)}
                          className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-[#1a3c6e]/35 hover:bg-slate-50"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        onClick={() => navigate(`/services/${cat.slug}`)}
                        className="rounded-xl bg-[#1a3c6e] px-6 font-semibold shadow-md shadow-[#1a3c6e]/20 hover:bg-[#152e55]"
                      >
                        Open category
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/services/${cat.slug}/${cat.subcategories[0].slug}`)}
                        className="rounded-xl border-slate-300 font-semibold text-[#1a3c6e]"
                      >
                        First service <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                      <a
                        href={getWhatsAppLink(`Hi, I need ${cat.name}.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-20 z-30 mt-6 rounded-[1.35rem] border border-white/95 bg-linear-to-br from-white/95 via-white to-slate-50/90 p-4 shadow-[0_12px_40px_-28px_rgba(15,40,71,0.35)] backdrop-blur-md lg:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4 overflow-x-auto">
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 md:inline">Jump</span>
            <div className="flex gap-2">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveServiceSlide(idx)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    idx === activeServiceSlide
                      ? 'bg-[#1a3c6e] text-white shadow-md shadow-[#1a3c6e]/25'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  {cat.name.replace(' Services', '').replace(' Service', '')}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200/70 pt-4">
            <span className="mb-1 w-full text-[11px] font-bold uppercase tracking-wider text-slate-400 lg:mb-0 lg:w-auto lg:pr-2">
              Under {activeCategory.name}
            </span>
            {activeCategory.subcategories.map((sub) => (
              <button
                key={sub.slug}
                type="button"
                onClick={() => navigate(`/services/${activeCategory.slug}/${sub.slug}`)}
                className="rounded-full bg-slate-100/95 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80 transition hover:bg-white hover:ring-[#1a3c6e]/25"
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

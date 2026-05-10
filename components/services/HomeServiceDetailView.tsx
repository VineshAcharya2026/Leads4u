import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  BadgeCheck,
  Bath,
  Bolt,
  Bug,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DoorOpen,
  Droplets,
  Filter,
  Flame,
  Gauge,
  GitBranch,
  Hammer,
  House,
  IndianRupee,
  Layers,
  Lightbulb,
  Paintbrush,
  PaintRoller,
  Plug,
  Radar,
  Refrigerator,
  Ruler,
  Scissors,
  Shield,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Sparkles,
  SprayCan,
  Star,
  ThermometerSun,
  ThumbsUp,
  TreePine,
  Video,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ServiceCategory, ServiceSubcategory } from '@/src/constants';
import { getWhatsAppLink } from '@/src/constants';
import type { HomeServiceDetailConfig } from '@/src/content/home-service-details/types';
import type { ServiceIconName } from '@/src/content/home-service-details/types';
import { homeServiceSubVideoSrc } from '@/src/content/service-videos';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

/** Step badges & inline accents */
const NAVY = '#1a3c6e';

const SERVICE_ICONS: Record<ServiceIconName, LucideIcon> = {
  flame: Flame,
  droplets: Droplets,
  bath: Bath,
  showerHead: ShowerHead,
  gitBranch: GitBranch,
  filter: Filter,
  hammer: Hammer,
  ruler: Ruler,
  doorOpen: DoorOpen,
  layers: Layers,
  treePine: TreePine,
  paintRoller: PaintRoller,
  paintbrush: Paintbrush,
  spray: SprayCan,
  zap: Zap,
  lightbulb: Lightbulb,
  plug: Plug,
  wind: Wind,
  refrigerator: Refrigerator,
  sparkles: Sparkles,
  house: House,
  bug: Bug,
  sprayCan: SprayCan,
  shield: Shield,
  video: Video,
  radar: Radar,
  thermometer: ThermometerSun,
  gauge: Gauge,
  scissors: Scissors,
  wrench: Wrench,
  snowflake: Snowflake,
  bolt: Bolt,
};

const GUARANTEES: { title: string; desc: string; Icon: LucideIcon }[] = [
  { title: '12-month warranty', desc: 'Labour & nominated parts covered per your job sheet.', Icon: ShieldCheck },
  { title: 'Fixed price quoted', desc: 'Scope locked before work starts — change orders signed off.', Icon: IndianRupee },
  { title: 'Licensed & insured', desc: 'Partners carry trade insurance & valid credentials.', Icon: BadgeCheck },
  { title: 'On-time arrival', desc: 'Live tracking + SMS if traffic shifts the window.', Icon: Clock },
  { title: 'Satisfaction or free', desc: 'Report issues within 48h — we mediate rework fast.', Icon: ThumbsUp },
];

const HERO_STATS: { icon: LucideIcon; strong: string; sub: string }[] = [
  { icon: Clock, strong: '24/7', sub: 'Emergency dispatch' },
  { icon: Star, strong: '4.9', sub: 'Avg. job rating' },
  { icon: Wrench, strong: '12k+', sub: 'Jobs completed' },
  { icon: ThumbsUp, strong: '98%', sub: 'Would book again' },
];

function SectionKicker() {
  return <div className="h-1 w-12 rounded-full bg-[#f97316]" aria-hidden />;
}

type Props = {
  serviceCategory: ServiceCategory;
  subService: ServiceSubcategory;
  config: HomeServiceDetailConfig;
};

export function HomeServiceDetailView({ serviceCategory, subService, config }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const videoSrc = homeServiceSubVideoSrc(subService.slug);
  const showVideo = Boolean(videoSrc) && !reducedMotion;
  const id = config.slug;

  const steps = useMemo(
    () => [
      { n: 1, title: 'Book', text: 'Tell us the issue, photos optional — we slot urgency correctly.' },
      {
        n: 2,
        title: 'Match & confirm',
        text: `A verified ${config.stepMatchPhrase} accepts with ETA; you get profile + reviews link.`,
      },
      { n: 3, title: 'Upfront quote', text: '₹-priced scope on site; no surprise “extras” without approval.' },
      { n: 4, title: 'Job done', text: config.step4Closing },
    ],
    [config],
  );

  const toggleFaq = (i: number) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  };

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3c6e] via-[#152e55] to-[#1a3c6e] pb-12 pt-8 text-white md:pb-16 md:pt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#f97316]/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-2xl"
        />

        <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to={`/services/${serviceCategory.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 opacity-90" aria-hidden />
            Back to {serviceCategory.name}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/95 backdrop-blur-sm">
              {serviceCategory.name}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl font-['DM_Serif_Display',Georgia,serif] text-[1.85rem] font-normal leading-[1.15] tracking-tight text-white md:text-[2.45rem] lg:text-[2.75rem]">
            {config.heroLead}
            <em className="not-italic text-[#f97316]">{config.heroItalic}</em>
            {config.heroTail}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-blue-100/95">{config.heroSubheading}</p>

          <div className="relative mt-10 aspect-[16/10] max-h-[min(56vw,22rem)] overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/30 ring-1 ring-white/10 md:max-h-[22rem]">
            {showVideo ? (
              <video
                key={videoSrc}
                className="h-full w-full object-cover"
                src={videoSrc}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                aria-label={`${subService.name} preview`}
              />
            ) : (
              <img
                src={subService.images[imgIdx % subService.images.length]}
                alt={subService.name}
                className="h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
            {!showVideo && subService.images.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-[#1a3c6e] shadow-lg transition hover:bg-white"
                  onClick={() =>
                    setImgIdx((i) => (i - 1 + subService.images.length) % subService.images.length)
                  }
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-[#1a3c6e] shadow-lg transition hover:bg-white"
                  onClick={() => setImgIdx((i) => (i + 1) % subService.images.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
            {showVideo ? (
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                Video
              </span>
            ) : null}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {HERO_STATS.map(({ icon: Icon, strong, sub }) => (
              <div
                key={sub}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-center shadow-inner shadow-black/10 backdrop-blur-md"
              >
                <Icon className="mx-auto mb-2 h-6 w-6 text-[#f97316]" strokeWidth={2} aria-hidden />
                <div className="text-lg font-bold tracking-tight text-white">{strong}</div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-blue-100/80">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Emergency */}
      <div className="border-y border-red-900/20 bg-gradient-to-r from-red-700 to-red-800 px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <AlertTriangle className="mt-0.5 h-7 w-7 shrink-0 text-amber-200" aria-hidden />
            <div className="min-w-0">
              <strong className="text-base font-semibold tracking-tight">{config.emergencyTitle}</strong>
              <p className="mt-1 text-sm leading-relaxed text-white/90">{config.emergencyBody}</p>
            </div>
          </div>
          <a
            href={getWhatsAppLink(config.emergencyWhatsAppPrefill)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-red-800 shadow-lg transition hover:bg-red-50"
          >
            Get help now
          </a>
        </div>
      </div>

      {/* Service types */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby={`${id}-cats`}>
        <div className="mx-auto max-w-6xl">
          <SectionKicker />
          <h2
            id={`${id}-cats`}
            className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-3xl"
          >
            {config.categorySectionTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{config.categoryIntro}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.categories.map((c) => {
              const Icon = SERVICE_ICONS[c.icon];
              return (
                <Link
                  key={c.title}
                  to="/submit-lead"
                  className="group flex flex-col rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1a3c6e]/25 hover:shadow-lg"
                >
                  <div
                    className={cn(
                      'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md transition group-hover:scale-105',
                      c.iconWrap,
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section
        className="border-t border-slate-200/80 bg-white px-4 py-14 sm:px-6 lg:px-8"
        aria-labelledby={`${id}-check`}
      >
        <div className="mx-auto max-w-6xl">
          <SectionKicker />
          <h2
            id={`${id}-check`}
            className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-3xl"
          >
            Complete services checklist
          </h2>

          <div className="mt-8 flex gap-4 rounded-3xl border border-[#1a3c6e]/15 bg-gradient-to-br from-slate-50 to-blue-50/40 p-5 md:p-6">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#1a3c6e]" aria-hidden />
            <div>
              <div className="text-sm font-bold text-[#1a3c6e]">Warranty & compliance</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Work carried out by licensed partners where applicable; written warranty on parts & labour as per your
                quote. GST invoices provided.
              </p>
            </div>
          </div>

          {config.checkGroups.map((g) => (
            <div key={g.title} className="mt-10 border-t border-slate-100 pt-10 first:border-t-0 first:pt-0">
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-2xl" aria-hidden>
                  {g.emoji}
                </span>
                <p className="text-base font-bold text-slate-900">{g.title}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-10 md:gap-y-4">
                {g.items.map((item) => (
                  <div key={item.name} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
                    <div>
                      <strong className="font-semibold text-slate-900">{item.name}</strong>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works + pricing */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby={`${id}-how`}>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:items-start">
          <div>
            <SectionKicker />
            <h2
              id={`${id}-how`}
              className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-3xl"
            >
              How it works
            </h2>
            <ol className="mt-8 space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: NAVY }}
                  >
                    {s.n}
                  </div>
                  <div className="pt-0.5">
                    <div className="font-bold text-slate-900">{s.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionKicker />
            <h2 className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-[1.65rem]">
              Indicative pricing (NCR)
            </h2>
            <p className="mt-2 text-sm text-slate-600">Ballpark figures for planning — final ₹ confirmed after inspection.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {config.prices.map((p) => (
                <article
                  key={p.title}
                  className={cn(
                    'relative rounded-2xl border bg-slate-50/50 p-5 transition hover:bg-white',
                    p.featured
                      ? 'border-2 border-[#1a3c6e] shadow-md ring-2 ring-[#1a3c6e]/10'
                      : 'border-slate-200',
                  )}
                >
                  {p.featured ? (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-[#f97316] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                      Most booked
                    </span>
                  ) : null}
                  <h3 className="text-sm font-bold text-[#1a3c6e]">{p.title}</h3>
                  <div className="mt-2 text-xl font-bold text-slate-900">{p.price}</div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.note}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-500">All prices include GST. Final price confirmed on-site.</p>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section
        className="border-t border-slate-200/80 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8"
        aria-labelledby={`${id}-tools`}
      >
        <div className="mx-auto max-w-6xl">
          <SectionKicker />
          <h2
            id={`${id}-tools`}
            className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-3xl"
          >
            Tools & equipment we bring
          </h2>
          <p className="mt-2 text-sm text-slate-600">{config.toolsSectionLead}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {config.tools.map(({ label, icon }) => {
              const Icon = SERVICE_ICONS[icon];
              return (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white px-2 py-5 text-center shadow-sm transition hover:border-[#1a3c6e]/30 hover:shadow-md"
                >
                  <Icon className="mx-auto mb-2 h-7 w-7 text-[#1a3c6e]" strokeWidth={2} aria-hidden />
                  <span className="text-xs font-semibold leading-snug text-slate-800">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby={`${id}-guar`}>
        <div className="mx-auto max-w-4xl text-center">
          <SectionKicker />
          <h2
            id={`${id}-guar`}
            className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-3xl"
          >
            Our guarantees
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">{config.guaranteeIntro}</p>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
            {GUARANTEES.map((g) => (
              <article key={g.title} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#1a3c6e]">
                  <g.Icon className="h-7 w-7" strokeWidth={2} aria-hidden />
                </div>
                <div className="text-sm font-bold text-slate-900">{g.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{g.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-slate-200/80 bg-white px-4 py-14 sm:px-6 lg:px-8"
        aria-labelledby={`${id}-faq`}
      >
        <div className="mx-auto max-w-3xl">
          <SectionKicker />
          <h2
            id={`${id}-faq`}
            className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-2xl tracking-tight text-[#1a3c6e] md:text-3xl"
          >
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {config.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm transition hover:border-slate-300"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-slate-900"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={open}
                  >
                    {f.q}
                    <ChevronDown
                      className={cn('h-5 w-5 shrink-0 text-[#1a3c6e] transition-transform', open && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      'border-t border-slate-200/80 bg-white px-5 pb-4 pt-0 text-sm leading-relaxed text-slate-600',
                      !open && 'hidden',
                    )}
                  >
                    <p className="pt-3">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-gradient-to-br from-[#1a3c6e] via-[#152e55] to-[#1a3c6e] px-4 py-14 text-center text-white sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-['DM_Serif_Display',Georgia,serif] text-3xl font-normal tracking-tight md:text-4xl">
            {config.footerTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-blue-100/95">{config.footerSubtitle}</p>
          <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/submit-lead">
              <Button className="h-12 rounded-2xl border-0 bg-[#f97316] px-8 text-base font-bold text-white shadow-lg shadow-orange-900/25 transition hover:bg-[#ea580c]">
                {config.primaryCtaLabel}
              </Button>
            </Link>
            <a
              href={getWhatsAppLink(`Hi, I'd like a quote for ${subService.name} on Leads4U.`)}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-2 border-white/90 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Get a free quote
              </Button>
            </a>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-white/65">{config.finePrint}</p>
        </div>
      </footer>
    </article>
  );
}

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

const blue = '#0D47A1';
const blueMid = '#1976D2';
const emergency = '#B71C1C';

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
    <article className="min-h-screen w-full bg-white text-[#1a1a1a]">
      <header className="relative overflow-hidden border-b border-black/10 py-12 pt-14 md:py-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-[-80px] h-[280px] w-[280px] rounded-full bg-[#0D47A1]/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-[10%] h-[180px] w-[180px] rounded-full bg-[#FF6F00]/15"
        />
        <div className="relative z-[1] mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <Link
            to={`/services/${serviceCategory.slug}`}
            className="inline-flex text-sm font-medium text-[#1976D2] hover:underline"
          >
            ← Back to {serviceCategory.name}
          </Link>

          <div className="mt-6 h-[3px] w-10 rounded-sm bg-[#FF6F00]" />

          <h1 className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[2rem] font-normal leading-tight text-[#0D47A1] md:text-[2.5rem]">
            {config.heroLead}
            <em className="text-[#FF6F00] not-italic">{config.heroItalic}</em>
            {config.heroTail}
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium text-[#1a1a1a]">{config.heroSubheading}</p>

          <div className="relative mt-8 h-[min(56vw,18rem)] overflow-hidden rounded-2xl border border-black/10 bg-slate-900 shadow-lg sm:h-64 md:h-72">
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
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
            {!showVideo && subService.images.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#0D47A1] shadow"
                  onClick={() => setImgIdx((i) => (i - 1 + subService.images.length) % subService.images.length)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#0D47A1] shadow"
                  onClick={() => setImgIdx((i) => (i + 1) % subService.images.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
            {showVideo ? (
              <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Video
              </span>
            ) : null}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, strong: '24/7', sub: 'Emergency dispatch' },
              { icon: Star, strong: '4.9', sub: 'Avg. job rating' },
              { icon: Wrench, strong: '12k+', sub: 'Jobs completed' },
              { icon: ThumbsUp, strong: '98%', sub: 'Would book again' },
            ].map(({ icon: Icon, strong, sub }) => (
              <div
                key={sub}
                className="rounded-xl border border-black/10 bg-white/90 px-5 py-4 text-center shadow-sm backdrop-blur-sm"
              >
                <Icon className="mx-auto mb-2 h-6 w-6 text-[#1976D2]" strokeWidth={2} />
                <div className="text-xl font-semibold text-[#0D47A1]">{strong}</div>
                <div className="text-xs text-[#666]">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 py-4 sm:px-6 lg:px-8" style={{ backgroundColor: emergency, color: '#fff' }}>
        <div className="mx-auto flex max-w-[1100px] flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0" aria-hidden />
            <div className="min-w-0">
              <strong className="block text-base font-semibold">{config.emergencyTitle}</strong>
              <p className="mt-1 text-sm opacity-90">{config.emergencyBody}</p>
            </div>
          </div>
          <a
            href={getWhatsAppLink(config.emergencyWhatsAppPrefill)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold sm:self-center"
            style={{ color: emergency }}
          >
            Get Help Now
          </a>
        </div>
      </div>

      <section className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby={`${id}-cats`}>
        <div className="mx-auto max-w-[1100px]">
          <div className="h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
          <h2 id={`${id}-cats`} className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">
            {config.categorySectionTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-[#666]">{config.categoryIntro}</p>

          <div className="mt-8 grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {config.categories.map((c) => {
              const Icon = SERVICE_ICONS[c.icon];
              return (
                <Link key={c.title} to="/submit-lead" className="group bg-white p-5 transition-colors hover:bg-[#f8f9fa]">
                  <div className={cn('mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] text-white', c.iconWrap)}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold text-[#1a1a1a]">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666]">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-[20px] border border-black/10 bg-[#fafafa] px-2.5 py-0.5 text-xs font-medium text-[#666]"
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

      <section className="bg-[#f8f9fa] px-4 py-10 sm:px-6 lg:px-8" aria-labelledby={`${id}-check`}>
        <div className="mx-auto max-w-[1100px]">
          <div className="h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
          <h2 id={`${id}-check`} className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">
            Complete services checklist
          </h2>

          <div className="mt-6 flex gap-3 rounded-xl border border-[#0D47A1]/15 bg-[#E3F2FD] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0D47A1]" />
            <div>
              <div className="text-sm font-semibold text-[#0D47A1]">Warranty & compliance</div>
              <p className="mt-1 text-sm leading-relaxed text-[#666]">
                Work carried out by licensed partners where applicable; written warranty on parts & labour as per your quote. GST invoices provided.
              </p>
            </div>
          </div>

          {config.checkGroups.map((g) => (
            <div key={g.title} className="mt-8">
              <div className="mb-3">
                <span className="text-lg leading-none" aria-hidden>
                  {g.emoji}
                </span>
                <p className="mt-1 text-sm font-semibold text-[#1a1a1a]">{g.title}</p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-3">
                {g.items.map((item) => (
                  <div key={item.name} className="grid grid-cols-[22px_1fr] gap-x-2 gap-y-0.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D32]" strokeWidth={2.5} aria-hidden />
                    <strong className="text-sm font-semibold text-[#1a1a1a]">{item.name}</strong>
                    <span className="col-start-2 text-xs leading-snug text-[#666]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby={`${id}-how`}>
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div>
            <div className="h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
            <h2 id={`${id}-how`} className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">
              How it works
            </h2>
            <ol className="mt-6 list-none space-y-5 p-0">
              {steps.map((s) => (
                <li key={s.n} className="grid grid-cols-[40px_1fr] gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: blue }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a]">{s.title}</div>
                    <p className="mt-1 text-sm text-[#666]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
            <h2 className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">Indicative pricing (NCR)</h2>
            <p className="mt-2 text-sm text-[#666]">Ballpark figures for planning — final ₹ confirmed after inspection.</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {config.prices.map((p) => (
                <article
                  key={p.title}
                  className={cn('relative rounded-xl border border-black/10 bg-white p-5', p.featured && 'border-2 shadow-md')}
                  style={p.featured ? { borderColor: blueMid } : undefined}
                >
                  {p.featured ? (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-[#FF6F00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Most booked
                    </span>
                  ) : null}
                  <h3 className="text-sm font-semibold text-[#0D47A1]">{p.title}</h3>
                  <div className="mt-2 text-xl font-semibold text-[#1a1a1a]">{p.price}</div>
                  <p className="mt-2 text-xs leading-relaxed text-[#666]">{p.note}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#666]">All prices include GST. Final price confirmed on-site.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] px-4 py-10 sm:px-6 lg:px-8" aria-labelledby={`${id}-tools`}>
        <div className="mx-auto max-w-[1100px]">
          <div className="h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
          <h2 id={`${id}-tools`} className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">
            Tools & equipment we bring
          </h2>
          <p className="mt-2 text-sm text-[#666]">{config.toolsSectionLead}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {config.tools.map(({ label, icon }) => {
              const Icon = SERVICE_ICONS[icon];
              return (
                <div key={label} className="rounded-xl border border-black/10 bg-white px-2 py-4 text-center shadow-sm">
                  <Icon className="mx-auto mb-2 h-6 w-6 text-[#0D47A1]" strokeWidth={2} />
                  <span className="text-xs font-medium leading-tight text-[#1a1a1a]">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby={`${id}-guar`}>
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mx-auto h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
          <h2 id={`${id}-guar`} className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">
            Our guarantees
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#666]">{config.guaranteeIntro}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {GUARANTEES.map((g) => (
              <article key={g.title}>
                <g.Icon className="mx-auto mb-2 h-7 w-7 text-[#0D47A1]" strokeWidth={2} />
                <div className="text-sm font-semibold text-[#1a1a1a]">{g.title}</div>
                <p className="mt-1 text-xs text-[#666]">{g.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] px-4 py-10 sm:px-6 lg:px-8" aria-labelledby={`${id}-faq`}>
        <div className="mx-auto max-w-[720px]">
          <div className="h-[3px] w-10 rounded-sm bg-[#FF6F00]" />
          <h2 id={`${id}-faq`} className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[1.7rem] text-[#0D47A1]">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-2">
            {config.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-xl border border-black/10 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-semibold text-[#1a1a1a]"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={open}
                  >
                    {f.q}
                    <ChevronDown className={cn('h-5 w-5 shrink-0 text-[#1976D2] transition-transform', open && 'rotate-180')} />
                  </button>
                  <div className={cn('border-t border-black/5 px-4 pb-3.5 text-sm leading-relaxed text-[#666]', !open && 'hidden')}>
                    {f.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="px-4 py-12 text-center text-white sm:px-6" style={{ backgroundColor: blue }}>
        <h2 className="font-['DM_Serif_Display',Georgia,serif] text-3xl font-normal md:text-4xl">{config.footerTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-base text-white/90">{config.footerSubtitle}</p>
        <div className="mt-6 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
          <Link to="/submit-lead">
            <Button className="h-11 rounded-lg border-0 bg-[#FF6F00] px-6 font-semibold text-white hover:bg-[#e65100]">{config.primaryCtaLabel}</Button>
          </Link>
          <a href={getWhatsAppLink(`Hi, I'd like a quote for ${subService.name} on Leads4U.`)} target="_blank" rel="noreferrer">
            <Button
              variant="outline"
              className="h-11 rounded-lg border-2 border-white/90 bg-transparent px-6 font-semibold text-white hover:bg-white/10"
            >
              Get a Free Quote
            </Button>
          </a>
        </div>
        <p className="mt-6 text-xs text-white/70">{config.finePrint}</p>
      </footer>
    </article>
  );
}

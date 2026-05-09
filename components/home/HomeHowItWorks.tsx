import { HOW_IT_WORKS_STEPS } from '@/src/content/home-media';
import { SectionHeader } from './SectionHeader';

export function HomeHowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#0f2847] py-24 text-white md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(249,115,22,0.18),transparent_55%)]"
      />
      <div className="absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#1a3c6e]/40 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          variant="dark"
          eyebrow="Flow"
          title="Three calm steps — no maze"
          description="Tell us once, compare options, hire with confidence. Built for busy households and growing teams alike."
          className="mb-14 md:mb-16"
        />

        <div className="relative mx-auto mt-4 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 right-5 top-[5.25rem] hidden h-px bg-linear-to-r from-transparent via-white/25 to-transparent md:block"
          />
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col">
              <div className="mb-6 flex md:justify-center">
                <span className="inline-flex h-12 min-w-[3rem] items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-xs font-bold tracking-[0.2em] backdrop-blur-sm">
                  {step.step}
                </span>
                {idx < HOW_IT_WORKS_STEPS.length - 1 ? (
                  <span
                    className="mx-auto mt-4 block h-8 w-px bg-linear-to-b from-white/30 to-transparent md:hidden"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="overflow-hidden rounded-2xl ring-2 ring-white/15">
                <div className="aspect-[16/11] overflow-hidden bg-slate-900/40">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover opacity-95"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

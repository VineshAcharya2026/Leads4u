import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, getWhatsAppLink } from '@/src/constants';
import { HOME_SERVICES_SLIDER_VIDEOS } from '@/src/content/service-videos';
import { ServiceCardSlider } from './ServiceCardSlider';
import { SectionHeader } from './SectionHeader';

export function HomeServiceGrid() {
  const navigate = useNavigate();

  return (
    <section data-home-reveal className="relative border-y border-slate-200/60 bg-linear-to-b from-white via-white to-[#f1f5f9]/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Catalog"
          title="Every lane, distilled into tidy cards"
          description="Imagery rotates on a gentle timer — jump into subs or WhatsApp without hunting."
        />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.article
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group/card relative flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-[0_18px_48px_-36px_rgba(15,40,71,0.5)] ring-1 ring-slate-100/80 transition-[box-shadow,transform] duration-300 ease-out hover:shadow-[0_32px_56px_-28px_rgba(26,60,110,0.35)] hover:ring-[#1a3c6e]/15"
            >
              <div className="relative">
                <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-linear-to-r from-[#1a3c6e] via-[#3b82f6] to-[#f97316]" />
                <ServiceCardSlider
                  images={cat.images}
                  alt={cat.name}
                  videos={cat.slug === 'home-services' ? HOME_SERVICES_SLIDER_VIDEOS : undefined}
                />
              </div>
              <div className="relative flex flex-1 flex-col bg-linear-to-b from-white to-slate-50/40 p-6">
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#e8eef9] to-white shadow-md ring-1 ring-slate-200/90 transition-transform duration-300 group-hover/card:scale-105 group-hover/card:shadow-lg">
                    <cat.icon className="h-5 w-5 text-[#1a3c6e]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold tracking-tight text-[#0f2847]">{cat.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {cat.subcategories.length} options
                    </p>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/services/${cat.slug}/${sub.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a3c6e] hover:text-white hover:shadow-md hover:ring-[#1a3c6e]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto flex gap-3 pt-2">
                  <Button
                    onClick={() => navigate(`/services/${cat.slug}`)}
                    className="flex-1 rounded-xl bg-[#1a3c6e] font-semibold text-white shadow-md shadow-[#1a3c6e]/20 transition-all duration-200 hover:bg-[#152e55] hover:shadow-lg"
                  >
                    View hub
                  </Button>
                  <a
                    href={getWhatsAppLink(`Hi, I need help with ${cat.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200/90 bg-emerald-50 text-emerald-900 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-emerald-100 hover:shadow-md"
                  >
                    <MessageCircle className="h-[18px] w-[18px]" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, getWhatsAppLink } from '@/src/constants';
import { ServiceCardSlider } from './ServiceCardSlider';
import { SectionHeader } from './SectionHeader';

export function HomeServiceGrid() {
  const navigate = useNavigate();

  return (
    <section className="relative border-y border-slate-200/60 bg-linear-to-b from-white via-white to-[#f1f5f9]/40 py-20 md:py-28">
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="flex flex-col overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_14px_40px_-32px_rgba(15,40,71,0.45)] ring-1 ring-slate-100/90 transition-[box-shadow] duration-300 hover:shadow-[0_28px_50px_-32px_rgba(15,40,71,0.35)]"
            >
              <div className="relative">
                <div className="absolute inset-x-0 top-0 z-10 h-1 bg-linear-to-r from-[#1a3c6e] via-[#3b74c9] to-[#f97316]" />
                <ServiceCardSlider images={cat.images} alt={cat.name} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#eef3fb] to-white shadow-inner ring-1 ring-slate-200/80">
                    <cat.icon className="h-5 w-5 text-[#1a3c6e]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0f2847]">{cat.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                      {cat.subcategories.length} options
                    </p>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/services/${cat.slug}/${sub.slug}`}
                      className="rounded-full bg-slate-100/95 px-3 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200/75 transition hover:bg-[#1a3c6e]/8 hover:text-[#1a3c6e] hover:ring-[#1a3c6e]/20"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto flex gap-3 pt-2">
                  <Button
                    onClick={() => navigate(`/services/${cat.slug}`)}
                    className="flex-1 rounded-xl bg-[#1a3c6e] font-semibold text-white hover:bg-[#152e55]"
                  >
                    View hub
                  </Button>
                  <a
                    href={getWhatsAppLink(`Hi, I need help with ${cat.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-900 transition hover:bg-emerald-100"
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

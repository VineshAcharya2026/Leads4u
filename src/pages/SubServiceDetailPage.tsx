import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HomeServiceDetailView } from '@/components/services/HomeServiceDetailView';
import { getHomeServiceDetail } from '@/src/content/home-service-details';
import { CATEGORIES, getWhatsAppLink } from '../constants';
import { cn } from '@/lib/utils';

export function SubServiceDetailPage() {
  const { category, subservice } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const serviceCategory = CATEGORIES.find((item) => item.slug === category);
  const subService = serviceCategory?.subcategories.find((item) => item.slug === subservice);

  const homeDetail =
    category === 'home-services' && subservice
      ? getHomeServiceDetail(subservice)
      : undefined;

  useEffect(() => {
    if (!subService || !category || !subservice || !serviceCategory) return;
    document.title = homeDetail ? homeDetail.metaTitle : `${subService.name} | Leads4U`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      homeDetail ? homeDetail.metaDescription : `${subService.summary} Book on Leads4U — ${serviceCategory.name}.`,
    );

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/services/${category}/${subservice}`;
    return () => {
      document.title = 'Leads4u | Trusted Local Services';
    };
  }, [subService, category, subservice, serviceCategory, homeDetail]);

  if (!serviceCategory || !subService) {
    return <Navigate to="/" replace />;
  }

  if (homeDetail) {
    return <HomeServiceDetailView serviceCategory={serviceCategory} subService={subService} config={homeDetail} />;
  }

  const goPrev = () => setImageIndex((prev) => (prev - 1 + subService.images.length) % subService.images.length);
  const goNext = () => setImageIndex((prev) => (prev + 1) % subService.images.length);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3c6e] via-[#152e55] to-[#1a3c6e] pb-10 pt-8 text-white md:pb-14 md:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#f97316]/15 blur-3xl"
        />
        <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to={`/services/${serviceCategory.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back to {serviceCategory.name}
          </Link>
          <Badge className="mt-6 border-0 bg-[#f97316] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm hover:bg-[#f97316]">
            {serviceCategory.name}
          </Badge>
          <h1 className="mt-4 max-w-3xl font-['DM_Serif_Display',Georgia,serif] text-3xl font-normal tracking-tight md:text-4xl lg:text-[2.65rem]">
            {subService.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-blue-100/95">{subService.summary}</p>
        </div>
      </section>

      <div className="relative z-[2] mx-auto -mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/10">
          <div className="relative aspect-[16/10] max-h-[min(70vh,28rem)] bg-slate-900 md:max-h-[28rem]">
            <img
              src={subService.images[imageIndex]}
              alt={subService.name}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            {subService.images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-[#1a3c6e] shadow-lg transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-[#1a3c6e] shadow-lg transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {subService.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show image ${i + 1}`}
                      onClick={() => setImageIndex(i)}
                      className={cn(
                        'h-2 rounded-full transition-all',
                        i === imageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80',
                      )}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <div className="p-8 md:p-10">
            <p className="max-w-3xl text-base leading-relaxed text-slate-700">{subService.description}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={getWhatsAppLink(`Hi, I need ${subService.name}. Please share details.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex sm:inline-flex"
              >
                <Button className="h-12 w-full rounded-2xl bg-emerald-600 px-8 text-base font-bold text-white shadow-md hover:bg-emerald-700 sm:w-auto">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                  Chat on WhatsApp
                </Button>
              </a>
              <Link to="/submit-lead" className="inline-flex">
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-2xl border-2 border-[#1a3c6e] bg-transparent px-8 text-base font-bold text-[#1a3c6e] hover:bg-[#1a3c6e]/5 sm:w-auto"
                >
                  Post a request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

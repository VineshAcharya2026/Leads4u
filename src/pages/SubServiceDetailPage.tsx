import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HomeServiceDetailView } from '@/components/services/HomeServiceDetailView';
import { getHomeServiceDetail } from '@/src/content/home-service-details';
import { CATEGORIES, getWhatsAppLink } from '../constants';

export function SubServiceDetailPage() {
  const { category, subservice } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const serviceCategory = CATEGORIES.find((item) => item.slug === category);
  const subService = serviceCategory?.subcategories.find((item) => item.slug === subservice);

  const homeDetail = useMemo(() => {
    if (category !== 'home-services' || !subservice) return undefined;
    return getHomeServiceDetail(subservice);
  }, [category, subservice]);

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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to={`/services/${serviceCategory.slug}`} className="inline-flex items-center text-sm font-medium text-[#1a3c6e] hover:underline">
          Back to Services
        </Link>

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="relative h-[340px] md:h-[460px]">
            <img src={subService.images[imageIndex]} alt={subService.name} className="h-full w-full object-cover" />
            {subService.images.length > 1 && (
              <>
                <button type="button" onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="p-8">
            <Badge className="mb-4 bg-[#1a3c6e]">{serviceCategory.name}</Badge>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">{subService.name}</h1>
            <p className="mt-3 text-lg text-slate-600">{subService.summary}</p>
            <p className="mt-5 leading-7 text-slate-700">{subService.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink(`Hi, I need ${subService.name}. Please share details.`)} target="_blank" rel="noreferrer">
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 sm:w-auto">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </a>
              <Link to="/submit-lead">
                <Button variant="outline" className="w-full border-[#1a3c6e] text-[#1a3c6e] sm:w-auto">
                  Request Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

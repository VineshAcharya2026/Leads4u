import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { carouselForCategory } from '@/src/content/service-media';
import { HOME_SERVICES_SLIDER_VIDEOS } from '@/src/content/service-videos';
import { ServiceCardSlider } from './ServiceCardSlider';
import { SectionHeader } from './SectionHeader';

const HOME_IMAGES = [...carouselForCategory('home-services')];

export function HomeServicesVideoSection() {
  const navigate = useNavigate();

  return (
    <section data-home-reveal className="border-b border-slate-200/70 bg-linear-to-b from-white to-slate-50/90 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Home services"
          title="See the work in motion"
          description="Short clips from real jobs — plumbing, electrical, painting, and more. Swipe or wait for the next clip, then jump into the hub you need."
          className="mb-10 md:mb-12"
        />

        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-900 shadow-[0_24px_60px_-24px_rgba(15,40,71,0.45)] ring-1 ring-slate-200/60 md:rounded-[2rem]">
          <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-linear-to-r from-[#1a3c6e] via-[#3b82f6] to-[#f97316]" aria-hidden />
          <ServiceCardSlider
            className="h-[min(56vw,18rem)] sm:h-64 md:h-[22rem] lg:h-[26rem]"
            images={HOME_IMAGES}
            alt="Home services video showcase"
            videos={HOME_SERVICES_SLIDER_VIDEOS}
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 rounded-2xl bg-[#1a3c6e] px-8 font-semibold shadow-lg shadow-[#1a3c6e]/20 hover:bg-[#152e55]"
            onClick={() => navigate('/services/home-services')}
          >
            Browse all home services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

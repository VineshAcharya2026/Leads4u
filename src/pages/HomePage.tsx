import { HomeCategoryShowcase } from '@/components/home/HomeCategoryShowcase';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeHowItWorks } from '@/components/home/HomeHowItWorks';
import { HomeProviderCta } from '@/components/home/HomeProviderCta';
import { HomeServiceGrid } from '@/components/home/HomeServiceGrid';

export function HomePage() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <HomeCategoryShowcase />
      <HomeServiceGrid />
      <HomeHowItWorks />
      <HomeProviderCta />
    </div>
  );
}

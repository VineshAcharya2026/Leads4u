import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeCategoryShowcase } from '@/components/home/HomeCategoryShowcase';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeHowItWorks } from '@/components/home/HomeHowItWorks';
import { HomeProviderCta } from '@/components/home/HomeProviderCta';
import { HomeServicesVideoSection } from '@/components/home/HomeServicesVideoSection';
import { HomeServiceGrid } from '@/components/home/HomeServiceGrid';
import { useAuth } from '../contexts/AuthContext';
import { postAuthDestination } from '../lib/dashboard-paths';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ensureGsapScrollTrigger, gsap } from '../lib/gsap-register';

export function HomePage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();
  const homeRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !user || !profile) return;
    if (profile.needsProfileSetup === true) {
      navigate(postAuthDestination(profile), { replace: true });
    }
  }, [loading, user, profile, navigate]);

  useLayoutEffect(() => {
    if (reducedMotion || !homeRootRef.current) return;
    ensureGsapScrollTrigger();
    const root = homeRootRef.current;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-home-reveal]')).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.75,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={homeRootRef} className="flex flex-col">
      <HomeHero />
      <HomeServicesVideoSection />
      <HomeCategoryShowcase />
      <HomeServiceGrid />
      <HomeHowItWorks />
      <HomeProviderCta />
    </div>
  );
}

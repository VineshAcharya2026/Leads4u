import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeCategoryShowcase } from '@/components/home/HomeCategoryShowcase';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeHowItWorks } from '@/components/home/HomeHowItWorks';
import { HomeProviderCta } from '@/components/home/HomeProviderCta';
import { HomeServiceGrid } from '@/components/home/HomeServiceGrid';
import { useAuth } from '../contexts/AuthContext';
import { postAuthDestination } from '../lib/dashboard-paths';

export function HomePage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user || !profile) return;
    if (profile.needsProfileSetup === true) {
      navigate(postAuthDestination(profile), { replace: true });
    }
  }, [loading, user, profile, navigate]);

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

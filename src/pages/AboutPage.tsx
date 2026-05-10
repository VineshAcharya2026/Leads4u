import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutPage() {
  useEffect(() => {
    document.title = 'About us | Leads4U';
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute(
        'content',
        'Leads4U connects households and businesses with verified local service professionals across home services, vehicles, education, and more.',
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">About Leads4U</p>
          <h1 className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-4xl font-normal tracking-tight text-[#0f2847] md:text-5xl">
            Local services, without the friction
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            We built Leads4U so booking a carpenter, electrician, tutor, or driver feels as straightforward as ordering
            dinner—clear scopes, upfront communication, and partners you can rate after every visit.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: 'Verified partners',
              text: 'Background checks and credentials where it matters — especially for trades that enter your home.',
            },
            {
              icon: Target,
              title: 'Clear expectations',
              text: 'Describe the job once, get structured quotes, and approve scope before anyone starts.',
            },
            {
              icon: Users,
              title: 'Built for cities',
              text: 'Metro-first routing and messaging so ETA and handover aren’t guesses.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8eef9] text-[#1a3c6e]">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h2 className="mt-4 text-base font-bold text-[#0f2847]">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-[#1a3c6e]/10 bg-[#f8fafc] p-8">
          <Link to="/services/home-services">
            <Button className="rounded-xl bg-[#1a3c6e] px-8 font-semibold hover:bg-[#152e55]">Browse services</Button>
          </Link>
          <Link to="/submit-lead">
            <Button variant="outline" className="rounded-xl border-[#1a3c6e] font-semibold text-[#1a3c6e] hover:bg-white">
              Post a request
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

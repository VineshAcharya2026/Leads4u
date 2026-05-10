import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppLink } from '../constants';

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact us | Leads4U';
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute(
        'content',
        'Reach Leads4U for support, partnerships, or press. Chat on WhatsApp or write to us — we respond as soon as we can.',
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">Contact</p>
          <h1 className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-4xl font-normal tracking-tight text-[#0f2847] md:text-5xl">
            We are here to help
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Questions about a booking, your account, or listing your business? Pick the channel that works best for you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 lg:px-8">
        <ul className="space-y-4">
          <li className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-[#0f2847]">WhatsApp</h2>
              <p className="mt-1 text-sm text-slate-600">Fastest for customers and providers during the day.</p>
              <a
                href={getWhatsAppLink('Hi Leads4U, I have a question about your platform.')}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-[#1a3c6e] underline-offset-2 hover:underline"
              >
                Open chat
              </a>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8eef9] text-[#1a3c6e]">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-[#0f2847]">Email</h2>
              <p className="mt-1 text-sm text-slate-600">For detailed requests, attachments, or compliance.</p>
              <p className="mt-3 text-sm font-semibold text-[#1a3c6e]">hello@leads4u.site</p>
              <p className="mt-1 text-xs text-slate-500">Update this address in code when your inbox is ready.</p>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-[#0f2847]">Serving India</h2>
              <p className="mt-2 text-sm text-slate-600">Metro-first rollout; expanding coverage continuously.</p>
            </div>
          </li>
        </ul>

        <div className="mt-10 text-center">
          <Link to="/">
            <Button variant="ghost" className="font-semibold text-[#1a3c6e] hover:bg-slate-100">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

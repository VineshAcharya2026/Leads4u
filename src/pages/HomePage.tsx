import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, getWhatsAppLink } from '../constants';
import { motion } from 'motion/react';

function ServiceCardSlider({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative h-52 overflow-hidden">
      <img src={images[activeImage]} alt={alt} className="h-full w-full object-cover" />
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-slate-700 shadow-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-slate-700 shadow-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${idx === activeImage ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const activeCategory = CATEGORIES[activeServiceSlide];

  const goToPrevService = () => {
    setActiveServiceSlide((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  };

  const goToNextService = () => {
    setActiveServiceSlide((prev) => (prev + 1) % CATEGORIES.length);
  };

  useEffect(() => {
    if (isSliderPaused) return;

    const timer = setInterval(() => {
      setActiveServiceSlide((prev) => (prev + 1) % CATEGORIES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isSliderPaused]);

  return (
    <div className="flex flex-col">
      {/* Service Slider Section (after header) */}
      <section className="border-b border-slate-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#1a3c6e]">Explore Services on Leads4u</h2>
              <p className="text-sm text-slate-700">Browse verified categories and jump directly to the exact service you need.</p>
            </div>
            <div className="flex gap-1.5">
              {CATEGORIES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveServiceSlide(idx)}
                  className={`h-2 rounded-full transition-all ${idx === activeServiceSlide ? 'w-6 bg-[#1a3c6e]' : 'w-2 bg-slate-300'}`}
                  aria-label={`Go to service category ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            onMouseEnter={() => setIsSliderPaused(true)}
            onMouseLeave={() => setIsSliderPaused(false)}
          >
            <button
              type="button"
              onClick={goToPrevService}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/95 p-3 text-slate-700 shadow-md transition hover:bg-white hover:shadow-lg"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNextService}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/95 p-3 text-slate-700 shadow-md transition hover:bg-white hover:shadow-lg"
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeServiceSlide * 100}%)` }}
            >
              {CATEGORIES.map((cat) => (
                <div key={cat.slug} className="min-w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
                    <div className="relative h-[320px] w-full overflow-hidden md:h-[560px]">
                      <img src={cat.images[0]} alt={cat.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow">
                          <cat.icon className="h-5 w-5 text-[#1a3c6e]" />
                          <span className="text-sm font-bold text-[#1a3c6e]">{cat.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-slate-50 p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#f97316] font-bold">Verified Category</p>
                      <h3 className="mt-2 text-5xl font-black text-[#1a3c6e]">{cat.name}</h3>
                      <p className="mt-4 text-slate-700 text-lg leading-8">
                        Get trusted local experts with quick response times, transparent communication, and reliable service quality.
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {cat.subcategories.slice(0, 4).map((sub) => (
                          <button
                            key={sub.slug}
                            type="button"
                            onClick={() => navigate(`/services/${cat.slug}/${sub.slug}`)}
                            className="group rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm transition hover:shadow-md"
                          >
                            <div className="h-16 w-full overflow-hidden rounded-xl bg-[#9dbdf2]">
                              <img src={sub.images[0]} alt={sub.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                            </div>
                            <p className="pt-2 text-xs font-semibold text-slate-700">{sub.name}</p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {cat.subcategories.slice(4).map((sub) => (
                          <button
                            key={sub.slug}
                            type="button"
                            onClick={() => navigate(`/services/${cat.slug}/${sub.slug}`)}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 flex gap-3">
                        <Button onClick={() => navigate(`/services/${cat.slug}`)} className="rounded-xl bg-[#1a3c6e] px-5 hover:bg-[#152e55]">
                          View Services
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/services/${cat.slug}/${cat.subcategories[0].slug}`)}
                          className="rounded-xl border-[#1a3c6e] text-[#1a3c6e]"
                        >
                          Service Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                        <a
                          href={getWhatsAppLink(`Hi, I need ${cat.name}.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-xl border border-green-600 px-4 text-green-700 transition hover:bg-green-50"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-20 z-30 mt-5 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3 overflow-x-auto">
              <p className="hidden shrink-0 pl-2 text-xs font-black uppercase tracking-wider text-slate-700 md:block">
                Quick Category Navigation
              </p>
              <div className="flex gap-2">
                {CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setActiveServiceSlide(idx)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      idx === activeServiceSlide
                        ? 'border-[#1a3c6e] bg-[#1a3c6e] text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-200 pt-3">
              {activeCategory.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => navigate(`/services/${activeCategory.slug}/${sub.slug}`)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-[#f8fafc] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-600 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-0 -right-10 w-96 h-96 bg-orange-600 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-[#1a3c6e] tracking-tight leading-[1.1] mb-8"
          >
            Welcome to <span className="text-[#f97316] italic">Leads4u</span> <br />
            Trusted Local Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-800 font-medium mb-12 max-w-2xl mx-auto"
          >
            Connect with verified professionals across home, vehicle, personal, education, and business services. Fast, reliable, and local.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button onClick={() => navigate('/services/home-services')} className="h-14 px-8 bg-[#1a3c6e] hover:bg-[#152e55] text-white rounded-xl text-lg font-bold">
              Explore Services
            </Button>
            <a href={getWhatsAppLink('Hi, I need help finding the right service on Leads4u.')} target="_blank" rel="noreferrer">
              <Button variant="outline" className="h-14 px-8 rounded-xl text-lg font-bold border-green-600 text-green-700 hover:bg-green-50">
                WhatsApp Now
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1a3c6e] tracking-tight">All Services on Leads4u</h2>
          <p className="text-slate-700 font-medium mt-3">Every service category with icons, images, and detailed sub-services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
            >
              <ServiceCardSlider images={cat.images} alt={cat.name} />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <cat.icon className="h-5 w-5 text-[#1a3c6e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3c6e]">{cat.name}</h3>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/services/${cat.slug}/${sub.slug}`}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate(`/services/${cat.slug}`)}
                    className="flex-1 bg-[#1a3c6e] text-white hover:bg-[#152e55]"
                  >
                  View Services
                  </Button>
                  <a
                    href={getWhatsAppLink(`Hi, I need help with ${cat.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-green-600 px-4 text-green-700 transition hover:bg-green-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How Leads4u Works</h2>
            <p className="text-slate-700 mt-4 max-w-2xl mx-auto">Connect with professionals in just a few simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Post a Request', 
                desc: 'Tell us what you need and where. It only takes 2 minutes.', 
                img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
                step: '01'
              },
              { 
                title: 'Get Matched', 
                desc: 'We match your request with up to 3 highly-rated verified pros.', 
                img: 'https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=400',
                step: '02'
              },
              { 
                title: 'Hire the Best', 
                desc: 'Review profiles, talk to pros, and hire the one you like.', 
                img: 'https://images.unsplash.com/photo-1600880212340-023440796753?auto=format&fit=crop&q=80&w=400',
                step: '03'
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -top-10 -left-6 text-8xl font-black text-slate-100 select-none">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="rounded-2xl overflow-hidden mb-6 h-48 shadow-lg">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f97316] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you a Service Professional?</h2>
              <p className="text-xl text-white mb-8">
                Join 10,000+ businesses and grow your revenue with high-quality leads every month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/auth?mode=register')}
                  className="bg-white text-[#f97316] hover:bg-orange-50 h-14 px-8 text-lg font-bold rounded-xl"
                >
                  Register Your Business
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="bg-transparent border-white text-white hover:bg-white/10 h-14 px-8 text-lg font-bold rounded-xl"
                >
                  <a href={getWhatsAppLink('Hi, I want to grow my service business with Leads4U.')} target="_blank" rel="noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block relative z-10">
              <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl border border-white/30 transform rotate-3 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-green-400 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">New Lead Found!</p>
                    <p className="text-xs text-white">2 minutes ago</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-32 bg-white/30 rounded"></div>
                  <div className="h-2 w-48 bg-white/30 rounded"></div>
                  <div className="h-2 w-24 bg-white/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProviderProfile } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from '../constants';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Search, 
  Filter,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getWhatsAppLink } from '../constants';

export function CategoryPage() {
  const { category } = useParams();
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const serviceCategory = CATEGORIES.find((c) => c.slug === category);
  const categoryInfo = CATEGORIES.flatMap(c => c.subcategories).find(sc => sc.slug === category);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'profiles'), 
          where('categories', 'array-contains', category)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data() as ProviderProfile);
        setProviders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchProviders();
  }, [category]);

  const filteredProviders = providers.filter(p => 
    p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (serviceCategory) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-[#1a3c6e] py-14 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge className="mb-4 border-none bg-[#f97316] px-3 py-1 text-[10px] uppercase tracking-widest text-white hover:bg-[#f97316]">
              Service Category
            </Badge>
            <h1 className="text-4xl font-black">{serviceCategory.name}</h1>
            <p className="mt-3 max-w-2xl text-blue-100">
              Explore all available services under {serviceCategory.name}. Select any service card to view detailed information.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategory.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                to={`/services/${serviceCategory.slug}/${sub.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img src={sub.images[0]} alt={sub.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a3c6e]">{sub.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{sub.summary}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1a3c6e]">View details</span>
                    <ArrowRight className="h-4 w-4 text-[#1a3c6e]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#1a3c6e] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="bg-[#f97316] text-white mb-4 hover:bg-[#f97316] border-none px-3 py-1 uppercase tracking-widest text-[10px]">
            Professionals
          </Badge>
          <h1 className="text-4xl font-bold mb-4 capitalize">
            {categoryInfo?.name || category?.replace(/-/g, ' ')}
          </h1>
          <p className="text-blue-100 max-w-2xl">
            Find and hire the best {categoryInfo?.name || category} experts. Verified professionals with top ratings in your city.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Search className="h-4 w-4" /> Search
              </h3>
              <Input 
                placeholder="Business or city..." 
                className="rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                  <input type="checkbox" className="rounded text-[#1a3c6e] focus:ring-[#1a3c6e]" /> Verified Only
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                  <input type="checkbox" className="rounded text-[#1a3c6e] focus:ring-[#1a3c6e]" /> Top Rated (4.5+)
                </label>
              </div>
            </div>

            <div className="bg-[#f97316]/10 p-6 rounded-2xl border border-[#f97316]/20">
              <h4 className="font-bold text-[#1a3c6e] mb-2 text-sm">Need Help?</h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Let us find the right pro for you. Post a request and get quotes.
              </p>
              <a href={getWhatsAppLink(`Hi, I need help with ${categoryInfo?.name || category}.`)} target="_blank" rel="noreferrer">
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </aside>

          {/* Provider List */}
          <div className="flex-grow space-y-6">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-6 animate-pulse">
                  <Skeleton className="h-32 w-32 rounded-xl flex-shrink-0" />
                  <div className="flex-grow space-y-4">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))
            ) : filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <Card key={provider.userId} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl group">
                  <CardContent className="p-0 flex flex-col md:flex-row">
                    <div className="w-full md:w-56 h-48 md:h-auto bg-slate-200 relative overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400`} 
                        alt={provider.businessName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {provider.isVerified && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm uppercase tracking-widest">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </div>
                      )}
                    </div>
                    <div className="flex-grow p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#1a3c6e] transition-colors">
                            {provider.businessName}
                          </h2>
                          <div className="flex items-center text-slate-500 text-sm mt-1 gap-1">
                            <MapPin className="h-3 w-3" /> {provider.city}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {provider.rating}
                          </div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                            {provider.reviewCount} Reviews
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm line-clamp-2 my-4 leading-relaxed">
                        {provider.description || "Leading professional service provider offering high-quality work with customer satisfaction guaranteed."}
                      </p>

                      <div className="mt-auto pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50">
                        <div className="flex flex-wrap gap-2">
                          {provider.categories.slice(0, 3).map(cat => (
                            <Badge key={cat} variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium capitalize">
                              {cat.replace(/-/g, ' ')}
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/providers/${provider.userId}`} className="w-full sm:w-auto">
                          <Button className="w-full bg-[#1a3c6e] hover:bg-[#152e55] text-white rounded-xl font-bold gap-2">
                            View Profile <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <a
                          href={getWhatsAppLink(`Hi, I am interested in ${provider.businessName}.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:w-auto"
                        >
                          <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50 rounded-xl font-bold">
                            WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
                <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No professionals found</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  We couldn't find any professionals for this category in your area yet.
                </p>
                <Link to="/submit-lead">
                  <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-orange-100">
                    Post a Request Instead
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

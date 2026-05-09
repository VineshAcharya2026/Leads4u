import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProviderProfile, Review } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Calendar,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProviderProfilePage() {
  const { id } = useParams();
  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docSnap = await getDoc(doc(db, 'profiles', id));
        if (docSnap.exists()) {
          setProvider(docSnap.data() as ProviderProfile);
        }

        // Fetch reviews
        const reviewsQuery = query(collection(db, 'reviews'), where('providerId', '==', id));
        const reviewsSnap = await getDocs(reviewsQuery);
        setReviews(reviewsSnap.docs.map(doc => doc.data() as Review));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading profile...</div>;
  if (!provider) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold">Profile not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header / Cover */}
      <div className="bg-[#1a3c6e] h-48 md:h-64 relative">
        <div className="max-w-5xl mx-auto px-4 absolute -bottom-16 left-0 right-0">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl bg-white p-2 shadow-2xl relative z-10">
              <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400`} 
                  alt={provider.businessName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-grow pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-sm">{provider.businessName}</h1>
                {provider.isVerified && (
                  <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-green-400 fill-green-400/20" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-blue-100 text-sm font-medium">
                <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {provider.city}</div>
                <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {provider.rating} ({provider.reviewCount} reviews)</div>
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> Opens at 9:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl p-8 bg-white">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About the Business</h2>
              <p className="text-slate-600 leading-relaxed">
                {provider.description || "Welcome to our professional service page. We take pride in delivering top-notch solutions tailored to your needs. With years of experience and a team of dedicated experts, we ensure every project is completed with precision and care. Customer satisfaction is our primary goal."}
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-50">
                <h3 className="font-bold text-slate-900 mb-4">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.categories.map(cat => (
                    <Badge key={cat} variant="secondary" className="bg-[#1a3c6e]/5 text-[#1a3c6e] py-1.5 px-4 rounded-full border-none font-bold capitalize tracking-wide">
                      {cat.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl p-8 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Reviews</h2>
                <Button variant="link" className="text-[#f97316] font-bold">Write a Review</Button>
              </div>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-slate-100 text-slate-500">U</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Happy Customer</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified User</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {review.rating}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-3xl p-6 bg-white sticky top-24">
              <h3 className="font-bold text-slate-900 mb-6 text-xl">Quick Contact</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-100">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-green-700 font-bold uppercase tracking-widest">Call Now</p>
                    <p className="text-lg font-black text-slate-900">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="h-10 w-10 bg-[#1a3c6e] rounded-full flex items-center justify-center text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-bold uppercase tracking-widest">WhatsApp</p>
                    <p className="text-sm font-bold text-slate-900">Chat with business</p>
                  </div>
                </div>
              </div>

              <Link to="/submit-lead">
                <Button className="w-full h-14 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl text-lg font-bold shadow-lg shadow-orange-100 flex items-center justify-center gap-2">
                  Post a Request <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>

              <p className="mt-4 text-[10px] text-center text-slate-400 font-medium px-4">
                By contacting, you agree to Leads4u's Terms of Service and Privacy Policy.
              </p>
            </Card>

            <div className="bg-slate-900 p-6 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-white/10 rounded-full"></div>
              <ShieldCheck className="h-8 w-8 text-[#f97316] mb-4" />
              <h4 className="font-bold mb-2">Leads4u Guarantee</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                All pros on our platform undergo a multi-step verification process to ensure quality and reliability.
              </p>
              <Button variant="link" className="text-white p-0 text-xs font-bold underline">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

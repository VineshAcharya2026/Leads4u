import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Lead } from '../../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PlusCircle,
  Clock,
  MapPin,
  ChevronRight,
  MessageSquare,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function CustomerRequestsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'leads'), where('customerId', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Lead));
        setLeads(data.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [user]);

  return (
    <div className="py-10 px-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1a3c6e] tracking-tight">My Requests</h1>
            <p className="text-slate-400 font-medium mt-1">Track and manage your service connections</p>
          </div>
          <Button
            onClick={() => navigate('/submit-lead')}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-2xl font-bold h-14 px-8 flex items-center gap-2 shadow-xl shadow-orange-100 transition-transform hover:scale-105"
          >
            <PlusCircle className="h-5 w-5" /> Post New Request
          </Button>
        </header>

        <div className="space-y-6">
          {loading ? (
            [1, 2].map((i) => (
              <Card key={i} className="h-40 rounded-3xl animate-pulse bg-white border-none shadow-sm" />
            ))
          ) : leads.length > 0 ? (
            leads.map((lead, idx) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border border-slate-100 shadow-sm rounded-[32px] overflow-hidden bg-white hover:shadow-md transition-shadow group">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-slate-100 text-slate-600 border-none font-bold px-3 py-1 uppercase tracking-wider text-[10px] capitalize">
                            {lead.category.replace(/-/g, ' ')}
                          </Badge>
                          <div className="flex items-center text-xs text-slate-400 font-bold gap-1 uppercase tracking-tighter">
                            <Clock className="h-3 w-3" /> {new Date(lead.createdAt?.toDate()).toLocaleDateString()}
                          </div>
                          <StatusBadge status={lead.status} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1a3c6e] transition-colors leading-tight">
                          {lead.description}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            <MapPin className="h-4 w-4" /> {lead.city}
                          </div>
                          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            Budget: {lead.budget || 'Open'}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center gap-3 md:min-w-[180px]">
                        {lead.status === 'assigned' ? (
                          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
                              <span className="text-xs font-bold text-blue-900">PRO MATCHED</span>
                            </div>
                            <p className="text-xs text-blue-700 leading-snug mb-3">
                              A professional has accepted your request and will contact you soon.
                            </p>
                            <Button className="w-full bg-[#1a3c6e] text-white rounded-xl h-10 text-xs font-bold">
                              View Quote
                            </Button>
                          </div>
                        ) : lead.status === 'open' ? (
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                            <div className="flex justify-center mb-2">
                              <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
                            </div>
                            <p className="text-xs font-bold text-slate-900 mb-1">Searching Pros...</p>
                            <p className="text-[10px] text-slate-400">Wait for responses</p>
                          </div>
                        ) : null}

                        <Button
                          variant="ghost"
                          className="text-slate-400 group-hover:text-slate-900 transition-colors flex items-center justify-center gap-1 text-sm font-bold"
                        >
                          Manage Request <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-[40px] p-20 text-center border-none shadow-sm">
              <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <MessageSquare className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No requests yet</h3>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto">
                Got a job to be done? Post your first request and get matched with verified professionals in minutes.
              </p>
              <Button
                onClick={() => navigate('/submit-lead')}
                className="bg-[#1a3c6e] text-white rounded-xl h-14 px-10 text-lg font-bold shadow-lg shadow-blue-100"
              >
                Post Your First Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string; classes: string }> = {
    open: { label: 'Finding Pros', classes: 'bg-yellow-50 text-yellow-600' },
    assigned: { label: 'Matched', classes: 'bg-blue-50 text-blue-600' },
    completed: { label: 'Completed', classes: 'bg-green-50 text-green-600' },
    cancelled: { label: 'Cancelled', classes: 'bg-slate-50 text-slate-500' },
  };

  const config = configs[status] || configs.open;

  return (
    <Badge className={`${config.classes} border-none font-bold`}>
      {config.label}
    </Badge>
  );
}

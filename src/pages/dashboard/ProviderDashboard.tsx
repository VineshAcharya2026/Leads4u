import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Lead, LeadAssignment, Subscription } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  CreditCard,
  TrendingUp,
  Award,
  LucideIcon,
  Phone,
  User,
  LayoutDashboard,
  MessageSquare,
  Search
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { PLANS } from '../../constants';
import { Progress } from '@/components/ui/progress';

export function ProviderDashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [assignments, setAssignments] = useState<Record<string, LeadAssignment>>({});
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.needsProfileSetup === true) {
      navigate('/provider/profile', { replace: true });
    }
  }, [profile?.needsProfileSetup, navigate, profile]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // Fetch Subscription
        const subDoc = await getDoc(doc(db, 'subscriptions', user.uid));
        if (subDoc.exists()) {
          setSubscription(subDoc.data() as Subscription);
        }

        // Fetch Assignments for this provider
        const assignmentsQuery = query(
          collection(db, 'leadsAssignments'),
          where('providerId', '==', user.uid)
        );
        const assignmentsSnap = await getDocs(assignmentsQuery);
        const assignmentsData: Record<string, LeadAssignment> = {};
        assignmentsSnap.docs.forEach(doc => {
          const data = doc.data() as LeadAssignment;
          assignmentsData[data.leadId] = data;
        });
        setAssignments(assignmentsData);

        // Fetch Leads (either assigned or matching categories)
        // Simplified: Fetch all active leads for now
        const leadsQuery = query(collection(db, 'leads'), where('status', 'in', ['open', 'assigned']));
        const leadsSnap = await getDocs(leadsQuery);
        const leadsData = leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
        
        // Filter leads based on provider's categories (if they have profile)
        if (profile?.role === 'provider') {
          // In real app, you'd filter by category and city here
          setLeads(leadsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, profile]);

  const handleAcceptLead = async (leadId: string) => {
    if (!user || !subscription) {
      toast.error('Active subscription required to accept leads');
      return;
    }

    if (subscription.leadsUsed >= subscription.leadsLimit) {
      toast.error('Monthly lead limit reached. Please upgrade your plan.');
      return;
    }

    try {
      // Create assignment
      await setDoc(doc(db, 'leadsAssignments', `${leadId}_${user.uid}`), {
        leadId,
        providerId: user.uid,
        status: 'accepted',
        assignedAt: serverTimestamp()
      });

      // Update lead status
      await updateDoc(doc(db, 'leads', leadId), {
        status: 'assigned'
      });

      // Update subscription usage
      await updateDoc(doc(db, 'subscriptions', user.uid), {
        leadsUsed: (subscription.leadsUsed || 0) + 1
      });

      toast.success('Lead accepted! Customer contact details revealed.');
      // Refresh logic here
    } catch (err) {
      toast.error('Failed to accept lead');
    }
  };

  const currentPlan = PLANS.find(p => p.id === subscription?.planId);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Provider Header */}
      <div className="bg-[#1a3c6e] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-bold">
              {profile?.displayName?.charAt(0) || 'P'}
            </div>
            <div>
              <h1 className="text-3xl font-bold">Provider Dashboard</h1>
              <p className="text-blue-100 mt-1">Grow your business and manage your leads in one place.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl font-bold" asChild>
              <Link to={user ? `/providers/${user.uid}` : '/'} target="_blank" rel="noreferrer">
                View Public Profile
              </Link>
            </Button>
            <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl font-bold shadow-lg shadow-orange-900/20" asChild>
              <Link to="/provider/profile">Company profile</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Areas */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Zap} title="New Leads" value={leads.length.toString()} color="blue" />
              <StatCard icon={CheckCircle2} title="Converted" value="12" color="green" />
              <StatCard icon={TrendingUp} title="Revenue" value="₹45k" color="orange" />
              <StatCard icon={Award} title="Rating" value="4.9" color="purple" />
            </div>

            {/* Leads Tabs */}
            <Tabs defaultValue="available" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-white border border-slate-200">
                  <TabsTrigger value="available" className="data-[state=active]:bg-slate-100">Available Leads</TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-slate-100">My Active Leads</TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-slate-100">History</TabsTrigger>
                </TabsList>
                <div className="text-xs text-slate-500 hidden md:block">
                  Last updated: Just now
                </div>
              </div>

              <TabsContent value="available" className="mt-0 space-y-4">
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <LeadCard 
                      key={lead.id} 
                      lead={lead} 
                      onAccept={() => handleAcceptLead(lead.id)}
                      isAssigned={!!assignments[lead.id]}
                    />
                  ))
                ) : (
                  <EmptyState title="No leads available" message="Try expanding your categories or checking back later." />
                )}
              </TabsContent>

              <TabsContent value="active" className="mt-0 space-y-4">
                {(Object.values(assignments) as LeadAssignment[]).filter(a => a.status !== 'rejected').map(a => {
                  const lead = leads.find(l => l.id === a.leadId);
                  if (!lead) return null;
                  return <LeadCard key={a.leadId} lead={lead} assignment={a} />;
                })}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Subscription Card */}
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-[#f97316] border-none mb-2 capitalize">{subscription?.planId || 'Free'} Plan</Badge>
                    <h3 className="text-xl font-bold">{currentPlan?.name || 'Starter'}</h3>
                  </div>
                  <CreditCard className="h-6 w-6 text-slate-400" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Leads Used</span>
                    <span className="font-bold">{subscription?.leadsUsed || 0} / {subscription?.leadsLimit || 10}</span>
                  </div>
                  <Progress value={((subscription?.leadsUsed || 0) / (subscription?.leadsLimit || 10)) * 100} className="h-2 bg-slate-800" />
                </div>
              </div>
              <CardContent className="p-6 bg-white">
                <p className="text-xs text-slate-500 mb-6">
                  Leads refresh monthly on your billing date.
                </p>
                <Button className="w-full bg-[#1a3c6e] text-white rounded-xl font-bold opacity-50 cursor-not-allowed">
                  Contact Support to Upgrade
                </Button>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="rounded-3xl border-none shadow-sm p-6 bg-white">
              <h4 className="font-bold text-slate-900 mb-4">Account Health</h4>
              <div className="space-y-4">
                <HealthItem 
                  label="Profile Completion" 
                  value="85%" 
                  status={profile?.description ? 'success' : 'warning'} 
                />
                <HealthItem 
                  label="Response Time" 
                  value="< 2 Hours" 
                  status="success" 
                />
                <HealthItem 
                  label="Verification" 
                  value={profile?.isVerified ? 'Verified' : 'Pending'} 
                  status={profile?.isVerified ? 'success' : 'warning'} 
                />
              </div>
            </Card>

            {/* Quick Tips */}
            <div className="bg-[#1a3c6e] rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <LayoutDashboard className="h-24 w-24 rotate-12" />
              </div>
              <h4 className="font-bold mb-2 text-lg">Pro Tip</h4>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                Businesses that respond to leads within 15 minutes have a 3x higher conversion rate.
              </p>
              <Button variant="link" className="text-[#f97316] font-bold p-0 flex items-center gap-1">
                Read Growth Guide <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }: { icon: LucideIcon, title: string, value: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <Card className="border-none shadow-sm rounded-[32px] p-8 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`${colorMap[color]} h-14 w-14 rounded-2xl flex items-center justify-center`}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </Card>
  );
}

const LeadCard: React.FC<{ lead: Lead, assignment?: LeadAssignment, onAccept?: () => void, isAssigned?: boolean }> = ({ lead, assignment, onAccept, isAssigned }) => {
  return (
    <Card className="border-none shadow-sm rounded-3xl p-6 bg-white hover:shadow-md transition-shadow group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-grow space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-slate-100 text-slate-600 border-none px-3 py-1 font-bold capitalize">
              {lead.category.replace(/-/g, ' ')}
            </Badge>
            <div className="flex items-center text-xs text-slate-400 font-bold gap-1 uppercase tracking-tighter">
              <Clock className="h-3 w-3" /> {new Date(lead.createdAt?.toDate()).toLocaleDateString()}
            </div>
            {lead.urgency === 'high' && (
              <Badge className="bg-red-50 text-red-600 border-none font-bold">Urgent</Badge>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {assignment ? lead.description : lead.description.substring(0, 150) + (lead.description.length > 150 ? '...' : '')}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <MapPin className="h-4 w-4" /> {lead.city}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <TrendingUp className="h-4 w-4" /> Budget: {lead.budget || 'Not specified'}
            </div>
            {assignment && (
              <>
                <div className="flex items-center gap-1.5 bg-[#f97316]/5 text-[#f97316] px-3 py-1.5 rounded-full border border-[#f97316]/10">
                  <User className="h-4 w-4" /> {lead.customerName}
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-full border border-green-100">
                  <Phone className="h-4 w-4" /> {lead.customerPhone}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {assignment ? (
            <div className="flex flex-col gap-2 min-w-[140px]">
              <Button variant="outline" className="rounded-xl border-slate-200 font-bold gap-2">
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </Button>
              <Button className="bg-[#1a3c6e] text-white rounded-xl font-bold">
                Mark Converted
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-[#1a3c6e] hover:bg-[#152e55] text-white rounded-xl font-bold h-12 px-8 shadow-lg shadow-blue-100"
              onClick={onAccept}
              disabled={isAssigned}
            >
              {isAssigned ? 'Accepted' : 'Accept Lead'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function HealthItem({ label, value, status }: { label: string, value: string, status: 'success' | 'warning' | 'danger' }) {
  const statusColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-900">{value}</span>
        <div className={`h-2 w-2 rounded-full ${statusColors[status]}`}></div>
      </div>
    </div>
  );
}

function EmptyState({ title, message }: { title: string, message: string }) {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
      <div className="bg-slate-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-slate-300" />
      </div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

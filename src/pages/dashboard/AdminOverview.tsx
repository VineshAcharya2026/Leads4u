import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Lead } from '../../types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, CreditCard, Activity, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatFirestoreDate } from '../../lib/firestore-time';

const graphData = [
  { name: 'Mon', leads: 400, revenue: 2400 },
  { name: 'Tue', leads: 300, revenue: 1398 },
  { name: 'Wed', leads: 200, revenue: 9800 },
  { name: 'Thu', leads: 278, revenue: 3908 },
  { name: 'Fri', leads: 189, revenue: 4800 },
  { name: 'Sat', leads: 239, revenue: 3800 },
  { name: 'Sun', leads: 349, revenue: 4300 },
];

export function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLeads: 0,
    activeSubscriptions: 0,
    revenue: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const leadsSnap = await getDocs(collection(db, 'leads'));
        const subsSnap = await getDocs(collection(db, 'subscriptions'));

        const recentLeadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5));
        const recentLeadsSnap = await getDocs(recentLeadsQuery);

        setStats({
          totalUsers: usersSnap.size,
          totalLeads: leadsSnap.size,
          activeSubscriptions: subsSnap.size,
          revenue: subsSnap.size * 2499,
        });

        setRecentLeads(recentLeadsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Lead)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const statusBadge = (lead: Lead) => {
    if (lead.status === 'pending_review') return 'bg-amber-50 text-amber-800';
    if (lead.status === 'open') return 'bg-orange-50 text-orange-600';
    if (lead.status === 'assigned') return 'bg-blue-50 text-blue-600';
    if (lead.status === 'completed') return 'bg-green-50 text-green-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="bg-slate-50 p-8 pt-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
            <p className="mt-1 text-slate-500">New requests land in Lead queue until you route them to a provider.</p>
          </div>
          <Button asChild className="rounded-xl bg-[#1a3c6e] font-bold shadow-lg shadow-[#1a3c6e]/20 hover:bg-[#152e55]">
            <Link to="/admin/leads">Open Lead queue</Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard icon={Users} title="Total Users" value={stats.totalUsers.toString()} trend="+12%" color="blue" />
          <AdminStatCard icon={Target} title="Total Leads" value={stats.totalLeads.toString()} trend="+5%" color="orange" />
          <AdminStatCard icon={CreditCard} title="Subscriptions" value={stats.activeSubscriptions.toString()} trend="+18%" color="green" />
          <AdminStatCard icon={Activity} title="Est. Revenue" value={`₹${(stats.revenue / 1000).toFixed(0)}k`} trend="+21%" color="purple" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="rounded-3xl border-none bg-white p-6 shadow-sm lg:col-span-2">
            <CardHeader className="mb-6 flex flex-row items-center justify-between p-0">
              <div>
                <CardTitle className="text-lg font-bold">Platform Performance</CardTitle>
                <p className="text-xs text-slate-500">Sample weekly volumes (dashboard chart)</p>
              </div>
              <Badge variant="outline" className="text-xs">
                SAMPLE
              </Badge>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="leads" fill="#1a3c6e" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-3xl border-none bg-white p-6 shadow-sm">
            <CardHeader className="mb-6 p-0">
              <CardTitle className="text-lg font-bold">Routing</CardTitle>
              <p className="text-xs text-slate-500">Customer posts → your queue → assign provider.</p>
            </CardHeader>
            <Link
              to="/admin/leads"
              className="flex items-center justify-between rounded-2xl bg-[#e8eef9] p-4 font-bold text-[#1a3c6e] transition-colors hover:bg-[#dce6f7]"
            >
              Manage pending leads
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            {loading && <p className="mt-4 text-xs text-slate-400">Refreshing stats…</p>}
          </Card>
        </div>

        <Card className="overflow-hidden rounded-3xl border-none bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-8">
            <div>
              <CardTitle className="text-xl font-bold">Recent Leads Activity</CardTitle>
              <p className="text-sm text-slate-500">Latest five by created date</p>
            </div>
            <Button asChild size="sm" variant="outline" className="rounded-xl font-bold">
              <Link to="/admin/leads">Full queue</Link>
            </Button>
          </CardHeader>
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="border-none font-bold text-slate-900">Customer</TableHead>
                <TableHead className="border-none font-bold text-slate-900">Category</TableHead>
                <TableHead className="border-none font-bold text-slate-900">Location</TableHead>
                <TableHead className="border-none text-right font-bold text-slate-900">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id} className="transition-colors hover:bg-slate-50/50">
                  <TableCell className="align-middle font-medium">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{lead.customerName || 'Customer'}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                        {formatFirestoreDate(lead.createdAt)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle">
                    <Badge variant="secondary" className="border-none bg-slate-100 font-medium capitalize text-slate-600">
                      {lead.category.replace(/-/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-middle text-slate-600">{lead.city}</TableCell>
                  <TableCell className="align-middle text-right">
                    <Badge className={`border-none font-bold capitalize ${statusBadge(lead)}`}>{lead.status.replace('_', ' ')}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

function AdminStatCard({
  icon: Icon,
  title,
  value,
  trend,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  trend: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
  };

  return (
    <Card className="flex flex-col justify-between rounded-[32px] border-none bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colorMap[color]}`}>
          <Icon className="h-7 w-7" />
        </div>
        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-500">{trend}</span>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="mt-1 text-3xl font-bold text-slate-900">{value}</h3>
      </div>
    </Card>
  );
}

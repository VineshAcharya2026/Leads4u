import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Lead, UserProfile } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  CreditCard, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

const graphData = [
  { name: 'Mon', leads: 400, revenue: 2400 },
  { name: 'Tue', leads: 300, revenue: 1398 },
  { name: 'Wed', leads: 200, revenue: 9800 },
  { name: 'Thu', leads: 278, revenue: 3908 },
  { name: 'Fri', leads: 189, revenue: 4800 },
  { name: 'Sat', leads: 239, revenue: 3800 },
  { name: 'Sun', leads: 349, revenue: 4300 },
];

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLeads: 0,
    activeSubscriptions: 0,
    revenue: 0
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
          revenue: subsSnap.size * 2499 // rough estimate
        });

        setRecentLeads(recentLeadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-slate-500 mt-1">Real-time overview of your lead generation platform.</p>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard icon={Users} title="Total Users" value={stats.totalUsers.toString()} trend="+12%" color="blue" />
          <AdminStatCard icon={Target} title="Total Leads" value={stats.totalLeads.toString()} trend="+5%" color="orange" />
          <AdminStatCard icon={CreditCard} title="Subscriptions" value={stats.activeSubscriptions.toString()} trend="+18%" color="green" />
          <AdminStatCard icon={Activity} title="Est. Revenue" value={`₹${(stats.revenue/1000).toFixed(0)}k`} trend="+21%" color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl p-6 bg-white">
            <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Platform Performance</CardTitle>
                <p className="text-xs text-slate-500">Weekly lead volume vs Subscription revenue</p>
              </div>
              <Badge variant="outline" className="text-xs">LAST 7 DAYS</Badge>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    cursor={{fill: '#f8fafc'}}
                  />
                  <Bar dataKey="leads" fill="#1a3c6e" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pending Verifications */}
          <Card className="border-none shadow-sm rounded-3xl p-6 bg-white">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-bold">Pending Verifications</CardTitle>
              <p className="text-xs text-slate-500">Providers waiting for manual review</p>
            </CardHeader>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center font-bold text-[#1a3c6e] border border-slate-200">
                      {i === 1 ? 'A' : i === 2 ? 'G' : 'S'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Provider {i}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Painting Service</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#1a3c6e] transition-colors" />
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 text-center">
                <button className="text-xs font-bold text-[#1a3c6e] hover:underline">View All Requests</button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Recent Leads Activity</CardTitle>
              <p className="text-sm text-slate-500">Monitor latest customer requests across the platform</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-bold">Export CSV</Button>
          </CardHeader>
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold text-slate-900 border-none">Customer</TableHead>
                <TableHead className="font-bold text-slate-900 border-none">Category</TableHead>
                <TableHead className="font-bold text-slate-900 border-none">Location</TableHead>
                <TableHead className="font-bold text-slate-900 border-none text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium align-middle">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{lead.customerName}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">{new Date(lead.createdAt?.toDate()).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none capitalize font-medium">
                      {lead.category.replace(/-/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-middle text-slate-600">{lead.city}</TableCell>
                  <TableCell className="text-right align-middle">
                    <Badge className={`${
                      lead.status === 'open' ? 'bg-orange-50 text-orange-600' :
                      lead.status === 'assigned' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    } border-none font-bold capitalize`}>
                      {lead.status}
                    </Badge>
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

function AdminStatCard({ icon: Icon, title, value, trend, color }: { icon: any, title: string, value: string, trend: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50'
  };

  return (
    <Card className="border-none shadow-sm rounded-[32px] p-8 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`${colorMap[color]} h-14 w-14 rounded-2xl flex items-center justify-center`}>
          <Icon className="h-7 w-7" />
        </div>
        <span className="text-green-500 text-xs font-bold bg-green-50 px-2.5 py-1 rounded-full">{trend}</span>
      </div>
      <div className="mt-6">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </Card>
  );
}

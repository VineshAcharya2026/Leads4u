import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import type { Lead, ProviderProfile } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatFirestoreDate } from '../../lib/firestore-time';
import { MapPin, User, ArrowRightLeft, Loader2 } from 'lucide-react';

export function AdminLeadsPage() {
  const { user } = useAuth();
  const [pending, setPending] = useState<Lead[]>([]);
  const [providers, setProviders] = useState<(ProviderProfile & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [routingId, setRoutingId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const pendingSnap = await getDocs(
        query(collection(db, 'leads'), where('status', '==', 'pending_review'), orderBy('createdAt', 'desc')),
      );
      setPending(pendingSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Lead)));

      const profilesSnap = await getDocs(collection(db, 'profiles'));
      const list = profilesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as ProviderProfile) }));
      list.sort((a, b) => (a.businessName || '').localeCompare(b.businessName || ''));
      setProviders(list);
    } catch (e) {
      console.error(e);
      toast.error('Could not load queue. Deploy Firestore indexes if this is your first routed lead.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const routeLead = async (lead: Lead) => {
    const providerId = selectedProvider[lead.id];
    if (!providerId || !user) {
      toast.error('Pick a provider first.');
      return;
    }
    setRoutingId(lead.id);
    try {
      const assignmentId = `${lead.id}_${providerId}`;
      await setDoc(doc(db, 'leadsAssignments', assignmentId), {
        leadId: lead.id,
        providerId,
        status: 'routed',
        assignedAt: serverTimestamp(),
        routingSource: 'admin',
        routedByUserId: user.uid,
      });

      await updateDoc(doc(db, 'leads', lead.id), {
        status: 'assigned',
        routedProviderId: providerId,
        routedAt: serverTimestamp(),
      });

      toast.success(`Routed to ${providers.find((p) => p.id === providerId)?.businessName ?? 'provider'}`);
      setSelectedProvider((prev) => {
        const next = { ...prev };
        delete next[lead.id];
        return next;
      });
      await load();
    } catch (e) {
      console.error(e);
      toast.error('Could not route lead. Check rules and indexes.');
    } finally {
      setRoutingId(null);
    }
  };

  const providerOptions = useMemo(
    () =>
      providers.map((p) => ({
        id: p.id,
        label: `${p.businessName}${p.city ? ` · ${p.city}` : ''}`,
      })),
    [providers],
  );

  return (
    <div className="mx-auto max-w-5xl p-8 pt-10">
      <header className="mb-10">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a3c6e]/10 text-[#1a3c6e]">
            <ArrowRightLeft className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead queue</h1>
            <p className="mt-1 text-slate-500">
              New customer posts appear here first. Assign each request to a provider — only then they see full details.
            </p>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-500">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Loading leads…
        </div>
      ) : pending.length === 0 ? (
        <Card className="rounded-3xl border-dashed border-slate-200 bg-white">
          <CardContent className="py-16 text-center text-slate-500">
            <p className="font-semibold text-slate-700">Queue is empty</p>
            <p className="mt-2 text-sm">New requests will appear when customers submit from Post a request.</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-6">
          {pending.map((lead) => (
            <li key={lead.id}>
              <Card className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-50 bg-slate-50/80">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 border-none bg-amber-100 font-bold uppercase text-amber-900">Needs routing</Badge>
                      <CardTitle className="text-lg text-slate-900">{lead.category.replace(/-/g, ' ')}</CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-3 pt-2 text-sm">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <User className="h-4 w-4" /> {lead.customerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {lead.city} {lead.pincode}
                        </span>
                        <span className="text-slate-400">{formatFirestoreDate(lead.createdAt)}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                  <p className="leading-relaxed text-slate-700">{lead.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    {lead.budget ? (
                      <Badge variant="outline" className="font-medium">
                        Budget: {lead.budget}
                      </Badge>
                    ) : null}
                    <Badge variant="outline" className="font-medium capitalize">
                      Urgency: {lead.urgency}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs">
                      ID {lead.id.slice(0, 8)}…
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end">
                    <div className="min-w-[220px] flex-1 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Route to provider</p>
                      <Select
                        value={selectedProvider[lead.id] ?? ''}
                        onValueChange={(v) => setSelectedProvider((prev) => ({ ...prev, [lead.id]: v }))}
                      >
                        <SelectTrigger className="rounded-xl border-slate-200 font-semibold">
                          <SelectValue placeholder="Select provider…" />
                        </SelectTrigger>
                        <SelectContent>
                          {providerOptions.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="h-11 rounded-xl bg-[#f97316] font-bold hover:bg-[#ea580c] sm:h-11"
                      disabled={routingId === lead.id || !selectedProvider[lead.id]}
                      onClick={() => void routeLead(lead)}
                    >
                      {routingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Assign provider'}
                    </Button>
                  </div>
                  {providers.length === 0 && (
                    <p className="text-xs text-amber-800">No provider profiles yet. Providers must register so they appear here.</p>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

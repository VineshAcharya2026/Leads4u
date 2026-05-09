import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import type { ProviderProfile } from '../../types';
import { CATEGORIES } from '../../constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export function ProviderCompanyProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, 'profiles', user.uid));
        if (snap.exists()) {
          const p = snap.data() as ProviderProfile;
          setBusinessName(p.businessName ?? '');
          setDescription(p.description ?? '');
          setPrimaryCategory(p.categories?.[0] ?? '');
          setCity(p.city ?? '');
          setPincode(p.pincode ?? '');
          setAddress(p.address ?? '');
        }
      } catch (e) {
        console.error(e);
        toast.error('Could not load company profile.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!businessName.trim() || !primaryCategory || !city.trim()) {
      toast.error('Business name, category, and city are required.');
      return;
    }
    setSaving(true);
    try {
      const ref = doc(db, 'profiles', user.uid);
      const snap = await getDoc(ref);
      const payload = {
        userId: user.uid,
        businessName: businessName.trim(),
        description: description.trim(),
        categories: [primaryCategory],
        city: city.trim(),
        pincode: pincode.trim(),
        address: address.trim(),
      };
      if (snap.exists()) {
        await updateDoc(ref, payload);
      } else {
        await setDoc(ref, {
          ...payload,
          rating: 5,
          reviewCount: 0,
          isVerified: false,
        });
      }
      await updateDoc(doc(db, 'users', user.uid), { needsProfileSetup: false });
      await refreshProfile();
      toast.success('Company profile saved.');
    } catch (err) {
      console.error(err);
      toast.error('Could not save company profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  const flatCategories = CATEGORIES.flatMap((c) => c.subcategories);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="ghost" asChild className="rounded-xl font-bold text-slate-600">
            <Link to="/provider">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl font-bold border-slate-200">
            <Link to={`/providers/${user.uid}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Public profile
            </Link>
          </Button>
        </div>

        <Card className="rounded-3xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-[#1a3c6e]">Company profile</CardTitle>
            <CardDescription>What customers see on your public listing.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="biz">Business name</Label>
                <Input id="biz" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat">Primary category</Label>
                <Select value={primaryCategory} onValueChange={setPrimaryCategory} required>
                  <SelectTrigger id="cat">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {flatCategories.map((sc) => (
                      <SelectItem key={sc.slug} value={sc.slug}>
                        {sc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your services and experience."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin">Pincode</Label>
                  <Input id="pin" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="addr">Address</Label>
                <Input id="addr" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, area" />
              </div>
              <Button type="submit" className="w-full rounded-xl bg-[#1a3c6e] font-bold h-11" disabled={saving}>
                {saving ? 'Saving…' : 'Save company profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

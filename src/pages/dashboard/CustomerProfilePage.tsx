import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import type { CustomerAccountType } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Building2, User } from 'lucide-react';

export function CustomerProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountType, setAccountType] = useState<CustomerAccountType>('individual');
  const [companyName, setCompanyName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.displayName ?? '');
    setPhoneNumber(profile.phoneNumber ?? '');
    setAccountType(profile.customerAccountType ?? 'individual');
    setCompanyName(profile.companyName ?? '');
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (accountType === 'company' && !companyName.trim()) {
      toast.error('Enter your company name.');
      return;
    }
    setSaving(true);
    try {
      const ref = doc(db, 'users', user.uid);
      const payload: Record<string, string | boolean> = {
        displayName: displayName.trim(),
        phoneNumber: phoneNumber.trim(),
        customerAccountType: accountType,
        needsProfileSetup: false,
      };
      if (accountType === 'company') {
        payload.companyName = companyName.trim();
      } else {
        payload.companyName = '';
      }
      await updateDoc(ref, payload);
      await refreshProfile();
      toast.success('Profile updated.');
    } catch (err) {
      console.error(err);
      toast.error('Could not save profile. Check you are signed in and try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="py-16 text-center text-slate-500">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a3c6e] tracking-tight">Customer profile</h1>
          <p className="text-slate-500 mt-1 text-sm">Used when you post service requests.</p>
        </div>

        <Card className="rounded-3xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle>Account type</CardTitle>
            <CardDescription>Individual or company / organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={accountType === 'individual' ? 'default' : 'outline'}
                className={accountType === 'individual' ? 'bg-[#1a3c6e]' : ''}
                onClick={() => setAccountType('individual')}
              >
                <User className="h-4 w-4 mr-2" />
                Individual
              </Button>
              <Button
                type="button"
                variant={accountType === 'company' ? 'default' : 'outline'}
                className={accountType === 'company' ? 'bg-[#1a3c6e]' : ''}
                onClick={() => setAccountType('company')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Company
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              {accountType === 'company' && (
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Pvt Ltd"
                    required={accountType === 'company'}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="displayName">{accountType === 'company' ? 'Contact person' : 'Full name'}</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 …"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl bg-[#1a3c6e] font-bold h-11" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

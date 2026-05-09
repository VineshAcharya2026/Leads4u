import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { postAuthDestination } from '../lib/dashboard-paths';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function SettingsPage() {
  const { user, profile, refreshProfile, loading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.displayName ?? '');
    setPhoneNumber(profile.phoneNumber ?? '');
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName.trim(),
        phoneNumber: phoneNumber.trim(),
      });
      await refreshProfile();
      toast.success('Settings saved.');
    } catch (err) {
      console.error(err);
      toast.error('Could not save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-600">
        <p className="text-sm font-medium">Loading account…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-slate-800 font-semibold max-w-md">
          We couldn&apos;t load your account record from the database. Check your connection, or try again.
        </p>
        <Button type="button" className="rounded-xl bg-[#1a3c6e] font-bold" onClick={() => void refreshProfile()}>
          Retry
        </Button>
      </div>
    );
  }

  const profileLink =
    profile.role === 'customer'
      ? '/dashboard/profile'
      : profile.role === 'provider'
        ? '/provider/profile'
        : null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Account settings</h1>
          <p className="text-slate-500 text-sm mt-1">Basic details for your Leads4u account.</p>
        </div>

        <Card className="rounded-3xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Shown across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dn">Display name</Label>
                <Input id="dn" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="em">Email</Label>
                <Input id="em" value={profile.email} disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ph">Phone</Label>
                <Input id="ph" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <Button type="submit" className="w-full rounded-xl bg-[#1a3c6e] font-bold h-11" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {profileLink && (
          <Card className="rounded-3xl border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                {profile.role === 'customer' ? 'Customer profile' : 'Company profile'}
              </CardTitle>
              <CardDescription>
                {profile.role === 'customer'
                  ? 'Account type, company name, and contact preferences.'
                  : 'Public listing and business details.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full rounded-xl font-bold justify-between h-12" asChild>
                <Link to={profileLink}>
                  Open profile editor
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Button variant="ghost" className="w-full text-slate-600 font-bold" asChild>
          <Link to={postAuthDestination(profile)}>Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

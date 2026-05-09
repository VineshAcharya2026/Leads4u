import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { firebaseAppMessage } from '../lib/auth-errors';
import { buildUserDocumentFromAuthUser } from '../lib/user-firestore';
import { RedirectPendingError, signInWithGoogle } from '../lib/google-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail, Lock, User, Briefcase, MapPin } from 'lucide-react';

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');

  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');

  const handleAuth = async (e: React.FormEvent, mode: 'login' | 'register') => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        if (role === 'provider') {
          if (!businessName.trim() || !category.trim() || !city.trim()) {
            toast.error('Please complete business name, category, and city for a provider account.');
            return;
          }
        }

        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        try {
          await setDoc(doc(db, 'users', user.uid), {
            ...buildUserDocumentFromAuthUser(user, role),
            displayName: displayName.trim() || user.displayName || '',
            email: email.trim(),
          });

          if (role === 'provider') {
            await setDoc(doc(db, 'profiles', user.uid), {
              userId: user.uid,
              businessName: businessName.trim(),
              categories: [category],
              city: city.trim(),
              rating: 5,
              reviewCount: 0,
              isVerified: false,
              description: '',
              pincode: '',
              address: '',
            });
          }

          toast.success('Account created successfully!');
        } catch (persistErr) {
          try {
            await deleteUser(user);
          } catch {
            /* best-effort: account may remain without Firestore profile */
          }
          throw persistErr;
        }
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        toast.success('Welcome back!');
      }
      navigate('/');
    } catch (error: unknown) {
      toast.error(firebaseAppMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle(auth);
      toast.success('Signed in with Google');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof RedirectPendingError) {
        toast.info('Continuing with Google…', {
          description: 'Complete sign-in in the redirect flow if your browser opened a new page.',
        });
        return;
      }
      toast.error(firebaseAppMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Tabs key={initialMode} defaultValue={initialMode} className="w-full">
          <TabsList className="mb-8 grid h-12 w-full grid-cols-2 rounded-xl border border-slate-200 bg-white p-1">
            <TabsTrigger
              value="login"
              className="rounded-lg transition-all data-[state=active]:bg-[#1a3c6e] data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="rounded-lg transition-all data-[state=active]:bg-[#1a3c6e] data-[state=active]:text-white"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="overflow-hidden rounded-3xl border-none shadow-xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-center text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription className="text-center italic">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => handleAuth(e, 'login')}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        className="h-11 pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="h-11 pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="h-11 w-full rounded-xl bg-[#1a3c6e] text-lg font-semibold hover:bg-[#152e55]" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full rounded-xl border-slate-200 text-slate-900 hover:bg-slate-50"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading || loading}
                >
                  <svg className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    />
                  </svg>
                  {googleLoading ? 'Connecting…' : 'Continue with Google'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="overflow-hidden rounded-3xl border-none shadow-xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-center text-2xl font-bold">Create account</CardTitle>
                <CardDescription className="text-center">
                  Join Leads4u and start finding or providing services
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleAuth(e, 'register')} className="flex flex-col">
                <CardContent className="custom-scrollbar max-h-[60vh] space-y-4 overflow-y-auto pr-2">
                  <div className="space-y-2">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button type="button" variant={role === 'customer' ? 'default' : 'outline'} className={role === 'customer' ? 'bg-[#1a3c6e]' : ''} onClick={() => setRole('customer')}>
                        Customer
                      </Button>
                      <Button type="button" variant={role === 'provider' ? 'default' : 'outline'} className={role === 'provider' ? 'bg-[#1a3c6e]' : ''} onClick={() => setRole('provider')}>
                        Provider
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input id="reg-name" placeholder="John Doe" className="pl-10" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required autoComplete="name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input id="reg-email" type="email" placeholder="name@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input id="reg-password" type="password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password" />
                    </div>
                  </div>

                  {role === 'provider' && (
                    <div className="space-y-4 border-t border-slate-100 pt-4">
                      <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Briefcase className="h-4 w-4 text-[#f97316]" /> Business Details
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="biz-name">Business Name</Label>
                        <Input id="biz-name" placeholder="Acme Services Ltd" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required={role === 'provider'} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="biz-category-trigger">Primary Category</Label>
                        <Select value={category} onValueChange={setCategory} required={role === 'provider'}>
                          <SelectTrigger id="biz-category-trigger">
                            <SelectValue placeholder="Select service category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.flatMap((c) => c.subcategories).map((sc) => (
                              <SelectItem key={sc.slug} value={sc.slug}>
                                {sc.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="biz-city">City</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input id="biz-city" placeholder="Mumbai" className="pl-10" value={city} onChange={(e) => setCity(e.target.value)} required={role === 'provider'} />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pt-6">
                  <Button type="submit" className="h-11 w-full rounded-xl bg-[#1a3c6e] text-lg font-semibold hover:bg-[#152e55]" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-600">Or continue with</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full rounded-xl border-slate-200 text-slate-900 hover:bg-slate-50"
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading || loading}
                  >
                    <svg className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      />
                    </svg>
                    {googleLoading ? 'Connecting…' : 'Sign up with Google'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

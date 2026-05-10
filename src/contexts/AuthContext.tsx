import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { completeGoogleRedirectIfAny } from '../lib/google-auth';
import { ensureCustomerUserDocument } from '../lib/user-firestore';
import { isMasterAdminEmail } from '../lib/master-admin';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const promotedMasterRef = useRef(false);

  const refreshProfile = React.useCallback(async () => {
    const u = auth.currentUser;
    if (!u) {
      setProfile(null);
      return;
    }
    const userDoc = await getDoc(doc(db, 'users', u.uid));
    if (userDoc.exists()) {
      setProfile(userDoc.data() as UserProfile);
    } else {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        await completeGoogleRedirectIfAny(auth);
      } catch (err) {
        if (import.meta.env.DEV) console.error('[auth] Google redirect completion failed:', err);
      }

      if (!active) return;

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!active) return;

        setUser(firebaseUser);
        if (firebaseUser) {
          try {
            await ensureCustomerUserDocument(firebaseUser);
          } catch (err) {
            if (import.meta.env.DEV) console.error('[auth] Failed to ensure user document:', err);
          }

          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              setProfile(userDoc.data() as UserProfile);
            } else {
              setProfile(null);
            }
          } catch (err) {
            if (import.meta.env.DEV) console.error('[auth] Failed to load users profile:', err);
            setProfile(null);
          }
        } else {
          setProfile(null);
          promotedMasterRef.current = false;
        }
        setLoading(false);
      });
    })();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  /** Promotes vineshjm@gmail.com to admin once Rules allow masterEmailPromotion. */
  useEffect(() => {
    if (loading || !user?.uid || !user.email) return;
    if (!isMasterAdminEmail(user.email)) return;
    if (!profile || profile.role === 'admin') return;
    if (promotedMasterRef.current) return;
    promotedMasterRef.current = true;
    void (async () => {
      try {
        await updateDoc(doc(db, 'users', user.uid), { role: 'admin' });
        await refreshProfile();
      } catch (err) {
        promotedMasterRef.current = false;
        if (import.meta.env.DEV) console.error('[auth] Master admin promotion failed:', err);
      }
    })();
  }, [loading, user, profile, refreshProfile]);

  useEffect(() => {
    if (!user?.email || !isMasterAdminEmail(user.email)) promotedMasterRef.current = false;
  }, [user?.email]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

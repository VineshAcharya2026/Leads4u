import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { completeGoogleRedirectIfAny } from '../lib/google-auth';
import { ensureCustomerUserDocument } from '../lib/user-firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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

          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    })();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

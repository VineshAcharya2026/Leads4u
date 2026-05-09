import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { postAuthDestination } from '../lib/dashboard-paths';

const STORAGE_KEY = 'leads4uPostAuthRedirect';

/** After Google redirect sign-in, send user to the correct dashboard once profile is loaded. */
export function PostAuthRedirect() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user || !profile) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) !== '1') return;
      sessionStorage.removeItem(STORAGE_KEY);
      navigate(postAuthDestination(profile), { replace: true });
    } catch {
      /* storage blocked */
    }
  }, [loading, user, profile, navigate]);

  return null;
}

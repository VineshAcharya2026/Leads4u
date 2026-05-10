import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isMasterAdminEmail } from '../lib/master-admin';

/** Public entry: send signed-out users to auth with post-login `/admin`; wait for master promotion then enter. */
export function AdminLoginPage() {
  const { user, profile, loading } = useAuth();

  if (!user) {
    return <Navigate to="/auth?mode=login&next=/admin" replace />;
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
        <p className="text-sm font-medium">Loading your account…</p>
      </div>
    );
  }

  const awaitingMasterPromotion =
    !!user.email &&
    isMasterAdminEmail(user.email) &&
    profile.role !== 'admin';

  if (awaitingMasterPromotion) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
        <p className="text-sm font-medium">Preparing master admin access…</p>
      </div>
    );
  }

  if (profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/admin" replace />;
}

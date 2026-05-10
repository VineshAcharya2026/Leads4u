/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { Layout } from './components/Layout';
import { PostAuthRedirect } from './components/PostAuthRedirect';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { LeadSubmissionPage } from './pages/LeadSubmissionPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProviderProfilePage } from './pages/ProviderProfilePage';
import { SubServiceDetailPage } from './pages/SubServiceDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Dashboards
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminLayout } from './pages/dashboard/AdminLayout';
import { AdminOverview } from './pages/dashboard/AdminOverview';
import { AdminLeadsPage } from './pages/dashboard/AdminLeadsPage';
import { ProviderDashboard } from './pages/dashboard/ProviderDashboard';
import { ProviderCompanyProfilePage } from './pages/dashboard/ProviderCompanyProfilePage';
import { CustomerDashboardLayout } from './pages/dashboard/CustomerDashboardLayout';
import { CustomerRequestsPage } from './pages/dashboard/CustomerRequestsPage';
import { CustomerProfilePage } from './pages/dashboard/CustomerProfilePage';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { UserRole } from './types';
import { isMasterAdminEmail } from './lib/master-admin';

function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: UserRole;
}) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  // Wait for Firestore profile before role-gating (null profile must not be treated as "wrong role").
  if (requiredRole && !profile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
        <p className="text-sm font-medium">Loading your account…</p>
      </div>
    );
  }
  if (requiredRole === 'admin' && profile) {
    const awaitingMasterPromotion =
      !!user.email &&
      isMasterAdminEmail(user.email) &&
      profile.role !== 'admin';
    if (awaitingMasterPromotion) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
          <p className="text-sm font-medium">Preparing master admin access…</p>
        </div>
      );
    }
  }
  if (requiredRole && profile.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <PostAuthRedirect />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/submit-lead" element={<LeadSubmissionPage />} />
              <Route path="/services/:category" element={<CategoryPage />} />
              <Route path="/services/:category/:subservice" element={<SubServiceDetailPage />} />
              <Route path="/providers/:id" element={<ProviderProfilePage />} />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/admin/login" element={<AdminLoginPage />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="leads" element={<AdminLeadsPage />} />
              </Route>
              <Route
                path="/provider"
                element={
                  <ProtectedRoute requiredRole="provider">
                    <ProviderDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/provider/profile"
                element={
                  <ProtectedRoute requiredRole="provider">
                    <ProviderCompanyProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CustomerRequestsPage />} />
                <Route path="profile" element={<CustomerProfilePage />} />
              </Route>
            </Routes>
          </Layout>
          <Toaster position="top-right" />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}

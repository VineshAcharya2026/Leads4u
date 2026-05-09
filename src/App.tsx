/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { LeadSubmissionPage } from './pages/LeadSubmissionPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProviderProfilePage } from './pages/ProviderProfilePage';
import { SubServiceDetailPage } from './pages/SubServiceDetailPage';

// Dashboards
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { ProviderDashboard } from './pages/dashboard/ProviderDashboard';
import { CustomerDashboard } from './pages/dashboard/CustomerDashboard';
import { TooltipProvider } from '@/components/ui/tooltip';

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  if (requiredRole && profile?.role !== requiredRole) return <Navigate to="/" />;

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/submit-lead" element={<LeadSubmissionPage />} />
            <Route path="/services/:category" element={<CategoryPage />} />
            <Route path="/services/:category/:subservice" element={<SubServiceDetailPage />} />
            <Route path="/providers/:id" element={<ProviderProfilePage />} />

            {/* Dashboards */}
            <Route path="/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/provider/*" element={
              <ProtectedRoute requiredRole="provider">
                <ProviderDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/*" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);
}

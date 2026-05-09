import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { to: '/dashboard', label: 'My requests', icon: LayoutDashboard },
  { to: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

export function CustomerDashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.needsProfileSetup !== true) return;
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      navigate('/dashboard/profile', { replace: true });
    }
  }, [profile?.needsProfileSetup, pathname, navigate, profile]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-1 py-3">
          {links.map(({ to, label, icon: Icon }) => {
            const active =
              to === '/dashboard'
                ? pathname === '/dashboard' || pathname === '/dashboard/'
                : pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors',
                  active ? 'bg-[#1a3c6e] text-white' : 'text-slate-600 hover:bg-slate-100',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

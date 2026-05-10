import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
      <div className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-1 px-4 py-3 sm:px-6 lg:px-8">
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
                  'group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200',
                  active
                    ? 'bg-[#1a3c6e] text-white shadow-md shadow-[#1a3c6e]/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:shadow-sm',
                )}
              >
                <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

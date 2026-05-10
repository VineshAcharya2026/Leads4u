import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <span className="mr-3 text-sm font-bold text-slate-400">Master admin</span>
          {[
            { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
            { to: '/admin/leads', end: false, label: 'Lead queue', icon: ListTodo },
          ].map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200',
                  isActive
                    ? 'bg-[#1a3c6e] text-white shadow-md shadow-[#1a3c6e]/25'
                    : 'text-slate-600 hover:bg-slate-100',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import type { LucideIcon } from 'lucide-react';
import {
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  PlusCircle,
  Bell,
  Settings,
  House,
  Info,
  LayoutGrid,
  Mail,
} from 'lucide-react';
import { postAuthDestination, profileEditorPath } from '../lib/dashboard-paths';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type NavMatch = 'default' | 'services' | 'lead';

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  /** Home row: larger icon treatment */
  emphasize?: boolean;
  match: NavMatch;
};

const MAIN_NAV: NavItem[] = [
  { to: '/', label: 'Home', icon: House, end: true, emphasize: true, match: 'default' },
  { to: '/about', label: 'About us', icon: Info, match: 'default' },
  { to: '/services/home-services', label: 'Services', icon: LayoutGrid, match: 'services' },
  { to: '/contact', label: 'Contact us', icon: Mail, match: 'default' },
  { to: '/submit-lead', label: 'Post a request', icon: PlusCircle, match: 'lead' },
];

function navItemActive(pathname: string, item: NavItem, navIsActive: boolean): boolean {
  if (item.match === 'services') return pathname.startsWith('/services');
  if (item.match === 'lead') return pathname.startsWith('/submit-lead');
  return navIsActive;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const dashboardPath = React.useMemo(() => (profile ? postAuthDestination(profile) : '/'), [profile]);

  const linkClassDesktop = ({ isActive }: { isActive: boolean }, item: NavItem) => {
    const active = navItemActive(pathname, item, isActive);
    return cn(
      'group relative flex items-center gap-2 rounded-xl px-2.5 py-2 lg:gap-2.5 lg:px-3 lg:py-2.5',
      'text-[13px] font-semibold transition-all duration-300 ease-out',
      'hover:bg-slate-50 hover:text-[#1a3c6e]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3c6e]/30 focus-visible:ring-offset-2',
      active && 'bg-[#e8eef9]/95 text-[#1a3c6e] shadow-sm shadow-[#1a3c6e]/5',
      !active && 'text-slate-600',
    );
  };

  const iconWrapClass = (active: boolean, emphasize?: boolean) =>
    cn(
      'flex shrink-0 items-center justify-center rounded-xl transition-all duration-300 ease-out',
      emphasize
        ? 'h-10 w-10 lg:h-11 lg:w-11'
        : 'h-8 w-8 lg:h-9 lg:w-9',
      emphasize &&
        cn(
          'bg-[#1a3c6e] text-white shadow-md shadow-[#1a3c6e]/20',
          'group-hover:scale-[1.04] group-hover:shadow-lg',
          active && 'ring-2 ring-[#f97316]/90 ring-offset-2 ring-offset-white',
          !active && 'opacity-95 group-hover:opacity-100',
        ),
      !emphasize &&
        cn(
          'bg-slate-100 text-slate-600 group-hover:scale-[1.05]',
          'group-hover:bg-white group-hover:text-[#1a3c6e] group-hover:shadow-md group-hover:ring-1 group-hover:ring-[#1a3c6e]/10',
          active && 'scale-[1.02] bg-white text-[#1a3c6e] shadow-md ring-1 ring-[#1a3c6e]/20',
          !active && 'group-hover:bg-[#fafafa]',
        ),
    );

  const iconClass = (emphasize?: boolean) =>
    emphasize ? 'h-5 w-5 lg:h-6 lg:w-6 drop-shadow-sm' : 'h-4 w-4 lg:h-[18px] lg:w-[18px]';

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md transition-[background,box-shadow] duration-300 supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 shrink-0 items-center">
            <Link
              to="/"
              className="group flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a3c6e] shadow-md shadow-[#1a3c6e]/25 transition-shadow duration-300 group-hover:shadow-lg">
                <div className="h-4 w-4 rounded-full bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1a3c6e] sm:text-2xl">Leads4u</span>
            </Link>
          </div>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center md:flex"
            aria-label="Main"
          >
            <div className="flex items-center gap-0.5 lg:gap-1">
              {MAIN_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to + item.label}
                    to={item.to}
                    end={item.end}
                    className={(state) => linkClassDesktop(state, item)}
                  >
                    {({ isActive }) => {
                      const active = navItemActive(pathname, item, isActive);
                      return (
                        <>
                          <span className={iconWrapClass(active, item.emphasize)} aria-hidden>
                            <Icon className={iconClass(item.emphasize)} strokeWidth={2} />
                          </span>
                          <span className="whitespace-nowrap">{item.label}</span>
                        </>
                      );
                    }}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="icon" className="hidden rounded-xl text-slate-400 hover:bg-slate-100 sm:flex">
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-100 p-0 transition-colors hover:border-[#f97316] sm:h-11 sm:w-11"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'Account'} />
                        <AvatarFallback className="bg-slate-100 text-[#1a3c6e]">{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 w-56" align="end">
                    <DropdownMenuLabel className="px-4 py-3 font-semibold text-slate-900">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{user.displayName ?? 'Account'}</p>
                        <p className="text-xs font-normal leading-none text-slate-400">{user.email ?? ''}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer py-2.5"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate(dashboardPath);
                      }}
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer py-2.5"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate(profileEditorPath(profile));
                      }}
                    >
                      <User className="mr-3 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer py-2.5"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate('/settings');
                      }}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Account settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setProfileMenuOpen(false);
                        void handleLogout();
                      }}
                      className="cursor-pointer py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex sm:gap-3">
                <Link to="/auth?mode=login">
                  <Button variant="ghost" className="font-bold text-slate-600 hover:bg-slate-50">
                    Login
                  </Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button className="h-10 rounded-xl bg-[#f97316] px-4 font-bold text-white shadow-lg shadow-orange-100 hover:bg-[#ea580c] sm:h-11 sm:px-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-main-nav"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen ? (
            <motion.div
              key="mobile-nav"
              id="mobile-main-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-slate-100 bg-white/97 backdrop-blur-md md:hidden"
            >
              <div className="px-4 pb-6 pt-2">
                {MAIN_NAV.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.to + item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => {
                          const active = navItemActive(pathname, item, isActive);
                          return cn(
                            'mb-1 flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-bold transition-all duration-200',
                            active
                              ? 'bg-[#e8eef9] text-[#1a3c6e] shadow-sm'
                              : 'text-slate-600 hover:bg-slate-50',
                          );
                        }}
                      >
                        {({ isActive }) => {
                          const active = navItemActive(pathname, item, isActive);
                          return (
                            <>
                              <span
                                className={cn(
                                  'flex items-center justify-center rounded-xl transition-transform duration-200',
                                  item.emphasize ? 'h-12 w-12 bg-[#1a3c6e] text-white shadow-lg' : 'h-10 w-10 bg-slate-100 text-[#1a3c6e]',
                                  active && !item.emphasize && 'ring-2 ring-[#1a3c6e]/25',
                                )}
                              >
                                <Icon
                                  className={item.emphasize ? 'h-7 w-7' : 'h-5 w-5'}
                                  strokeWidth={2}
                                  aria-hidden
                                />
                              </span>
                              {item.label}
                            </>
                          );
                        }}
                      </NavLink>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.22 }}
                  className="mt-5 border-t border-slate-100 pt-5"
                >
                  {user ? (
                    <div className="space-y-1">
                      <Link
                        to={dashboardPath}
                        className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={profileEditorPath(profile)}
                        className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Account settings
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full rounded-xl px-4 py-3 text-left text-base font-bold text-red-500 transition-colors duration-200 hover:bg-red-50"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Link
                        to="/auth?mode=login"
                        className="block rounded-xl px-4 py-3 text-center text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth?mode=register"
                        className="block rounded-xl px-4 py-3 text-center text-base font-bold text-[#f97316] transition-colors duration-200 hover:bg-orange-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="flex-grow bg-slate-50">{children}</main>

      <footer className="bg-slate-900 py-12 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center space-x-2 text-white">
                <PlusCircle className="h-6 w-6 text-[#f97316]" />
                <span className="text-xl font-bold tracking-tight">Leads4u</span>
              </div>
              <p className="text-sm">Leads4u is the trusted platform for connecting service seekers with verified professionals.</p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">For Customers</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/#how-it-works" className="hover:text-white">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link to="/submit-lead" className="hover:text-white">
                    Post a request
                  </Link>
                </li>
                <li>
                  <Link to="/services/home-services/plumbing" className="hover:text-white">
                    Find plumbers
                  </Link>
                </li>
                <li>
                  <Link to="/services/home-services/electrical" className="hover:text-white">
                    Find electricians
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">For Providers</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/auth?mode=register" className="hover:text-white">
                    Register business
                  </Link>
                </li>
                <li>
                  <Link to="/leads" className="hover:text-white">
                    Browse leads
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs">
            <p>© {new Date().getFullYear()} Leads4u Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

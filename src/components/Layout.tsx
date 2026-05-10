import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import {
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  PlusCircle,
  Bell,
  Settings,
} from 'lucide-react';
import { postAuthDestination, profileEditorPath } from '../lib/dashboard-paths';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const dashboardPath = React.useMemo(
    () => (profile ? postAuthDestination(profile) : '/'),
    [profile],
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-20 border-b border-slate-200/90 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md transition-[background,box-shadow] duration-300 supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a3c6e] shadow-md shadow-[#1a3c6e]/25 transition-shadow duration-300 group-hover:shadow-lg">
                <div className="h-4 w-4 rounded-full bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1a3c6e]">Leads4u</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
              <Link
                to="/"
                className="relative py-1 text-slate-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#f97316] after:transition-transform after:duration-300 hover:text-[#1a3c6e] hover:after:scale-x-100"
              >
                Find Services
              </Link>
              <Link
                to="/submit-lead"
                className="relative py-1 text-slate-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#f97316] after:transition-transform after:duration-300 hover:text-[#1a3c6e] hover:after:scale-x-100"
              >
                Post a Request
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-100 rounded-xl">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-11 w-11 rounded-full p-0 border-2 border-slate-100 hover:border-[#f97316] transition-colors overflow-hidden">
                      <Avatar className="h-full w-full">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                        <AvatarFallback className="bg-slate-100 text-[#1a3c6e]">
                          {user.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2" align="end">
                    <DropdownMenuLabel className="font-semibold text-slate-900 px-4 py-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-slate-400 font-normal">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLinkItem
                      className="py-2.5 cursor-pointer"
                      render={(props) => <Link {...props} to={dashboardPath} />}
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuLinkItem>
                    <DropdownMenuLinkItem
                      className="py-2.5 cursor-pointer"
                      render={(props) => <Link {...props} to={profileEditorPath(profile)} />}
                    >
                      <User className="mr-3 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuLinkItem>
                    <DropdownMenuLinkItem
                      className="py-2.5 cursor-pointer"
                      render={(props) => <Link {...props} to="/settings" />}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Account settings</span>
                    </DropdownMenuLinkItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/auth?mode=login">
                  <Button variant="ghost" className="text-slate-600 font-bold hover:bg-slate-50">Login</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-2xl h-11 px-6 font-bold shadow-lg shadow-orange-100">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-sm md:hidden"
            >
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-1 px-4 pb-6 pt-4"
              >
                <Link to="/" className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50">
                  Find Services
                </Link>
                <Link to="/submit-lead" className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50">
                  Post a Request
                </Link>
                {user ? (
                  <>
                    <Link to={dashboardPath} className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50">
                      Dashboard
                    </Link>
                    <Link to={profileEditorPath(profile)} className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50">
                      My Profile
                    </Link>
                    <Link to="/settings" className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50">
                      Account settings
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-xl px-4 py-3 text-left text-base font-bold text-red-500 transition-colors duration-200 hover:bg-red-50"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth?mode=login" className="block rounded-xl px-4 py-3 text-base font-bold text-slate-600 transition-colors duration-200 hover:bg-slate-50">
                      Login
                    </Link>
                    <Link to="/auth?mode=register" className="block rounded-xl px-4 py-3 text-base font-bold text-[#f97316] transition-colors duration-200 hover:bg-orange-50">
                      Join as Provider
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 text-white mb-6">
                <PlusCircle className="h-6 w-6 text-[#f97316]" />
                <span className="text-xl font-bold tracking-tight">Leads4u</span>
              </div>
              <p className="text-sm">
                Leads4u is the trusted platform for connecting service seekers with verified professionals.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">For Customers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/#how-it-works" className="hover:text-white">How it works</Link></li>
                <li><Link to="/submit-lead" className="hover:text-white">Post a request</Link></li>
                <li><Link to="/services/plumbing" className="hover:text-white">Find plumbers</Link></li>
                <li><Link to="/services/electrician" className="hover:text-white">Find electricians</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">For Providers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/auth?mode=register" className="hover:text-white">Register business</Link></li>
                <li><Link to="/leads" className="hover:text-white">Browse leads</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            <p>© {new Date().getFullYear()} Leads4u Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

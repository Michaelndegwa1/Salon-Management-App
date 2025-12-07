import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  UsersRound, 
  BarChart3, 
  Package, 
  Settings, 
  Bell,
  Menu,
  X,
  Phone,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { Toaster } from './ui/sonner';

interface LayoutProps {
  isMobile: boolean;
}

export default function Layout({ isMobile }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/client-retention', label: 'Client Retention', icon: TrendingUp },
    { path: '/services', label: 'Services', icon: Scissors },
    { path: '/staff', label: 'Staff', icon: UsersRound },
    { path: '/call-logs', label: 'Call Logs', icon: Phone },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="bg-secondary border-b border-primary/20 sticky top-0 z-30 luxury-shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-secondary-foreground"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="luxury-gradient p-2 rounded-lg luxury-shadow">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`${isMobile ? 'text-sm' : 'text-base'} text-secondary-foreground font-medium`}>Luxe Salon</span>
                {!isMobile && <span className="text-xs text-primary">Premium Management</span>}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="relative text-secondary-foreground hover:text-primary">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs luxury-gradient text-white border-0">
                  3
                </Badge>
              </Button>
            </Link>
            {!isMobile && (
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 rounded-full luxury-gradient flex items-center justify-center luxury-shadow">
                  <span className="text-sm text-white">AD</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-secondary-foreground font-medium">Admin</p>
                  <p className="text-xs text-primary">Manager</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        {!isMobile && (
          <aside className="hidden lg:block w-64 bg-card border-r border-primary/10 min-h-[calc(100vh-57px)] sticky top-[57px]">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const linkClasses = isActive 
                  ? 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all luxury-gradient text-white luxury-shadow'
                  : 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-foreground hover:bg-accent hover:text-primary';
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={linkClasses}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 top-[57px] bg-white z-20 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const linkClasses = isActive 
                  ? 'flex items-center gap-3 px-4 py-4 rounded-lg transition-all luxury-gradient text-white luxury-shadow'
                  : 'flex items-center gap-3 px-4 py-4 rounded-lg transition-all text-foreground hover:bg-accent hover:text-primary';
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={linkClasses}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        {isMobile && !mobileMenuOpen && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary/10 z-30 safe-area-bottom luxury-shadow">
            <div className="flex items-center justify-around px-2 py-2">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const linkClasses = isActive 
                  ? 'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors text-primary'
                  : 'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors text-muted-foreground';
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={linkClasses}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-4 ${isMobile ? 'pb-20' : 'lg:p-6'}`}>
          <Outlet />
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster position={isMobile ? "top-center" : "bottom-right"} richColors />
    </div>
  );
}
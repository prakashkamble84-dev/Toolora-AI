import React, { useState } from 'react';
import { Menu, Sparkles, LogOut, Settings, User as UserIcon, ChevronDown, Bell, Search } from 'lucide-react';
import { CreditBadge } from '../common/CreditBadge';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  onNavigate: (path: string) => void;
  title?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  onNavigate,
  title,
}) => {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    onNavigate('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('text') || q.includes('write') || q.includes('copy')) onNavigate('/dashboard/text');
    else if (q.includes('image') || q.includes('photo') || q.includes('draw')) onNavigate('/dashboard/image');
    else if (q.includes('video') || q.includes('animate')) onNavigate('/dashboard/video');
    else if (q.includes('voice') || q.includes('speech') || q.includes('audio')) onNavigate('/dashboard/voice');
    else if (q.includes('chat') || q.includes('assistant')) onNavigate('/dashboard/chat');
    else if (q.includes('credit') || q.includes('token')) onNavigate('/dashboard/credits');
    else if (q.includes('price') || q.includes('plan')) onNavigate('/pricing');
    else onNavigate('/dashboard');
  };

  return (
    <header
      id="app-dashboard-header"
      className="sticky top-0 z-30 h-20 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DED4] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors"
    >
      {/* Left Section: Mobile Menu + Title + Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-[8px] text-[#5F6878] hover:text-[#172033] hover:bg-[#F1ECE4] transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <h1 className="text-[20px] font-bold text-[#172033] tracking-tight font-display hidden sm:block whitespace-nowrap">
            {title}
          </h1>
        )}

        {/* Global Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-full max-w-xs">
          <Search className="w-4 h-4 text-[#8F97A3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, assets, templates..."
            className="w-full h-10 pl-9 pr-3 rounded-[10px] bg-white border border-[#E5DED4] text-[13px] text-[#172033] placeholder-[#8F97A3] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all shadow-xs"
          />
        </form>
      </div>

      {/* Right Section: Credits, Upgrade, Notifications, User Avatar */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Credit Badge */}
        <CreditBadge
          size="sm"
          onClick={() => onNavigate('/dashboard/credits')}
        />

        {/* Upgrade Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('/pricing')}
          leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          className="hidden sm:inline-flex"
        >
          Upgrade
        </Button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-[10px] text-[#5F6878] hover:text-[#172033] hover:bg-[#F1ECE4] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
          </button>

          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 rounded-[16px] bg-white border border-[#E5DED4] shadow-xl p-4 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E5DED4]">
                  <span className="text-[14px] font-bold text-[#172033] font-display">Notifications</span>
                  <span className="text-[11px] text-[#238B6F] font-bold">Workspace Active</span>
                </div>
                <div className="py-2.5 space-y-2 text-xs">
                  <div className="p-3 rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4]">
                    <span className="text-[#172033] font-semibold block mb-0.5">Welcome to Toolora AI</span>
                    <span className="text-[12px] text-[#5F6878]">50 generation credits are ready in your creative workspace.</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-[10px] hover:bg-[#F1ECE4] transition-colors cursor-pointer border border-transparent hover:border-[#E5DED4]"
            aria-label="User menu"
            aria-expanded={profileDropdownOpen}
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#FF5A36] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {user?.name ? user.name[0].toUpperCase() : 'C'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#5F6878] hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-[16px] bg-white border border-[#E5DED4] shadow-xl py-2 z-50 animate-in fade-in">
                <div className="px-4 py-3 border-b border-[#E5DED4]">
                  <p className="text-[14px] font-bold text-[#172033] truncate">{user?.name || 'Creator'}</p>
                  <p className="text-[12px] text-[#5F6878] truncate">{user?.email}</p>
                  <div className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#FFF0EB] text-[#FF5A36]">
                    {user?.plan || 'FREE'} Plan
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigate('/dashboard/settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#5F6878] hover:text-[#172033] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-[#8F97A3]" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigate('/dashboard/credits');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#5F6878] hover:text-[#172033] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#8F97A3]" />
                    <span>Credits & Billing</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-[#E5DED4]">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#D64545] hover:bg-[#D64545]/10 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

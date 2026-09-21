import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Mic,
  Video,
  History,
  Coins,
  CreditCard,
  Settings,
  LogOut,
  X,
  MessageSquare,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const { logout, user } = useAuth();

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Text', path: '/dashboard/text', icon: FileText },
    { label: 'AI Image', path: '/dashboard/image', icon: ImageIcon },
    { label: 'AI Voice', path: '/dashboard/voice', icon: Mic },
    { label: 'AI Video', path: '/dashboard/video', icon: Video },
    { label: 'Gemini Chat', path: '/dashboard/chat', icon: MessageSquare },
  ];

  const secondaryNavItems = [
    { label: 'History', path: '/dashboard/history', icon: History },
    { label: 'Credits', path: '/dashboard/credits', icon: Coins },
    { label: 'Pricing', path: '/pricing', icon: CreditCard },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onNavigate('/login');
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#172033]/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container: 260px wide, clean warm white bg, border #E5DED4 */}
      <aside
        id="app-dashboard-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E5DED4] flex flex-col transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header with Toolora AI Logo */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-[#E5DED4] shrink-0">
          <Logo
            size="sm"
            showTagline={false}
            variant="light"
            onClick={() => handleNav('/dashboard')}
          />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-[8px] text-[#5F6878] hover:text-[#172033] hover:bg-[#F1ECE4] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
          {/* Main AI Generation Navigation */}
          <div>
            <div className="text-[11px] font-bold text-[#8F97A3] px-3 mb-2 uppercase tracking-wider font-display">
              Creative Suite
            </div>
            <div className="space-y-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-[14px] font-medium transition-all duration-150 group cursor-pointer ${
                      isActive
                        ? 'bg-[#FAF7F2] text-[#172033] font-bold shadow-xs'
                        : 'text-[#5F6878] hover:text-[#172033] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {/* Active coral indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FF5A36] rounded-r-full" />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#FF5A36]' : 'text-[#8F97A3] group-hover:text-[#172033]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account & Settings */}
          <div>
            <div className="text-[11px] font-bold text-[#8F97A3] px-3 mb-2 uppercase tracking-wider font-display">
              Management
            </div>
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-[14px] font-medium transition-all duration-150 group cursor-pointer ${
                      isActive
                        ? 'bg-[#FAF7F2] text-[#172033] font-bold shadow-xs'
                        : 'text-[#5F6878] hover:text-[#172033] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FF5A36] rounded-r-full" />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#FF5A36]' : 'text-[#8F97A3] group-hover:text-[#172033]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Profile & Sign Out Footer */}
        <div className="p-3 border-t border-[#E5DED4] bg-white shrink-0">
          <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4]">
            <div
              className="flex items-center gap-2.5 overflow-hidden cursor-pointer flex-1"
              onClick={() => handleNav('/dashboard/settings')}
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#FF5A36] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                {user?.name ? user.name[0].toUpperCase() : 'C'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-[#172033] truncate">
                  {user?.name || 'Creator'}
                </span>
                <span className="text-[11px] text-[#5F6878] truncate">
                  {user?.plan || 'FREE'} • {user?.credits ?? 0} Credits
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#5F6878] hover:text-[#D64545] hover:bg-[#D64545]/10 rounded-[8px] transition-colors cursor-pointer ml-1"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

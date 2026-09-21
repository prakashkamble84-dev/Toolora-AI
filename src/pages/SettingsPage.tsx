import React, { useState } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Sliders,
  Save,
  AlertTriangle,
  Key,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useToast } from '../context/ToastContext';

interface SettingsPageProps {
  onNavigate: (path: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'security' | 'preferences'>('profile');

  // Form states
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email] = useState(user?.email || 'alex.rivera@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTheme, setSelectedTheme] = useState('Warm Premium Ivory');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account & Plan', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
  ] as const;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile preferences updated.', 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please fill in password fields.', 'warning');
      return;
    }
    showToast('Password updated successfully.', 'success');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-[#E5DED4]">
        <h1 className="text-[28px] font-bold text-[#172033] tracking-tight font-display">
          Workspace Settings
        </h1>
        <p className="text-[14px] text-[#5F6878] mt-0.5">
          Manage your personal profile, credentials, notifications, and subscription parameters
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5DED4] overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer font-display ${
                isActive
                  ? 'border-[#FF5A36] text-[#FF5A36]'
                  : 'border-transparent text-[#5F6878] hover:text-[#172033]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* 1. PROFILE TAB */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-[18px] bg-gradient-to-tr from-[#FF5A36] to-[#FFB547] flex items-center justify-center text-white text-xl font-bold shadow-md shadow-[#FF5A36]/20 shrink-0 font-display">
                {name ? name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#172033] font-display">{name}</h3>
                <p className="text-xs text-[#5F6878]">{email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[6px] bg-[#FFF0EB] text-[#FF5A36] border border-[#FF5A36]/20">
                  {user?.plan || 'FREE'} Member
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                value={email}
                disabled
                helperText="Email changes require security re-authentication."
              />

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5 font-display">
                  Timezone
                </label>
                <select className="w-full rounded-[12px] bg-white border border-[#E5DED4] px-3.5 py-2.5 text-sm text-[#172033] focus:outline-none focus:border-[#FF5A36] shadow-xs">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>IST (Asia/Kolkata +05:30)</option>
                  <option>PST (America/Los_Angeles -08:00)</option>
                  <option>EST (America/New_York -05:00)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-[12px] bg-[#FF5A36] text-white text-xs font-bold hover:bg-[#E84C28] shadow-xs transition-all cursor-pointer flex items-center gap-2 font-display"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </form>
        )}

        {/* 2. ACCOUNT & PLAN TAB */}
        {activeTab === 'account' && (
          <div className="space-y-6 max-w-xl">
            <div className="p-6 rounded-[20px] bg-white border border-[#E5DED4] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#172033] font-display">Current Subscription</h4>
                  <p className="text-xs text-[#5F6878]">{user?.plan || 'FREE'} Plan</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('/pricing')}
                >
                  Upgrade Plan
                </Button>
              </div>
              <div className="pt-3 border-t border-[#E5DED4] flex items-center justify-between text-xs text-[#5F6878]">
                <span>Available Credits Balance:</span>
                <strong className="text-[#FF5A36] font-mono text-sm font-bold">{user?.credits ?? 0} Credits</strong>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-6 rounded-[20px] bg-[#FFF0EB]/40 border border-[#FF5A36]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#D64545] text-xs font-bold uppercase tracking-wider font-display">
                <AlertTriangle className="w-4 h-4" />
                <span>Account Danger Zone</span>
              </div>
              <p className="text-xs text-[#5F6878] leading-relaxed">
                Permanently delete your account and all associated generation records and media stored in the workspace.
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => showToast('Account deletion is locked in preview mode.', 'warning')}
              >
                Delete Account
              </Button>
            </div>
          </div>
        )}

        {/* 3. SECURITY TAB */}
        {activeTab === 'security' && (
          <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-xl">
            <div className="p-5 rounded-[16px] bg-white border border-[#E5DED4] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172033] font-display">
                <Key className="w-4 h-4 text-[#FF5A36]" />
                <span>Change Password</span>
              </div>
              <p className="text-xs text-[#5F6878]">
                Ensure your password is at least 8 characters long with a mix of letters, numbers, and symbols.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-[12px] bg-[#172033] text-white text-xs font-bold hover:bg-[#232F48] shadow-xs transition-all cursor-pointer flex items-center gap-2 font-display"
            >
              <Key className="w-4 h-4" />
              <span>Update Password</span>
            </button>
          </form>
        )}

        {/* 4. PREFERENCES TAB */}
        {activeTab === 'preferences' && (
          <div className="space-y-6 max-w-xl">
            <div className="p-6 rounded-[20px] bg-white border border-[#E5DED4] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#172033] font-display">Email Notifications</h4>
                  <p className="text-xs text-[#5F6878]">Receive generation completion alerts and credit usage digests</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="rounded-[4px] border-[#E5DED4] text-[#FF5A36] focus:ring-[#FF5A36] w-4 h-4"
                />
              </div>

              <div className="pt-3 border-t border-[#E5DED4]">
                <label className="block text-xs font-bold text-[#172033] mb-1.5 font-display">
                  Platform Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] px-3.5 py-2 text-xs text-[#172033] focus:outline-none focus:border-[#FF5A36] font-medium"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E5DED4]">
                <label className="block text-xs font-bold text-[#172033] mb-1.5 font-display">
                  Interface Theme
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full rounded-[10px] bg-[#FAF7F2] border border-[#E5DED4] px-3.5 py-2 text-xs text-[#172033] focus:outline-none focus:border-[#FF5A36] font-medium"
                >
                  <option>Warm Premium Ivory (Active)</option>
                  <option>Pure Minimal Light</option>
                  <option>High Contrast Editorial</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => showToast('Preferences saved.', 'success')}
              className="px-6 py-2.5 rounded-[12px] bg-[#FF5A36] text-white text-xs font-bold hover:bg-[#E84C28] shadow-xs transition-all cursor-pointer font-display"
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

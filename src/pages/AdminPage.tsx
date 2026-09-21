import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Layers,
  Coins,
  CreditCard,
  Sliders,
  Cpu,
  Lock,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { COLLECTIONS } from '../lib/firebase-schema';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'users' | 'generations' | 'credits' | 'plans' | 'payments' | 'models' | 'settings'
  >('users');

  const adminTabs = [
    { id: 'users', label: 'User Directory', icon: Users, coll: COLLECTIONS.USERS },
    { id: 'generations', label: 'All Generations', icon: Layers, coll: COLLECTIONS.GENERATIONS },
    { id: 'credits', label: 'Credit Ledger', icon: Coins, coll: COLLECTIONS.CREDIT_TRANSACTIONS },
    { id: 'plans', label: 'Plan Pricing', icon: CreditCard, coll: COLLECTIONS.PLANS },
    { id: 'payments', label: 'Payment Logs', icon: CreditCard, coll: COLLECTIONS.PAYMENTS },
    { id: 'models', label: 'AI Model Registry', icon: Cpu, coll: 'systemModels' },
    { id: 'settings', label: 'System Settings', icon: Sliders, coll: COLLECTIONS.SYSTEM_SETTINGS },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                System Administration Architecture
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Phase 9 Security Prep
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Secure server-authoritative control plane for users, plans, transactions, and model routing
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('/dashboard')}
        >
          Return to App
        </Button>
      </div>

      {/* Security Architecture Banner */}
      <div className="rounded-2xl bg-slate-900/90 border border-purple-500/30 p-5 flex items-start gap-4 shadow-xl">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-slate-300">
          <h4 className="font-bold text-white text-sm">
            Strict Server-Authoritative Authorization Policy
          </h4>
          <p className="leading-relaxed text-slate-400">
            Per project specification: Insecure client-side admin checks are prohibited. In Phase 9, admin access is verified via Firebase Auth custom claims and Firestore security rules (<code>request.auth.token.admin == true</code>).
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto scrollbar-none pb-px">
        {adminTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-purple-400 text-purple-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content for active tab: Authentic Empty State referencing the designated Firestore collection */}
      <div className="pt-2">
        <EmptyState
          icon={<ShieldAlert className="w-8 h-8 text-purple-400" />}
          title={`Admin Collection: ${adminTabs.find((t) => t.id === activeTab)?.coll}`}
          description={`Production administration routes will synchronize real records from '${adminTabs.find((t) => t.id === activeTab)?.coll}' once configured in Phase 9. Zero fake statistics are displayed.`}
          badge="Live Schema Ready"
        />
      </div>
    </div>
  );
};

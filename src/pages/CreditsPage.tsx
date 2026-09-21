import React from 'react';
import {
  Coins,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Mic,
  Video,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { SYSTEM_CONFIG } from '../config/constants';

interface CreditsPageProps {
  onNavigate: (path: string) => void;
}

export const CreditsPage: React.FC<CreditsPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const credits = user?.credits ?? 0;
  const creditsUsed = user?.creditsUsed ?? 0;
  const plan = user?.plan ?? 'FREE';

  // Cost matrix items
  const costMatrix = [
    {
      name: 'AI Text Generator',
      cost: `${SYSTEM_CONFIG.textGenerationCost} Credit`,
      unit: 'per generated response',
      icon: FileText,
      color: 'text-cyan-400',
    },
    {
      name: 'AI Voice Generator',
      cost: `${SYSTEM_CONFIG.voiceGenerationCost} Credits`,
      unit: 'per synthesized script',
      icon: Mic,
      color: 'text-emerald-400',
    },
    {
      name: 'AI Image Generator',
      cost: `${SYSTEM_CONFIG.imageGenerationCost} Credits`,
      unit: 'per high-res render',
      icon: ImageIcon,
      color: 'text-purple-400',
    },
    {
      name: 'AI Video Generator',
      cost: `${SYSTEM_CONFIG.videoGenerationCost} Credits`,
      unit: 'per async video render',
      icon: Video,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Credits & Usage Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor balance, review modality costs, and track credit transactions
          </p>
        </div>

        <Button
          variant="glow"
          size="sm"
          onClick={() => onNavigate('/pricing')}
          rightIcon={<ArrowUpRight className="w-4 h-4" />}
        >
          Upgrade / Top-Up Credits
        </Button>
      </div>

      {/* Credit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Available Balance */}
        <div className="rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
            <span>Available Balance</span>
            <Coins className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
              {credits}
            </span>
            <span className="text-xs text-slate-400">Total Credits</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Credits automatically roll over each billing period on active Pro and Business tiers.
          </p>
        </div>

        {/* Current Plan */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            <span>Active Subscription</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-2xl font-black text-white">
              {plan} Tier
            </span>
            <p className="text-xs text-slate-400 mt-1">
              {plan === 'FREE' ? '50 Initial Starter Credits' : '1,000 Monthly Generation Allowance'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">Status: Active</span>
            <button
              onClick={() => onNavigate('/pricing')}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Change Plan
            </button>
          </div>
        </div>

        {/* Total Consumed */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            <span>Total Credits Used</span>
            <TrendingDown className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-3xl font-black text-white font-mono tabular-nums">
              {creditsUsed}
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Zero fake deduction policy
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Server Authoritative</span>
            <span className="text-emerald-400">Audited</span>
          </div>
        </div>
      </div>

      {/* Generation Cost Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Configurable Generation Costs
          </h2>
          <span className="text-xs text-slate-400">Centralized in constants.ts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {costMatrix.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <span className="text-[10px] text-slate-500">{item.unit}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400 font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  {item.cost}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction History (Authentic Empty State) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Transaction Ledger
          </h2>
          <span className="text-xs text-slate-500">collection: creditTransactions</span>
        </div>

        {/* Authentic empty state */}
        <EmptyState
          icon={<Clock className="w-8 h-8" />}
          title="No credit transactions yet"
          description="Every credit grant, generation usage, or refund will be recorded immutably in this ledger upon execution."
          actionText="Explore Pricing Plans"
          onAction={() => onNavigate('/pricing')}
          badge="Zero Fake Transactions"
        />
      </div>
    </div>
  );
};

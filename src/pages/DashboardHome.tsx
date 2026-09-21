import React from 'react';
import {
  Coins,
  TrendingUp,
  Image as ImageIcon,
  Video,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ToolCard } from '../components/tools/ToolCard';
import { EmptyState } from '../components/common/EmptyState';
import { TOOL_CONFIGS } from '../config/constants';

interface DashboardHomeProps {
  onNavigate: (path: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const credits = user?.credits ?? 0;
  const totalGenerations = 0;
  const imagesCreated = 0;
  const videosCreated = 0;

  const primaryTools = [
    TOOL_CONFIGS.text,
    TOOL_CONFIGS.image,
    TOOL_CONFIGS.voice,
    TOOL_CONFIGS.video,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DED4]">
        <div>
          <h1 className="text-[32px] font-bold text-[#172033] tracking-tight font-display">
            Creative Workspace
          </h1>
          <p className="text-[15px] text-[#5F6878] mt-0.5">
            Welcome back, {user?.name || 'Creator'}. Select an engine or review your generative assets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/pricing')}
            className="px-5 py-2.5 rounded-[12px] bg-[#FF5A36] text-white text-[14px] font-semibold hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] transition-all cursor-pointer"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* 2. DASHBOARD KPI CARDS (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Credits */}
        <div className="rounded-[20px] bg-white border border-[#E5DED4] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5F6878] text-[13px] font-semibold mb-3">
            <span>Available Credits</span>
            <div className="w-9 h-9 rounded-[10px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#172033] font-display tabular-nums">
              {credits}
            </span>
            <span className="text-[12px] text-[#8F97A3] font-medium">{user?.plan || 'FREE'} Tier</span>
          </div>
        </div>

        {/* Total Generations */}
        <div className="rounded-[20px] bg-white border border-[#E5DED4] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5F6878] text-[13px] font-semibold mb-3">
            <span>Total Generations</span>
            <div className="w-9 h-9 rounded-[10px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#172033] font-display tabular-nums">
              {totalGenerations}
            </span>
            <span className="text-[12px] text-[#8F97A3] font-medium">Completed</span>
          </div>
        </div>

        {/* Images Created */}
        <div className="rounded-[20px] bg-white border border-[#E5DED4] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5F6878] text-[13px] font-semibold mb-3">
            <span>Images Created</span>
            <div className="w-9 h-9 rounded-[10px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#172033] font-display tabular-nums">
              {imagesCreated}
            </span>
            <span className="text-[12px] text-[#8F97A3] font-medium">Assets</span>
          </div>
        </div>

        {/* Videos Created */}
        <div className="rounded-[20px] bg-white border border-[#E5DED4] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5F6878] text-[13px] font-semibold mb-3">
            <span>Videos Created</span>
            <div className="w-9 h-9 rounded-[10px] bg-[#FFF0EB] flex items-center justify-center text-[#FF5A36]">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-[#172033] font-display tabular-nums">
              {videosCreated}
            </span>
            <span className="text-[12px] text-[#8F97A3] font-medium">Rendered</span>
          </div>
        </div>
      </div>

      {/* 3. AI TOOL CARDS (4 PRIMARY CARDS) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#172033] tracking-tight font-display">
            AI Creative Studios
          </h2>
          <p className="text-[14px] text-[#5F6878]">
            Select an engine to create high-impact multimodal content
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onSelect={(path) => onNavigate(path)}
              featured={tool.id === 'image'}
            />
          ))}
        </div>
      </div>

      {/* 4. RECENT GENERATIONS / EMPTY STATE */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#172033] tracking-tight font-display">
            Recent Generations
          </h2>
          <button
            onClick={() => onNavigate('/dashboard/history')}
            className="text-[14px] font-bold text-[#FF5A36] hover:text-[#E84C28] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full History</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <EmptyState
          icon={<FolderOpen className="w-6 h-6 text-[#8F97A3]" />}
          title="No creations yet"
          description="Your generated images, videos, voiceovers, and text documents will appear here."
          actionText="Create Something"
          onAction={() => onNavigate('/dashboard/image')}
        />
      </div>
    </div>
  );
};

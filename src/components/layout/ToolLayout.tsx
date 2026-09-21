import React from 'react';
import { Coins, AlertCircle, ArrowLeft } from 'lucide-react';
import { ToolConfig } from '../../types';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface ToolLayoutProps {
  tool: ToolConfig;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
  resultComponent: React.ReactNode;
  onGenerate: () => void;
  isGenerating?: boolean;
  canGenerate?: boolean;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  tool,
  onNavigate,
  children,
  resultComponent,
  onGenerate,
  isGenerating = false,
  canGenerate = true,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const credits = user?.credits ?? 0;
  const hasSufficientCredits = credits >= tool.creditCost;

  const handleGenerateClick = () => {
    if (!hasSufficientCredits) {
      showToast('Insufficient credits. Please upgrade your plan.', 'error');
      return;
    }
    onGenerate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DED4]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="p-2.5 rounded-[12px] bg-white border border-[#E5DED4] text-[#5F6878] hover:text-[#172033] hover:bg-[#FAF7F2] transition-colors cursor-pointer shadow-xs"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight font-display">
              {tool.title}
            </h1>
            <p className="text-sm text-[#5F6878] mt-0.5">
              {tool.tagline}
            </p>
          </div>
        </div>

        {/* Credit Information Bar */}
        <div className="flex items-center gap-4 bg-white border border-[#E5DED4] rounded-[14px] px-4 py-2.5 self-start sm:self-auto shadow-xs">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#FF5A36]" />
            <div className="text-xs">
              <span className="text-[#5F6878] block sm:inline">Cost per run: </span>
              <span className="font-bold text-[#172033]">{tool.creditCost} {tool.creditCost === 1 ? 'Credit' : 'Credits'}</span>
            </div>
          </div>
          <div className="h-4 w-px bg-[#E5DED4]" />
          <div className="text-xs">
            <span className="text-[#5F6878] block sm:inline">Your Balance: </span>
            <span className={`font-bold ${credits < tool.creditCost ? 'text-[#D64545]' : 'text-[#238B6F]'}`}>
              {credits} Credits
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompt & Parameters */}
        <div className="lg:col-span-6 space-y-6">
          {children}

          {/* Insufficient credits notice if applicable */}
          {!hasSufficientCredits && (
            <div className="flex items-center gap-3 p-4 rounded-[14px] bg-[#FFF0EB] border border-[#FF5A36]/40 text-[#172033] text-xs">
              <AlertCircle className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <span>Insufficient credits. Please upgrade your plan to generate with this tool.</span>
              <button
                onClick={() => onNavigate('/pricing')}
                className="ml-auto underline font-bold hover:text-[#FF5A36] cursor-pointer"
              >
                Upgrade
              </button>
            </div>
          )}

          {/* Generate Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-[15px] font-bold tracking-wide"
              onClick={handleGenerateClick}
              isLoading={isGenerating}
              disabled={!canGenerate || !hasSufficientCredits || isGenerating}
            >
              Generate ({tool.creditCost} {tool.creditCost === 1 ? 'Credit' : 'Credits'})
            </Button>
            <div className="flex items-center justify-between text-[11px] text-[#5F6878] mt-2.5 px-1">
              <span>Estimated remaining after run: {Math.max(0, credits - tool.creditCost)} credits</span>
              <span>Zero charge on failed requests</span>
            </div>
          </div>
        </div>

        {/* Right Column: Output & Result Panel */}
        <div className="lg:col-span-6 h-full">
          {resultComponent}
        </div>
      </div>
    </div>
  );
};

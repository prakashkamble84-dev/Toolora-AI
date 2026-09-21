import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Mic,
  Video,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  Info,
  Clock,
} from 'lucide-react';
import { GenerationType } from '../../types';
import { Button } from '../common/Button';

interface ResultPanelProps {
  type: GenerationType;
  result?: string;
  isGenerating?: boolean;
  onCopy?: () => void;
  onDownload?: () => void;
  onRegenerate?: () => void;
  phaseInfo?: string;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  type,
  result,
  isGenerating = false,
  onCopy,
  onDownload,
  onRegenerate,
  phaseInfo,
}) => {
  const getToolIcon = () => {
    switch (type) {
      case 'text':
        return <FileText className="w-8 h-8 text-cyan-400" />;
      case 'image':
        return <ImageIcon className="w-8 h-8 text-purple-400" />;
      case 'voice':
        return <Mic className="w-8 h-8 text-emerald-400" />;
      case 'video':
        return <Video className="w-8 h-8 text-amber-400" />;
    }
  };

  const getTargetPhase = () => {
    switch (type) {
      case 'text':
        return 'Phase 3: Real AI Text Generator (Server-Side Gemini)';
      case 'image':
        return 'Phase 4: Real AI Image Generator';
      case 'voice':
        return 'Phase 5: Real AI Voice Generator';
      case 'video':
        return 'Phase 6: Real AI Video Generator';
    }
  };

  return (
    <div
      id="tool-result-panel"
      className="w-full h-full min-h-[420px] rounded-2xl bg-[#090e1a] border border-slate-800 p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Output Preview
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Awaiting Generation
          </span>
        </div>

        {result && (
          <div className="flex items-center gap-1.5">
            {onCopy && (
              <button
                onClick={onCopy}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Copy output"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 text-center px-4">
        {result ? (
          <div className="w-full text-left font-sans text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mb-4 shadow-inner">
              {getToolIcon()}
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Ready for Input
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Enter your prompt on the left and configure your settings. Your generated result will render in this panel.
            </p>

            {/* Architecture Integration Notice */}
            <div className="w-full rounded-xl bg-slate-900/90 border border-cyan-500/20 p-3 text-left flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed text-slate-300">
                <span className="font-semibold text-cyan-300 block mb-0.5">
                  Production Architecture Ready
                </span>
                {phaseInfo || `Connected to ${getTargetPhase()}. Real API hooks will process upon Phase completion.`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Controls */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Latency: ~0.8s — 2.4s</span>
        </div>
        <div>
          <span>Output format: {type === 'text' ? 'UTF-8 Markdown / TXT' : type === 'image' ? 'PNG / WEBP' : type === 'voice' ? 'MP3 / WAV' : 'MP4 / H.264'}</span>
        </div>
      </div>
    </div>
  );
};

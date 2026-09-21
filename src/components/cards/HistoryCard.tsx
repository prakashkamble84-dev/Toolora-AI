import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Mic,
  Video,
  Download,
  Trash2,
  ExternalLink,
  Clock,
  Coins,
} from 'lucide-react';
import { GenerationRecord } from '../../types';

interface HistoryCardProps {
  generation: GenerationRecord;
  onView: (record: GenerationRecord) => void;
  onDelete: (id: string) => void;
  onDownload?: (record: GenerationRecord) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  generation,
  onView,
  onDelete,
  onDownload,
}) => {
  const getIcon = () => {
    switch (generation.type) {
      case 'text':
        return <FileText className="w-4 h-4 text-[#FF5A36]" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-[#FF5A36]" />;
      case 'voice':
        return <Mic className="w-4 h-4 text-[#FFB547]" />;
      case 'video':
        return <Video className="w-4 h-4 text-[#FF5A36]" />;
    }
  };

  const getStatusBadge = () => {
    switch (generation.status) {
      case 'COMPLETED':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[6px] bg-[#E8F5E9] text-[#238B6F] border border-[#238B6F]/20">
            Completed
          </span>
        );
      case 'PROCESSING':
      case 'QUEUED':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[6px] bg-[#FFF8E1] text-[#D97706] border border-[#D97706]/20">
            Processing
          </span>
        );
      case 'FAILED':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[6px] bg-[#FFF0EB] text-[#D64545] border border-[#D64545]/20">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-[18px] bg-white border border-[#E5DED4] p-5 flex flex-col justify-between hover:border-[#FF5A36]/40 transition-all text-left shadow-xs">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-[8px] bg-[#FAF7F2] border border-[#E5DED4]">
              {getIcon()}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#172033] font-display">
              {generation.type}
            </span>
          </div>
          {getStatusBadge()}
        </div>

        <p className="text-[13px] text-[#172033] font-medium line-clamp-3 mb-4 leading-relaxed">
          &ldquo;{generation.prompt}&rdquo;
        </p>
      </div>

      <div className="pt-3 border-t border-[#E5DED4] flex items-center justify-between text-xs text-[#5F6878]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-[#8F97A3]" />
            {new Date(generation.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#FF5A36] font-semibold">
            <Coins className="w-3 h-3" />
            {generation.creditsUsed} Credits
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(generation)}
            className="p-1.5 text-[#5F6878] hover:text-[#172033] rounded-[8px] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            title="View Details"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          {onDownload && (
            <button
              onClick={() => onDownload(generation)}
              className="p-1.5 text-[#5F6878] hover:text-[#172033] rounded-[8px] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              title="Download Result"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => onDelete(generation.id)}
            className="p-1.5 text-[#5F6878] hover:text-[#D64545] rounded-[8px] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            title="Delete Record"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

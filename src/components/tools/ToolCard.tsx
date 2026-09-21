import React from 'react';
import { ArrowRight, FileText, Image as ImageIcon, Video, Mic, MessageSquare } from 'lucide-react';
import { ToolConfig } from '../../types';

interface ToolCardProps {
  tool: ToolConfig;
  onSelect: (path: string) => void;
  featured?: boolean;
}

const getToolIcon = (id: string) => {
  switch (id) {
    case 'text':
      return <FileText className="w-5 h-5 text-[#FF5A36]" />;
    case 'image':
      return <ImageIcon className="w-5 h-5 text-[#FF5A36]" />;
    case 'voice':
      return <Mic className="w-5 h-5 text-[#FF5A36]" />;
    case 'video':
      return <Video className="w-5 h-5 text-[#FF5A36]" />;
    case 'chat':
    default:
      return <MessageSquare className="w-5 h-5 text-[#FF5A36]" />;
  }
};

const getToolButtonLabel = (id: string) => {
  switch (id) {
    case 'text':
      return 'Try AI Text';
    case 'image':
      return 'Generate Image';
    case 'voice':
      return 'Create Voice';
    case 'video':
      return 'Generate Video';
    default:
      return 'Open Studio';
  }
};

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onSelect,
  featured = false,
}) => {
  return (
    <div
      onClick={() => onSelect(tool.path)}
      className={`group relative rounded-[20px] bg-white border border-[#E5DED4] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#172033] hover:shadow-[0_12px_35px_rgba(23,32,51,0.08)] cursor-pointer text-left shadow-xs ${
        featured ? 'border-2 border-[#FF5A36]' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-[12px] bg-[#FFF0EB] flex items-center justify-center transition-colors">
            {getToolIcon(tool.id)}
          </div>
          <span className="text-[12px] font-bold px-3 py-1 rounded-[6px] bg-[#FAF7F2] text-[#172033] border border-[#E5DED4]">
            {tool.creditCost} {tool.creditCost === 1 ? 'Credit' : 'Credits'}
          </span>
        </div>

        <h3 className="text-[20px] font-bold text-[#172033] mb-2 font-display group-hover:text-[#FF5A36] transition-colors">
          {tool.title}
        </h3>
        <p className="text-[14px] text-[#5F6878] leading-relaxed mb-6">
          {tool.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#E5DED4] flex items-center justify-between">
        <span className="text-[14px] font-bold text-[#172033] group-hover:text-[#FF5A36] transition-colors flex items-center gap-2">
          <span>{getToolButtonLabel(tool.id)}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FF5A36]" />
        </span>
      </div>
    </div>
  );
};

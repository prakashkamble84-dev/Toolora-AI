import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  badge?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
  badge,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[20px] border border-[#E5DED4] bg-white shadow-xs ${className}`}
    >
      <div className="w-12 h-12 rounded-[12px] bg-[#FAF7F2] border border-[#E5DED4] flex items-center justify-center text-[#5F6878] mb-4">
        {icon}
      </div>
      {badge && (
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-[6px] bg-[#FFF0EB] text-[#FF5A36] mb-2 font-display">
          {badge}
        </span>
      )}
      <h3 className="text-[18px] font-bold text-[#172033] mb-1.5 font-display">{title}</h3>
      <p className="text-[14px] text-[#5F6878] max-w-sm leading-relaxed mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="secondary" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};

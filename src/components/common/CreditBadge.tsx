import React from 'react';
import { Coins, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CreditBadgeProps {
  onClick?: () => void;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CreditBadge: React.FC<CreditBadgeProps> = ({
  onClick,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const { user } = useAuth();
  const credits = user?.credits ?? 0;

  const sizeClasses = {
    sm: 'text-[12px] px-3 py-1 gap-1.5',
    md: 'text-[13px] px-3.5 py-1.5 gap-2',
    lg: 'text-[14px] px-4 py-2 gap-2.5',
  };

  const isLow = credits <= 10;

  return (
    <div
      id="user-credit-badge"
      onClick={onClick}
      className={`inline-flex items-center font-semibold rounded-[10px] border transition-all select-none bg-white ${
        onClick ? 'cursor-pointer hover:bg-[#FAF7F2] hover:border-[#172033]' : ''
      } ${
        isLow
          ? 'border-[#FFB547] text-[#172033]'
          : 'border-[#E5DED4] text-[#172033]'
      } ${sizeClasses[size]} ${className}`}
      title={`${credits} Available Generation Credits`}
    >
      {showIcon && (
        isLow ? (
          <Coins className="w-3.5 h-3.5 text-[#FFB547] shrink-0" />
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
        )
      )}
      <span className="font-bold tabular-nums text-[#172033] font-display">{credits}</span>
      <span className="text-[#5F6878] font-normal text-[12px]">Credits</span>
    </div>
  );
};

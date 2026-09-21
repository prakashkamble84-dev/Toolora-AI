import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark'; // 'light' is for light warm ivory backgrounds, 'dark' for dark sections
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  variant = 'light',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-[15px] font-bold',
    md: 'text-[18px] font-bold',
    lg: 'text-[22px] font-bold',
    xl: 'text-[28px] font-extrabold',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-[11px] px-2 py-0.5',
    xl: 'text-xs px-2.5 py-0.5',
  };

  const isDark = variant === 'dark';

  return (
    <div
      id="toolora-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none cursor-pointer transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Abstract Geometric "T" Symbol — representing layers, creation & transformation */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Top Horizontal Bar Layer 1 (Warm Amber Accent) */}
          <rect
            x="7"
            y="6"
            width="22"
            height="6.5"
            rx="3.25"
            fill="#FFB547"
            opacity="0.9"
          />
          {/* Top Primary Crossbar Layer (Vivid Coral) */}
          <rect
            x="5"
            y="8.5"
            width="26"
            height="7"
            rx="3.5"
            fill="#FF5A36"
          />
          {/* Vertical Stem of "T" (Vivid Coral with depth) */}
          <rect
            x="14"
            y="13"
            width="8"
            height="17"
            rx="4"
            fill="#FF5A36"
          />
          {/* Creative Accent Offset Dot (Digital Creation Motif) */}
          <circle cx="27" cy="27" r="3" fill="#FFB547" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`tracking-tight font-display ${textSizes[size]} ${
              isDark ? 'text-white' : 'text-[#172033]'
            }`}
          >
            TOOLORA
          </span>
          <span
            className={`font-semibold rounded-[6px] tracking-wider uppercase bg-[#FF5A36] text-white ${badgeSizes[size]}`}
          >
            AI
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-wide mt-1 ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5F6878]'
            }`}
          >
            Create. Generate. Automate.
          </span>
        )}
      </div>
    </div>
  );
};

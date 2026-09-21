import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-[12px] font-sans transition-all duration-180 focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/30 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-[13px] gap-1.5 h-9',
    md: 'px-6 py-2.5 text-[15px] gap-2 h-12',
    lg: 'px-7 py-3 text-[16px] gap-2.5 h-[52px]',
  };

  const variantStyles = {
    primary:
      'bg-[#FF5A36] text-white hover:bg-[#E84C28] shadow-[0_4px_16px_rgba(255,90,54,0.25)] hover:shadow-[0_6px_22px_rgba(255,90,54,0.35)] border-0',
    glow:
      'bg-[#FF5A36] text-white hover:bg-[#E84C28] shadow-[0_4px_24px_rgba(255,90,54,0.35)] hover:shadow-[0_6px_28px_rgba(255,90,54,0.45)] border-0',
    secondary:
      'bg-[#FFFFFF] text-[#172033] border-1.5 border-[#172033] hover:bg-[#F1ECE4]',
    outline:
      'bg-transparent border border-[#E5DED4] hover:border-[#172033] text-[#172033] hover:bg-[#F1ECE4]',
    ghost:
      'bg-transparent text-[#5F6878] hover:text-[#172033] hover:bg-[#F1ECE4]',
    danger:
      'bg-[#D64545] hover:bg-[#C23838] text-white border-0 shadow-sm shadow-[#D64545]/20',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 ai-loading-ring shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span className="whitespace-nowrap">{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

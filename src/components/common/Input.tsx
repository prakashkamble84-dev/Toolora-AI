import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-semibold text-[#172033] tracking-tight">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#8F97A3] pointer-events-none shrink-0">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#FFFFFF] border text-[#172033] rounded-[10px] px-3.5 py-2.5 text-[14px] transition-all placeholder:text-[#8F97A3] focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${
            error ? 'border-[#D64545] focus:ring-[#D64545]/20' : 'border-[#E5DED4]'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-[#8F97A3] shrink-0">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-[12px] text-[#D64545] font-medium">{error}</span>}
      {!error && helperText && <span className="text-[12px] text-[#5F6878]">{helperText}</span>}
    </div>
  );
};

import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, isRequired, className = '', leftIcon, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="block text-xs font-bold text-gray-800 font-bangla tracking-wide">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 text-sm text-gray-900 bg-white border rounded-xl
              placeholder:text-gray-400 placeholder:font-sans
              transition-all duration-150 focus:outline-none focus:ring-2
              min-h-[48px]
              ${leftIcon ? 'pl-10' : ''}
              ${error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/30'
                : 'border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B]/20 hover:border-gray-300'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 font-sans font-bold flex items-center gap-1">⚠ {error}</p>}
        {helperText && !error && <p className="text-[11px] text-gray-500 font-sans">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

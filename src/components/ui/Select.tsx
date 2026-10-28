import React, { forwardRef } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, isRequired, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="block text-xs sm:text-sm font-bold text-slate-800 font-bangla tracking-wide">
            {label}
            {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-3 text-sm font-medium text-slate-900 bg-white border rounded-xl appearance-none
              transition-all duration-200 focus:outline-none focus:ring-2
              min-h-[48px] pr-10 font-bangla
              ${error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/30'
                : 'border-slate-300 focus:border-[#064E3B] focus:ring-[#064E3B]/20 hover:border-slate-400 shadow-xs'
              }
              ${className}
            `}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron */}
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-600 font-sans font-bold">⚠ {error}</p>}
        {helperText && !error && <p className="text-[11px] text-gray-500 font-sans">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

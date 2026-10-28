import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, isRequired, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="block text-xs sm:text-sm font-bold text-slate-800 font-bangla tracking-wide">
            {label}
            {isRequired && <span className="text-red-500 ml-1 font-bold">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 text-sm font-medium text-slate-900 bg-white border rounded-xl font-bangla
            placeholder:text-slate-400 placeholder:font-bangla
            transition-all duration-200 focus:outline-none focus:ring-2
            resize-y min-h-[100px]
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/30'
              : 'border-slate-300 focus:border-[#064E3B] focus:ring-[#064E3B]/20 hover:border-slate-400 shadow-xs'
            }
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-bangla font-semibold">⚠ {error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500 font-bangla">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

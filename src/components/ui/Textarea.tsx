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
          <label className="block text-xs font-bold text-gray-800 font-bangla tracking-wide">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 text-sm text-gray-900 bg-white border rounded-xl
            placeholder:text-gray-400 placeholder:font-sans
            transition-all duration-150 focus:outline-none focus:ring-2
            resize-y min-h-[100px]
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/30'
              : 'border-gray-200 focus:border-[#064E3B] focus:ring-[#064E3B]/20 hover:border-gray-300'
            }
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-sans font-bold">⚠ {error}</p>}
        {helperText && !error && <p className="text-[11px] text-gray-500 font-sans">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'gold' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wide rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] select-none shadow-sm cursor-pointer';

  const variants = {
    primary:
      'bg-[#064E3B] text-white hover:bg-[#047857] hover:shadow-lg focus:ring-emerald-700 border border-emerald-600/30',
    emerald:
      'bg-gradient-to-r from-[#064E3B] to-[#047857] text-white hover:from-[#047857] hover:to-[#064E3B] hover:shadow-lg focus:ring-emerald-700 border border-emerald-500/30',
    secondary:
      'bg-[#D97706] text-white hover:bg-[#B45309] hover:shadow-lg focus:ring-amber-600 border border-amber-400/30',
    gold:
      'bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#D97706] text-slate-950 font-black hover:brightness-105 hover:shadow-xl hover:shadow-amber-500/20 focus:ring-amber-500 border border-amber-300',
    outline:
      'border-2 border-[#064E3B] text-[#064E3B] bg-white hover:bg-[#064E3B] hover:text-white focus:ring-[#064E3B]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-md',
    ghost: 'text-slate-700 hover:bg-emerald-50 hover:text-[#064E3B] focus:ring-emerald-400 shadow-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs min-h-[38px]',
    md: 'px-6 py-2.5 text-sm font-bold min-h-[46px]',
    lg: 'px-8 py-3.5 text-base font-extrabold min-h-[52px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isFullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin text-current shrink-0" />}
      {children}
    </button>
  );
};

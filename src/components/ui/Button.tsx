import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'gold';
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
    'inline-flex items-center justify-center font-bold tracking-wide rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.97] min-h-[46px] sm:min-h-[50px] select-none shadow-md';

  const variants = {
    primary:
      'bg-[#0F172A] text-white hover:bg-[#1E293B] hover:shadow-xl focus:ring-[#0F172A] border border-amber-500/20',
    secondary:
      'bg-[#D97706] text-white hover:bg-[#B45309] hover:shadow-xl hover:shadow-amber-500/20 focus:ring-[#D97706] border border-amber-400/30',
    gold:
      'bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#D97706] text-gray-950 font-extrabold hover:brightness-110 hover:shadow-2xl hover:shadow-amber-500/30 focus:ring-amber-500 border border-amber-300',
    outline:
      'border-2 border-[#0F172A] text-[#0F172A] bg-white/80 hover:bg-[#0F172A] hover:text-white focus:ring-[#0F172A] backdrop-blur-xs',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-md',
    ghost: 'text-gray-800 hover:bg-amber-100/50 focus:ring-amber-400 min-h-[38px] sm:min-h-[40px]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs min-h-[40px]',
    md: 'px-6.5 py-3 text-sm font-bold',
    lg: 'px-8.5 py-4 text-base font-extrabold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isFullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4.5 h-4.5 mr-2 animate-spin text-current shrink-0" />}
      {children}
    </button>
  );
};

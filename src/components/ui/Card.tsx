import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isHoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  footer,
  isHoverable = true,
  padding = 'md',
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7 lg:p-8',
    lg: 'p-7 sm:p-9 lg:p-11',
  };

  return (
    <div
      className={`glass-card rounded-3xl overflow-hidden ${
        isHoverable ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {header && (
        <div className="px-6 py-4.5 border-b border-amber-500/10 bg-amber-50/30 font-heading font-bold text-gray-900">
          {header}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 font-sans text-xs">
          {footer}
        </div>
      )}
    </div>
  );
};

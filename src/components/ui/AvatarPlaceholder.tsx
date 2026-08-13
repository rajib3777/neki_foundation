import React from 'react';
import { imageConfig } from '../../config/image.config';

export interface AvatarPlaceholderProps {
  name: string;
  isDemo?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10 min-w-[40px]',
  md: 'w-12 h-12 min-w-[48px]',
  lg: 'w-16 h-16 min-w-[64px]',
  xl: 'w-24 h-24 min-w-[96px]',
};

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  name,
  isDemo = false,
  size = 'md',
  className = '',
}) => {
  const svgDataUri = imageConfig.getAvatarSvg(name, isDemo);

  return (
    <div className={`${sizeClasses[size]} rounded-xl overflow-hidden shadow-md shrink-0 ${className}`}>
      <img
        src={svgDataUri}
        alt={`${name} অবতার`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

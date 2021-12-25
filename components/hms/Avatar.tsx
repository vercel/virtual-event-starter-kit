import React from 'react';
import { getAvatarBg } from './lib/getAvatarBg';

interface Props {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar: React.FC<Props> = ({ name, className = '', size = 'sm' }) => {
  const { initials, color } = getAvatarBg(name);
  const sizeClass = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-3xl',
    xl: 'w-32 h-32 text-5xl'
  };
  return (
    <div
      className={`flex justify-center items-center font-bold object-cover  text-white ${sizeClass[size]} rounded-full ${className}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
};

export default Avatar;

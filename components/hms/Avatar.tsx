import React from 'react';
import { getAvatarBg } from './lib/getAvatarBg';

interface Props {
  name: string;
  className?: string;
}

const Avatar: React.FC<Props> = ({ name, className = '' }) => {
  const { initials, color } = getAvatarBg(name);
  return (
    <div
      className={`flex justify-center items-center font-bold object-cover w-16 h-16 mr-2 rounded-full text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
};

export default Avatar;

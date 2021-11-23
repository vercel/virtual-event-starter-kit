import React from 'react';
import { getAvatarBg } from '../getAvatarBg';
import s from './index.module.css';

interface Props {
  name: string;
}

const Avatar: React.FC<Props> = ({ name }) => {
  const { initials, color } = getAvatarBg(name);
  return (
    <div style={{ backgroundColor: color }} className={s['avatar']}>
      {initials}
    </div>
  );
};

export default Avatar;

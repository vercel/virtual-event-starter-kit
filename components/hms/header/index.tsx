import { selectPeers } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import UsersIcon from '@components/icons/icon-users';
import React from 'react';
import s from './index.module.css';

const Header = () => {
  const peers = useHMSStore(selectPeers);
  return (
    <div className={s['header']}>
      <div></div>
      <div className={s['participants-count']}>
        <UsersIcon /> <span>{peers.length} watching</span>
      </div>
    </div>
  );
};

export default Header;

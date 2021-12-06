import { selectPeers } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import UsersIcon from '@components/icons/icon-users';
import React from 'react';
import s from './index.module.css';

const Header = () => {
  const peers = useHMSStore(selectPeers);
  return (
    <div className={s['header']}>
      <div className={s['meta']}>
        <p className={s['title']}>How to make a switch</p>
        <span className={s['live-badge']}>LIVE</span>
        <span className={s['time']}>9:30 pm - 10:30 pm</span>
      </div>
      <div className={s['box']}>
        <div className={s['participants-count']}>
          <UsersIcon /> <span>{peers.length} watching</span>
        </div>
        {/* <button className={s['leave-btn']}>
          <LeaveIcon /> Leave
        </button> */}
      </div>
    </div>
  );
};

export default Header;

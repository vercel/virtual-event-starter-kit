import { selectPeers } from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import UsersIcon from '@components/icons/icon-users';
import React from 'react';
import s from './index.module.css';
import { ExitIcon } from '@100mslive/react-icons';
import * as Dialog from '@radix-ui/react-dialog';

const Header = () => {
  const peers = useHMSStore(selectPeers);
  const actions = useHMSActions();
  const leave = () => {
    try {
      actions.leave();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={s['header']}>
      <div className={s['meta']}>
        <Dialog.Root>
          <Dialog.Overlay className={s['pop-overlay']} />
          <Dialog.Trigger asChild>
            <button className={s['exit-btn']}>
              <ExitIcon />
            </button>
          </Dialog.Trigger>
          <Dialog.Content className={s['pop-content']}>
            <p className={s['pop-head']}>Leave the Stage</p>
            <p className={s['pop-text']}>Are you sure you want to leave the stage?</p>
            <div className={s['cta-wrapper']}>
              <Dialog.Close asChild>
                <button className={s['cancel-btn']}>Cancel</button>
              </Dialog.Close>

              <button className={s['leave-btn']} onClick={leave}>
                Leave
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>

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

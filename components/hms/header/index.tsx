import { selectLocalPeer, selectPeers, selectPeersByRole } from '@100mslive/hms-video-store';
import { ExitIcon } from '@100mslive/react-icons';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import UsersIcon from '@components/icons/icon-users';
import { useRouter } from 'next/router';
import React from 'react';
import s from './index.module.css';

const Header = () => {
  const router = useRouter();
  const peers = useHMSStore(selectPeersByRole('viewer'));
  const actions = useHMSActions();
  const leave = () => {
    try {
      actions.leave().then(() => router.push('/'));
    } catch (error) {
      console.log(error);
    }
  };
  const localPeer = useHMSStore(selectLocalPeer);
  return (
    <div
      className="flex items-center justify-between px-4 w-full  "
      style={{ height: 'var(--header-height)' }}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="block items-center">
          {true ? (
            <button
              onClick={leave}
              className={
                'color-white p-2 md:static w-10 h-10 rounded-lg bg-gray -scale-x-100 cursor-pointer '
              }
            >
              <ExitIcon />
            </button>
          ) : null}
        </div>
        <div className="flex md:flex-row flex-col md:items-center align-end md:gap-2  gap-x-2">
          <div className="flex flex-row items-center align-bottom md:gap-2 gap-x-2">
            <p className="font-semibold md:text-2xl my-0 text-sm md:leading-8 ">Demo Event</p>
            <span
              className="flex md:py-0.5 md:px-1 px-0.5 font-semibold md:text-sm text-xs rounded-sm items-center "
              style={{ backgroundColor: '#ed4c5a' }}
            >
              LIVE
            </span>
          </div>
          <div className="flex">
            <span className="text-md leading-5 " style={{ color: '#999a99' }}>
              9:30 pm - 10:30 pm
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="  rounded-3xl border-solid py-2 px-4 flex items-center font-normal text-sm leading-4 gap-2 "
          style={{ borderWidth: '1px', borderColor: '#3b3b3b' }}
        >
          <UsersIcon /> <span className="">{peers.length}</span>{' '}
          <span className="md:block hidden"> watching</span>
        </div>
        {/* <button className={s['leave-btn']}>
          <LeaveIcon /> Leave
        </button> */}
      </div>
    </div>
  );
};

export default Header;

import { selectLocalPeerRole } from '@100mslive/hms-video-store';
import { useAVToggle, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import {
  VideoOffIcon,
  VideoOnIcon,
  MicOffIcon,
  MicOnIcon,
  ShareScreenIcon,
  HangUpIcon,
  RecordIcon
} from '@100mslive/react-icons';
import React from 'react';
import s from './index.module.css';
import Settings from './Settings';

const Footer = () => {
  const role = useHMSStore(selectLocalPeerRole);
  const {
    isAllowedToPublish,
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo
  } = useAVToggle();
  const actions = useHMSActions();
  const leaveRoom = () => actions.leave();
  const startScreenshare = async () => {
    try {
      await actions.setScreenShareEnabled(true);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <div className={s['footer']}>
      {isAllowedToPublish.audio ? (
        <button className={s['btn']} onClick={toggleAudio}>
          {isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
        </button>
      ) : null}
      {isAllowedToPublish.video ? (
        <button className={s['btn']} onClick={toggleVideo}>
          {isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
        </button>
      ) : null}
      {isAllowedToPublish.screen ? (
        <button className={s['btn']} onClick={startScreenshare}>
          <ShareScreenIcon />
        </button>
      ) : null}
      {role?.name === 'backstage' ? (
        <button className={s['btn']} onClick={() => {}}>
          <RecordIcon />
        </button>
      ) : null}
      {role?.name === 'backstage' || role?.name === 'stage' ? (
        <button className={s['btn']} onClick={leaveRoom}>
          <HangUpIcon />
        </button>
      ) : null}
      {role?.name === 'backstage' || role?.name === 'stage' || role?.name === 'invitee' ? (
        <Settings />
      ) : null}
    </div>
  );
};

export default Footer;

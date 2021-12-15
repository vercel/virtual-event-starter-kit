import { selectIsLocalScreenShared, selectLocalPeerRole } from '@100mslive/hms-video-store';
import { useAVToggle, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import {
  VideoOffIcon,
  VideoOnIcon,
  MicOffIcon,
  MicOnIcon,
  ShareScreenIcon,
  RecordIcon,
  HangUpIcon
} from '@100mslive/react-icons';
import React from 'react';
import s from './index.module.css';
import Settings from './Settings';
import * as Dialog from '@radix-ui/react-dialog';
import router from 'next/router';
import cn from 'classnames';

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
  // const leaveRoom = () => actions.leave();
  const startScreenshare = async () => {
    try {
      await actions.setScreenShareEnabled(true);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const leave = () => {
    try {
      actions.leave().then(() => router.push('/'));
    } catch (error) {
      console.log(error);
    }
  };
  const isLocalScreenShare = useHMSStore(selectIsLocalScreenShared);
  return (
    <div className={s['footer']}>
      {role?.name !== 'viewer' ? (
        <>
          {isAllowedToPublish.audio ? (
            <div className={s['btn-wrapper']}>
              <button
                className={cn(s['btn'], isLocalAudioEnabled ? s['active-btn'] : '')}
                onClick={toggleAudio}
              >
                {isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
              </button>
              <p className={s['btn-text']}>Mic</p>
            </div>
          ) : null}
          {isAllowedToPublish.video ? (
            <div className={s['btn-wrapper']}>
              <button
                className={cn(s['btn'], isLocalVideoEnabled ? s['active-btn'] : '')}
                onClick={toggleVideo}
              >
                {isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
              </button>
              <p className={s['btn-text']}>Video</p>
            </div>
          ) : null}
          {isAllowedToPublish.screen ? (
            <div className={s['btn-wrapper']}>
              <button
                className={`${s['btn']} ${isLocalScreenShare ? s['active-btn'] : ''}`}
                onClick={startScreenshare}
              >
                <ShareScreenIcon />
              </button>
              <p className={s['btn-text']}>Screen Share</p>
            </div>
          ) : null}
          {isAllowedToPublish.screen ? (
            <div className={s['btn-wrapper']}>
              <button className={cn(s['btn'])}>
                <RecordIcon />
              </button>
              <p className={s['btn-text']}>Record</p>
            </div>
          ) : null}
          {role?.name === 'backstage' || role?.name === 'stage' || role?.name === 'invitee' ? (
            <Settings />
          ) : null}
          <Dialog.Root>
            <Dialog.Overlay className={s['pop-overlay']} />
            <Dialog.Trigger asChild>
              <div className={s['btn-wrapper']}>
                <button className={cn(s['btn'], s['leave'])} onClick={() => {}}>
                  <HangUpIcon />
                </button>
                <p className={s['btn-text']}>Leave</p>
              </div>
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
        </>
      ) : null}
    </div>
  );
};

export default Footer;

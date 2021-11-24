import {
  selectScreenShareByPeerID,
  selectIsLocalScreenShared,
  selectPeerScreenSharing
} from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import s from './index.module.css';

const ScreenshareTile = () => {
  const screenSharePeer = useHMSStore(selectPeerScreenSharing);
  const hmsActions = useHMSActions();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoTrack = useHMSStore(selectScreenShareByPeerID(screenSharePeer!.id));
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);
  React.useEffect(() => {
    (async () => {
      if (videoRef && videoRef?.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef?.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef?.current);
        }
      }
    })();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTrack?.id, videoTrack?.enabled, videoTrack?.deviceID]);
  const stopScreenShare = async () => {
    try {
      await hmsActions.setScreenShareEnabled(false);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <>
      {isLocalScreenShared ? (
        <div className={s['screenshare']}>
          <p>You're sharing screen</p>{' '}
          <button className={s['screenshare-btn']} onClick={stopScreenShare}>
            Stop screen share
          </button>
        </div>
      ) : (
        <video
          style={{ height: 'calc(100vh - 3 * var(--header-height))' }}
          ref={videoRef}
          autoPlay
          muted
        ></video>
      )}
    </>
  );
};

export default ScreenshareTile;

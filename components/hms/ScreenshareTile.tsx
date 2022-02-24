import {
  useHMSActions,
  useHMSStore,
  selectScreenShareByPeerID,
  selectIsLocalScreenShared,
  selectPeerScreenSharing
} from '@100mslive/react-sdk';
import { ShareScreenIcon } from '@100mslive/react-icons';
import React from 'react';
import IconFitScreen from '@components/icons/icon-fit-screen';
import Button from './Button';
import { CrossIcon } from '@100mslive/react-icons';
import { hmsConfig } from './config';

const ScreenshareTile = () => {
  const screenSharePeer = useHMSStore(selectPeerScreenSharing);
  const hmsActions = useHMSActions();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoTrack = useHMSStore(selectScreenShareByPeerID(screenSharePeer?.id));
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
  const fullScreen = () => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById('screen-share-video');
      element?.requestFullscreen();
    }
  };
  return (
    <div className="screenshare self-screenshare">
      {isLocalScreenShared ? (
        <div className="flex flex-col items-center justify-center font-bold screenshare self-screenshare">
          <p>You're sharing screen</p>{' '}
          <Button variant="danger" onClick={stopScreenShare}>
            <CrossIcon className="mr-2" /> Stop screen share
          </Button>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center h-full md:p-0 p-2">
          <div className="max-w-full block h-auto md:h-full relative">
            {hmsConfig.setHmsWatermark ? <HmsWatermark /> : null}
            <div
              className="absolute flex items-center bottom-0 -right-1 text-sm p-2 rounded-tl-lg"
              style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            >
              <ShareScreenIcon className="mr-2" /> Viewing {screenSharePeer?.name}’s Screen
            </div>
            <button
              onClick={fullScreen}
              style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
              className="absolute top-0 -right-1 display items-center  justify-center rounded-bl-lg cursor-pointer z-10"
            >
              <IconFitScreen />
            </button>
            <video
              id="screen-share-video"
              className="max-w-full block h-auto md:h-full"
              ref={videoRef}
              autoPlay
              muted
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshareTile;

const HmsWatermark = () => {
  return <img src="/hms-coachmark.svg" className="md:block hidden absolute left-2 bottom-2 z-10" />;
};

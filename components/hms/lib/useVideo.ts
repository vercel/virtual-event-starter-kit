import { useEffect, useRef } from 'react';
import { useHMSActions, useHMSStore, selectTrackByID, HMSPeerID } from '@100mslive/react-sdk';

const useVideo = (trackId: HMSPeerID) => {
  const actions = useHMSActions();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hmsStoreVideoTrack = useHMSStore(selectTrackByID(trackId));
  useEffect(() => {
    (async () => {
      if (videoRef.current && hmsStoreVideoTrack) {
        if (hmsStoreVideoTrack.enabled) {
          await actions.attachVideo(hmsStoreVideoTrack.id, videoRef.current);
        } else {
          await actions.detachVideo(hmsStoreVideoTrack.id, videoRef.current);
        }
      }
    })();
  }, [
    videoRef,
    hmsStoreVideoTrack?.id,
    hmsStoreVideoTrack?.enabled,
    hmsStoreVideoTrack?.deviceID,
    hmsStoreVideoTrack?.plugins
  ]);
  return videoRef;
};

export default useVideo;

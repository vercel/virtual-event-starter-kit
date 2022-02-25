import { useEffect, useRef } from 'react';
import { useHMSActions, useHMSStore, selectTrackByID, HMSPeerID } from '@100mslive/react-sdk';

const useVideo = (trackId: HMSPeerID) => {
  const actions = useHMSActions();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const track = useHMSStore(selectTrackByID(trackId));
  useEffect(() => {
    (async () => {
      if (videoRef.current && track?.id) {
        if (track.enabled) {
          await actions.attachVideo(track.id, videoRef.current);
        } else {
          await actions.detachVideo(track.id, videoRef.current);
        }
      }
    })();
  }, [
    videoRef,
    track?.id,
    track?.enabled,
    track?.deviceID,
    track?.plugins,
    actions,
  ]);
  return videoRef;
};

export default useVideo;

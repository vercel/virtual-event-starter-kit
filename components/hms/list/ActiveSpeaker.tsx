import {
  selectLocalPeer,
  selectDominantSpeaker,
  HMSPeer,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectVideoTrackByPeerID
} from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React, { useState, useEffect } from 'react';

const ActiveSpeaker = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const [activeSpeaker, setActiveSpeaker] = useState(localPeer);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);

  const peerFilter = (dominantSpeaker: HMSPeer) => {
    if (dominantSpeaker) {
      setActiveSpeaker(dominantSpeaker);
    }
  };

  useEffect(() => {
    peerFilter(dominantSpeaker || localPeer);
  }, [dominantSpeaker]);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(activeSpeaker.id));
  const isLocalVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(activeSpeaker.id));
  const isLocalAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(activeSpeaker.id));
  useEffect(() => {
    if (videoRef && videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <div
      className="flex justify-center py-2"
      style={{
        height: 'calc((100vh - 3.2 * var(--header-height)) - var(--video-list-height))'
      }}
    >
      <video
        className="bg-gray rounded-lg object-cover relative"
        style={{ aspectRatio: '1.77' }}
        ref={videoRef}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
};

export default ActiveSpeaker;

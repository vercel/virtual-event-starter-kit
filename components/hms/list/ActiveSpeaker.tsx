import {
  selectLocalPeer,
  selectDominantSpeaker,
  HMSPeer,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectVideoTrackByPeerID
} from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React, { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

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
  const { width = 0, height = 0, ref } = useResizeDetector();
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 1,
    maxRowCount: 1,
    maxTileCount: 1,
    width,
    height,
    showScreenFn: () => false,
    overflow: 'scroll-x',
    peers: [activeSpeaker],
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  return (
    <div
      className="py-2"
      style={{
        height: 'calc((100vh - 3.2 * var(--header-height)) - var(--video-list-height))'
      }}
    >
      <div ref={ref} className="flex justify-center  w-full h-full">
        {chunkedTracksWithPeer[0].map((p, i) => (
          <div className="relative" style={{ width: p.width, height: p.height }}>
            <img src="/hms-coachmark.svg" className="absolute right-4 top-4 z-10" />
            <video
              className="bg-gray w-full h-full rounded-lg object-cover relative"
              ref={videoRef}
              autoPlay
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSpeaker;

{
  /*  */
}

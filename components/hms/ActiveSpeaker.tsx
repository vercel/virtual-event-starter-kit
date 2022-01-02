import { selectLocalPeer, selectDominantSpeaker, HMSPeer } from '@100mslive/hms-video-store';
import { useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React, { useState, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import VideoTile from './VideoTile';

const ActiveSpeaker = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const [activeSpeaker, setActiveSpeaker] = useState(localPeer);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);

  const peerFilter = (dominantSpeaker: HMSPeer) => {
    if (dominantSpeaker) {
      setActiveSpeaker(dominantSpeaker);
    }
  };

  const prevPeer = usePrevious(activeSpeaker);

  useEffect(() => {
    peerFilter(dominantSpeaker || getPeer());
  }, [dominantSpeaker]);

  const getPeer = () => {
    if (localPeer.roleName === 'viewer') {
      return prevPeer || localPeer;
    } else {
      return localPeer;
    }
  };

  const { width = 0, height = 0, ref } = useResizeDetector();
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 1,
    maxRowCount: 1,
    maxTileCount: 1,
    width,
    height,
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
        {chunkedTracksWithPeer &&
          chunkedTracksWithPeer.length > 0 &&
          chunkedTracksWithPeer[0].map((p, _) => (
            <VideoTile width={p.width} height={p.height} peer={p.peer} />
          ))}
      </div>
    </div>
  );
};

export default ActiveSpeaker;

function usePrevious(value: HMSPeer): HMSPeer | undefined {
  const ref = useRef<HMSPeer>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

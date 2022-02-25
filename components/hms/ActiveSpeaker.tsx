import {
  useHMSStore,
  useVideoList,
  selectLocalPeer,
  selectDominantSpeaker,
  HMSPeer
} from '@100mslive/react-sdk';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { hmsConfig } from './config';
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

  const getPeer = useCallback(() => {
    if (localPeer.roleName === 'viewer') {
      return prevPeer || localPeer;
    } else {
      return localPeer;
    }
  }, [localPeer, prevPeer]);

  useEffect(() => {
    peerFilter(dominantSpeaker || getPeer());
  }, [dominantSpeaker, getPeer]);

  const { pagesWithTiles, ref } = useVideoList({
    maxTileCount: 1,
    peers: [activeSpeaker],
    aspectRatio: hmsConfig.aspectRatio
  });
  return (
    <div
      className="py-2"
      style={{
        height: 'calc((100vh - 3.2 * var(--header-height)) - var(--video-list-height))'
      }}
    >
      <div ref={ref} className="flex justify-center  w-full h-full">
        {pagesWithTiles &&
          pagesWithTiles.length > 0 &&
          pagesWithTiles[0].map((p, _) => (
            <VideoTile width={p.width} height={p.height} trackId={p.peer.videoTrack || ''} />
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

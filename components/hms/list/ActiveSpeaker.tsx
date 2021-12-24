import {
  selectLocalPeer,
  selectDominantSpeaker,
  HMSPeer,
  selectVideoTrackByPeerID
} from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React, { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import VideoTile from '../VideoTile';

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

{
  /*  */
}

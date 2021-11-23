import { selectPeersByRole } from '@100mslive/hms-video-store';
import { useHMSStore, useVideoList } from '@100mslive/react-sdk';
import { useResizeDetector } from 'react-resize-detector';
import React from 'react';
import s from './index.module.css';
import VideoTile from './VideoTile';

const List = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const { width = 0, height = 0, ref } = useResizeDetector();
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 2,
    maxRowCount: 2,
    maxTileCount: 4,
    width,
    height,
    showScreenFn: () => false,
    overflow: 'scroll-x',
    peers: [...stagePeers, ...inviteePeers],
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  console.log(chunkedTracksWithPeer);
  return (
    <div ref={ref} style={{ width: '100%' }}>
      {chunkedTracksWithPeer &&
        chunkedTracksWithPeer.length > 0 &&
        chunkedTracksWithPeer.map((tracksPeersOnOnePage, page) => (
          <div className={s['video-list']} key={page}>
            {tracksPeersOnOnePage.map((trackPeer, _) => (
              <VideoTile
                key={trackPeer.track ? trackPeer.track.id : trackPeer.peer.id}
                peer={trackPeer.peer}
                width={trackPeer.width}
                height={trackPeer.height}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default List;

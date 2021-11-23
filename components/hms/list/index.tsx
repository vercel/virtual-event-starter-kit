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
  const [page, setPage] = React.useState(0);
  console.log(chunkedTracksWithPeer);
  return (
    <div ref={ref} style={{ width: '100%', position: 'relative' }}>
      {chunkedTracksWithPeer && chunkedTracksWithPeer.length > 0 && (
        <div className={s['video-list']}>
          {chunkedTracksWithPeer[page].map((trackPeer, _) => (
            <VideoTile
              key={trackPeer.track ? trackPeer.track.id : trackPeer.peer.id}
              peer={trackPeer.peer}
              width={trackPeer.width}
              height={trackPeer.height}
            />
          ))}
        </div>
      )}
      <div className={s['pagin-ctx']}>
        {/* <div>
          <ChevronLeft />
        </div> */}

        {chunkedTracksWithPeer.map((_, i: number) => (
          <div className={s['pagin-btn']} onClick={() => setPage(i)} />
        ))}
        {/* <div>
          <ChevronRight />
        </div> */}
      </div>
    </div>
  );
};

export default List;

const ChevronLeft = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    color="white"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    color="white"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

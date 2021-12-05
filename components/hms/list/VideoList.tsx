import { selectPeersByRole } from '@100mslive/hms-video-store';
import { useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import VideoTile from './VideoTile';
import s from './index.module.css';
import RoleChangeDialog from '../request';

const VideoList = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const { width = 0, height = 0, ref } = useResizeDetector();
  const renderPeers = [...stagePeers, ...inviteePeers];
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 2,
    maxRowCount: 2,
    maxTileCount: 4,
    width,
    height,
    showScreenFn: () => false,
    overflow: 'scroll-x',
    peers: renderPeers,
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  const [page, setPage] = React.useState(0);
  const nextPage = () => {
    // last
    if (page === chunkedTracksWithPeer.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    // prev
    if (page === 0) {
      setPage(chunkedTracksWithPeer.length - 1);
    } else {
      setPage(page - 1);
    }
  };
  console.log(chunkedTracksWithPeer);
  return (
    <div ref={ref} style={{ width: '100%', position: 'relative', padding: '0 1rem' }}>
      <RoleChangeDialog />
      {chunkedTracksWithPeer && chunkedTracksWithPeer.length > 0 ? (
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
      ) : (
        <div className={s['empty-room']}>
          <h2>No Speakers Present</h2>
        </div>
      )}
      {chunkedTracksWithPeer.length > 1 ? (
        <div className={s['pagin-ctx']}>
          <div onClick={prevPage}>
            <ChevronLeft />
          </div>
          {chunkedTracksWithPeer.map((_, i: number) => (
            <div
              className={`${s['pagin-btn']} ${i === page ? s['pagin-active'] : null}`}
              onClick={() => setPage(i)}
            />
          ))}
          <div onClick={nextPage}>
            <ChevronRight />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default VideoList;

const ChevronLeft = () => (
  <svg
    width={14}
    height={14}
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
    width={14}
    height={14}
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

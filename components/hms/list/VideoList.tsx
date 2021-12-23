import { selectPeersByRole } from '@100mslive/hms-video-store';
import { useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import VideoTile from './VideoTile';
import s from './index.module.css';
import RoleChangeDialog from '../request';
import ActiveSpeaker from './ActiveSpeaker';

const VideoList = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const { width = 0, height = 0, ref } = useResizeDetector();
  const renderPeers = [...stagePeers, ...inviteePeers];
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 4,
    maxRowCount: 1,
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
  const disableLeft = chunkedTracksWithPeer.length - page === chunkedTracksWithPeer.length;
  const disableRight = chunkedTracksWithPeer.length - page === 1;
  const nextPage = () => {
    // last
    if (page === chunkedTracksWithPeer.length - 1) {
      setPage(chunkedTracksWithPeer.length - 1);
    } else {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    // prev
    if (page === 0) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };
  console.log('chunkedTracksWithPeer', chunkedTracksWithPeer);
  React.useEffect(() => {
    // currentPageIndex should not exceed pages length
    if (page > chunkedTracksWithPeer.length) {
      setPage(0);
    }
  }, [page, chunkedTracksWithPeer.length]);
  return (
    <div style={{ width: '100%', position: 'relative', padding: '0 1rem' }}>
      <ActiveSpeaker />
      <RoleChangeDialog />
      {chunkedTracksWithPeer && chunkedTracksWithPeer.length > 0 ? (
        <div ref={ref} className={s['video-list']}>
          {chunkedTracksWithPeer[page < chunkedTracksWithPeer.length ? page : 0].map(
            (trackPeer, _) => (
              <VideoTile
                key={trackPeer.track ? trackPeer.track.id : trackPeer.peer.id}
                peer={trackPeer.peer}
                width={trackPeer.width}
                height={trackPeer.height}
              />
            )
          )}
        </div>
      ) : (
        <div className={s['empty-room']}>
          <h2>No Speakers Present</h2>
        </div>
      )}
      {chunkedTracksWithPeer.length > 1 ? (
        <div className={s['pagin-ctx']}>
          <button className="arrow-btn" onClick={prevPage} disabled={disableLeft}>
            <ChevronLeft />
          </button>
          {chunkedTracksWithPeer.map((_, i: number) => (
            <div
              className={`${s['pagin-btn']} ${i === page ? s['pagin-active'] : null}`}
              onClick={() => setPage(i)}
            />
          ))}
          <button className="arrow-btn" onClick={nextPage} disabled={disableRight}>
            <ChevronRight />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default VideoList;

const ChevronLeft = () => (
  <svg
    width={14}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    color="white"
    className="cursor-pointer"
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
    className="cursor-pointer"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

import { selectPeersByRole } from '@100mslive/hms-video-store';
import { useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import VideoTile from './VideoTile';
import RoleChangeDialog from './request';
import ActiveSpeaker from './ActiveSpeaker';
import EmptyRoom from './EmptyRoom';
import Pagination from './Pagination';

const VideoList = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const { width = 0, height = 0, ref } = useResizeDetector();
  const renderPeers = [...stagePeers, ...inviteePeers];
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 5,
    maxRowCount: 1,
    maxTileCount: 5,
    width,
    height,
    peers: renderPeers,
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    // currentPageIndex should not exceed pages length
    if (page > chunkedTracksWithPeer.length) {
      setPage(0);
    }
  }, [page, chunkedTracksWithPeer.length]);
  const showSingleSpeaker = renderPeers.length === 1;
  return (
    <div style={{ width: '100%', position: 'relative', padding: '0 1rem' }}>
      {chunkedTracksWithPeer && chunkedTracksWithPeer.length > 0 ? (
        <>
          {showSingleSpeaker ? null : <ActiveSpeaker />}
          <RoleChangeDialog />
          <div
            style={{
              height: `${
                showSingleSpeaker
                  ? 'calc((100vh - 3.2 * var(--header-height)) '
                  : 'var(--video-list-height)'
              }`
            }}
            ref={ref}
            className="w-full flex flex-wrap place-content-center items-center"
          >
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
        </>
      ) : (
        <EmptyRoom />
      )}
      {chunkedTracksWithPeer.length > 1 ? (
        <Pagination page={page} setPage={setPage} list={chunkedTracksWithPeer} />
      ) : null}
    </div>
  );
};

export default VideoList;

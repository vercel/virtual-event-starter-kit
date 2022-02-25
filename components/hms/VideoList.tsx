import {
  useHMSStore,
  useVideoList,
  selectDominantSpeaker,
  selectLocalPeer,
  selectPeersByRole,
  HMSPeer,
  selectIsSomeoneScreenSharing,
  selectPeers
} from '@100mslive/react-sdk';
import React, { useEffect, useState } from 'react';
import VideoTile from './VideoTile';
import RoleChangeDialog from './request';
import EmptyRoom from './EmptyRoom';
import Pagination from './Pagination';
import MobileView from './mobile';
import { hmsConfig } from './config';
import ScreenshareTile from './ScreenshareTile';

const VideoList = () => {
  const activeSpeakerThreshold = hmsConfig.activeSpeakerThreshold;
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const renderPeers = peers.filter(p => p.roleName !== 'viewer');
  const [activeSpeaker, setActiveSpeaker] = useState(localPeer);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  const isActiveSpeakerModeOn = activeSpeaker && renderPeers.length > activeSpeakerThreshold;
  /** here we are using peer filter function to change the activeSpeaker and sidebarPeers,
   * on first mount activeSpeaker points to the localPeer and on each update it points
   * to the dominantSpeaker
   */
  const peerFilter = (dominantSpeaker: HMSPeer) => {
    if (dominantSpeaker) {
      setActiveSpeaker(dominantSpeaker);
    }
  };

  useEffect(() => {
    if (dominantSpeaker) {
      peerFilter(dominantSpeaker);
    } else {
      if (localPeer.roleName === 'viewer' && stagePeers.length > 0) {
        setActiveSpeaker(stagePeers[0]);
      }
    }
  }, [dominantSpeaker, stagePeers, localPeer.roleName]);
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);

  return (
    <>
      <div
        className="w-full relative md:block hidden"
        style={{ height: 'calc((100vh - 3.2 * var(--header-height))' }}
      >
        {renderPeers.length > 0 ? (
          <>
            {isActiveSpeakerModeOn || isSomeoneScreenSharing ? (
              <ActiveSpeaker allPeers={renderPeers} activePeer={activeSpeaker} />
            ) : (
              <NonActiveSpeakerView peers={renderPeers} />
            )}
          </>
        ) : (
          <EmptyRoom />
        )}
      </div>
      <RoleChangeDialog />
      <MobileView allPeers={renderPeers} activePeer={activeSpeaker} />
    </>
  );
};

export default VideoList;

const NonActiveSpeakerView: React.FC<{ peers: HMSPeer[] }> = ({ peers }) => {
  const { pagesWithTiles, ref } = useVideoList({
    maxColCount: 2,
    maxRowCount: 2,
    maxTileCount: 4,
    peers,
    aspectRatio: hmsConfig.aspectRatio
  });
  return (
    <div ref={ref} className="w-full h-full flex flex-wrap place-content-center items-center">
      {pagesWithTiles &&
        pagesWithTiles.length > 0 &&
        pagesWithTiles[0].map((p, _) => (
          <VideoTile
            key={p.peer.id}
            width={p.width}
            height={p.height}
            trackId={p.peer.videoTrack || ''}
          />
        ))}
    </div>
  );
};

const ActiveSpeaker: React.FC<{ activePeer: HMSPeer; allPeers: HMSPeer[] }> = ({
  allPeers,
  activePeer
}) => {
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  const peers = isSomeoneScreenSharing
    ? allPeers
    : allPeers.filter(peer => peer.id !== activePeer.id);
  return (
    <>
      {isSomeoneScreenSharing ? <ScreenshareTile /> : <ActiveTile activePeer={activePeer} />}
      <AllSpeakers allPeers={peers} />
    </>
  );
};

const ActiveTile: React.FC<{ activePeer: HMSPeer }> = ({ activePeer }) => {
  const { pagesWithTiles, ref } = useVideoList({
    maxTileCount: 1,
    peers: [activePeer],
    aspectRatio: hmsConfig.aspectRatio
  });
  return (
    <div
      ref={ref}
      className="flex justify-center"
      style={{
        height: 'calc((100vh - 3.2 * var(--header-height)) - var(--video-list-height))'
      }}
    >
      {pagesWithTiles &&
        pagesWithTiles.length > 0 &&
        pagesWithTiles[0].map((p, _) => (
          <VideoTile width={p.width} height={p.height} trackId={p.peer.videoTrack || ''} />
        ))}
    </div>
  );
};

const AllSpeakers: React.FC<{ allPeers: HMSPeer[] }> = ({ allPeers }) => {
  const { pagesWithTiles, ref } = useVideoList({
    maxRowCount: 1,
    maxTileCount: hmsConfig.maxTileCountSpeakers,
    peers: allPeers,
    aspectRatio: hmsConfig.aspectRatio
  });
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    // currentPageIndex should not exceed pages length
    if (page > pagesWithTiles.length) {
      setPage(0);
    }
  }, [page, pagesWithTiles.length]);
  return (
    <div
      style={{
        height: 'var(--video-list-height)'
      }}
      ref={ref}
      className="relative w-full flex flex-wrap place-content-center items-center"
    >
      {pagesWithTiles &&
        pagesWithTiles.length > 0 &&
        pagesWithTiles[page < pagesWithTiles.length ? page : 0].map((p, _) => (
          <VideoTile width={p.width} height={p.height} trackId={p.peer.videoTrack || ''} />
        ))}
      {pagesWithTiles.length > 1 ? (
        <Pagination page={page} setPage={setPage} list={pagesWithTiles} />
      ) : null}
    </div>
  );
};

import React from 'react';
import Avatar from '../Avatar';
import {
  useHMSStore,
  useVideoList,
  HMSPeer,
  selectIsSomeoneScreenSharing,
  selectPeersByRole
} from '@100mslive/react-sdk';
import VideoTile from '../VideoTile';
import ScreenshareTile from '../ScreenshareTile';
import { hmsConfig } from '../config';

const MobileView: React.FC<{ activePeer: HMSPeer; allPeers: HMSPeer[] }> = ({
  activePeer,
  allPeers
}) => {
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  return (
    <div className="md:hidden w-full h-full flex flex-col">
      {allPeers.length > 0 ? (
        <MobileHeader />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-medium">
          No Speakers Present
        </div>
      )}
      {isSomeoneScreenSharing ? <ScreenshareTile /> : <VideoList peer={activePeer} />}
    </div>
  );
};

const VideoList: React.FC<{ peer: HMSPeer }> = ({ peer }) => {
  const { pagesWithTiles, ref } = useVideoList({
    maxColCount: 1,
    maxRowCount: 1,
    maxTileCount: 1,
    peers: [peer],
    aspectRatio: hmsConfig.aspectRatio
  });
  return (
    <div ref={ref} className="w-full h-full flex items-center">
      {pagesWithTiles && pagesWithTiles.length > 0 ? (
        <VideoTile
          width={pagesWithTiles[0][0].width}
          height={pagesWithTiles[0][0].height}
          trackId={pagesWithTiles[0][0].peer.videoTrack || ''}
        />
      ) : null}
    </div>
  );
};

const MobileHeader = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  return (
    <div className="w-full flex items-center h-[90px] pl-4 my-2">
      <div className="flex flex-col justify-center items-center space-y-1">
        <button>
          <LayoutModeIcon />
        </button>
        <span className="text-xs">Auto</span>
      </div>
      <div className="h-[80%] w-[1px] bg-gray-700 mx-4" />
      <div className="w-full flex overflow-x-scroll">
        {stagePeers.map(l => (
          <div key={l.id} className="flex flex-col justify-center items-center space-y-2 mx-2">
            <Avatar customSize={40} name={l.name} />
            <span className="text-xs">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileView;

const LayoutModeIcon = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18.5" stroke="#702EC2" strokeWidth="3" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10.8125C18.7568 10.8125 17.5645 11.3064 16.6855 12.1854C15.8064 13.0645 15.3125 14.2568 15.3125 15.5C15.3125 16.7432 15.8064 17.9355 16.6855 18.8146C17.5645 19.6936 18.7568 20.1875 20 20.1875C21.2432 20.1875 22.4355 19.6936 23.3146 18.8146C24.1937 17.9355 24.6875 16.7432 24.6875 15.5C24.6875 14.2568 24.1937 13.0645 23.3146 12.1854C22.4355 11.3064 21.2432 10.8125 20 10.8125ZM17.7461 13.2461C18.3439 12.6483 19.1547 12.3125 20 12.3125C20.8454 12.3125 21.6562 12.6483 22.2539 13.2461C22.8517 13.8439 23.1875 14.6546 23.1875 15.5C23.1875 16.3454 22.8517 17.1561 22.2539 17.7539C21.6562 18.3517 20.8454 18.6875 20 18.6875C19.1547 18.6875 18.3439 18.3517 17.7461 17.7539C17.1484 17.1561 16.8125 16.3454 16.8125 15.5C16.8125 14.6546 17.1484 13.8439 17.7461 13.2461ZM16.0122 24.4497C17.0698 23.392 18.5043 22.7979 20 22.7979C21.4957 22.7979 22.9302 23.392 23.9879 24.4497C25.0455 25.5073 25.6397 26.9418 25.6397 28.4375C25.6397 28.8517 25.9755 29.1875 26.3897 29.1875C26.8039 29.1875 27.1397 28.8517 27.1397 28.4375C27.1397 26.544 26.3875 24.728 25.0485 23.389C23.7096 22.0501 21.8936 21.2979 20 21.2979C18.1065 21.2979 16.2905 22.0501 14.9515 23.389C13.6126 24.728 12.8604 26.544 12.8604 28.4375C12.8604 28.8517 13.1961 29.1875 13.6104 29.1875C14.0246 29.1875 14.3604 28.8517 14.3604 28.4375C14.3604 26.9418 14.9545 25.5073 16.0122 24.4497Z"
        fill="white"
      />
      <rect x="22" y="23" width="8" height="8" rx="4" fill="#181818" />
      <path
        d="M24.6155 29.1817L25.1032 27.8086H27.0634L27.5511 29.1817H28.1667L26.3864 24.3333H25.7803L24 29.1817H24.6155ZM25.2879 27.2878L26.0644 25.1003H26.1023L26.8788 27.2878H25.2879Z"
        fill="white"
      />
    </svg>
  );
};

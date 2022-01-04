import { selectIsSomeoneScreenSharing } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import ScreenshareTile from './ScreenshareTile';
import VideoList from './VideoList';

const List = () => {
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);
  return <>{isSomeoneScreenSharing ? <ScreenshareTile /> : <VideoList />}</>;
};

export default List;

// new
import {
  HMSPeer,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectPeerAudioByID
} from '@100mslive/hms-video-store';
import { MicOffIcon } from '@100mslive/react-icons';
import { useHMSStore, useVideo } from '@100mslive/react-sdk';
import React from 'react';
import Avatar from './Avatar';

interface Props {
  peer: HMSPeer;
  width: number;
  height: number;
}

const VideoTile: React.FC<Props> = ({ width, height, peer }) => {
  const isLocalVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const isLocalAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const audioLevel = useHMSStore(selectPeerAudioByID(peer.id)) > 0;
  return (
    <div className="relative p-2 flex justify-center items-center" style={{ width, height }}>
      {isLocalVideoEnabled ? (
        <HmsWatermark />
      ) : (
        <Avatar className="absolute z-10" name={peer.name} />
      )}
      <PeerName name={peer.name} />
      {peer.videoTrack ? (
        <Video isLocal={peer.isLocal} audioLevel={audioLevel} id={peer.videoTrack} />
      ) : null}
      {isLocalAudioEnabled ? null : <AudioIndicator />}
    </div>
  );
};

export default VideoTile;

const Video: React.FC<{ id: string; audioLevel: boolean; isLocal: boolean }> = ({
  id,
  audioLevel,
  isLocal
}) => {
  const ref = useVideo(id);
  return (
    <video
      id={id}
      className={`bg-gray-base border-solid border-transparent w-full h-full rounded-lg object-cover ${
        audioLevel ? 'audio-level' : ''
      } ${isLocal ? 'mirror' : ''}`}
      ref={ref}
      autoPlay
      muted
      playsInline
    />
  );
};

const AudioIndicator = () => {
  return (
    <div className="absolute right-6 bottom-4 p-1 flex items-center justify-center rounded-full bg-red-500">
      <MicOffIcon />
    </div>
  );
};

const PeerName: React.FC<{ name: string }> = ({ name }) => {
  return <span className="absolute bottom-6 left-6 z-10 text-sm">{name}</span>;
};

const HmsWatermark = () => {
  return <img src="/hms-coachmark.svg" className="absolute right-6 top-6 z-10" />;
};

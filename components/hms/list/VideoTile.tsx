import {
  selectVideoTrackByPeerID,
  selectIsPeerVideoEnabled,
  selectIsPeerAudioEnabled,
  HMSPeer
} from '@100mslive/hms-video-store';
import { MicOnIcon, MicOffIcon } from '@100mslive/react-icons';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React, { useEffect } from 'react';
import { getAvatarBg } from '../getAvatarBg';
import s from './index.module.css';

interface VideoTileProps {
  peer: HMSPeer;
  width: number;
  height: number;
}

const VideoTile: React.FC<VideoTileProps> = ({ peer, width, height }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));
  const isLocalVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const isLocalAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  useEffect(() => {
    if (videoRef && videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);
  const { initials, color } = getAvatarBg(peer.name);
  return (
    <div className={s['tile-container']} style={{ width, height }}>
      <video ref={videoRef} className={s['tile-video']} autoPlay muted playsInline />
      {!isLocalVideoEnabled ? (
        <div style={{ backgroundColor: color }} className={s['tile-avatar']}>
          {initials}
        </div>
      ) : (
        <div className={s['tile-name']}>{peer.name}</div>
      )}
      <div className={s['tile-overlay']}>
        <div className={s['tile-info']}>{isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}</div>
      </div>
    </div>
  );
};

export default VideoTile;

import {
  selectVideoTrackByPeerID,
  selectIsPeerVideoEnabled,
  selectIsPeerAudioEnabled,
  HMSPeer,
  selectPeerAudioByID
} from '@100mslive/hms-video-store';
import { MicOffIcon } from '@100mslive/react-icons';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React, { useEffect } from 'react';
import { getAvatarBg } from '../lib/getAvatarBg';
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
  const audioLevel = useHMSStore(selectPeerAudioByID(peer.id)) > 0;

  return (
    <div className={s['tile-container']} style={{ width, height }}>
      <video
        ref={videoRef}
        className={`${s['tile-video']} ${audioLevel ? s['tile-audio-level'] : null} ${
          peer.isLocal ? s['is-local'] : ''
        }`}
        autoPlay
        muted
        playsInline
      />
      {!isLocalVideoEnabled ? (
        <div style={{ backgroundColor: color }} className={s['tile-avatar']}>
          {initials}
        </div>
      ) : (
        <>
          <img src="/hms-coachmark.svg" className={s['tile-coachmark']} />
        </>
      )}
      <div className={s['tile-name']}>{peer.name}</div>
      <div className={s['tile-overlay']}>
        {isLocalAudioEnabled ? null : (
          <div className={s['tile-info']}>
            <MicOffIcon />
          </div>
        )}
      </div>

      {/* <div className={s['tile-menu-btn']}>
        <Dropdown id={peer.id} />
      </div> */}
    </div>
  );
};

export default VideoTile;

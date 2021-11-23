import {
  selectVideoTrackByPeerID,
  selectIsPeerVideoEnabled,
  selectIsPeerAudioEnabled,
  HMSPeer
} from '@100mslive/hms-video-store';
import { MicOnIcon, MicOffIcon } from '@100mslive/react-icons';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import MenuIcon from '@components/icons/icon-menu';
import React, { useEffect } from 'react';
import { getAvatarBg } from '../getAvatarBg';
import s from './index.module.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import RemoveUserIcon from '@components/icons/icon-remove-user';
import BringToStageIcon from '@components/icons/icon-bring-stage';

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
      {/* <div className={s['tile-menu-btn']}>
        <Dropdown id={peer.id} />
      </div> */}
    </div>
  );
};

export default VideoTile;

const Dropdown: React.FC<{ id: string }> = ({ id }) => {
  const actions = useHMSActions();
  const changeRole = () => {
    actions.changeRole(id, 'invitee', true);
  };
  const removePeer = () => {
    actions.removePeer(id, 'Bye');
  };
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={s['menu-btn']}>
            <MenuIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={s['menu-content']}>
          <DropdownMenu.Item asChild>
            <button className={s['menu-item']} onClick={changeRole}>
              <BringToStageIcon /> Bring user to stage
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className={s['menu-item']} onClick={removePeer}>
              <RemoveUserIcon /> Remove user
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

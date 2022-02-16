import {
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectIsLocalScreenShared,
  selectLocalPeerRole,
  selectIsAllowedToPublish
} from '@100mslive/react-sdk';
import {
  VideoOffIcon,
  VideoOnIcon,
  MicOffIcon,
  MicOnIcon,
  ShareScreenIcon,
  SettingIcon
} from '@100mslive/react-icons';
import React from 'react';
import ControlButton from './ControlButton';
import LeaveDialog from './LeaveDialog';
import SettingDialog from './SettingDialog';

const Footer = () => {
  const role = useHMSStore(selectLocalPeerRole);
  const isAllowedToPublish = useHMSStore(selectIsAllowedToPublish);
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle();
  const actions = useHMSActions();
  const startScreenshare = async () => {
    try {
      await actions.setScreenShareEnabled(true);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const isLocalScreenShare = useHMSStore(selectIsLocalScreenShared);
  return (
    <div
      className="w-full hidden md:flex items-center justify-center space-x-5"
      style={{ height: 'calc(var(--header-height) * 1.2)' }}
    >
      {isAllowedToPublish.audio ? (
        <ControlButton text="Mic" active={isLocalAudioEnabled} onClick={toggleAudio}>
          {isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
        </ControlButton>
      ) : null}
      {isAllowedToPublish.video ? (
        <ControlButton text="Video" active={isLocalVideoEnabled} onClick={toggleVideo}>
          {isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
        </ControlButton>
      ) : null}
      {isAllowedToPublish.screen ? (
        <ControlButton text="Screen share" active={isLocalScreenShare} onClick={startScreenshare}>
          <ShareScreenIcon />
        </ControlButton>
      ) : null}

      <SettingDialog>
        <ControlButton text="Setting" onClick={() => {}}>
          <SettingIcon />
        </ControlButton>
      </SettingDialog>
      {role?.name !== 'viewer' ? <LeaveDialog /> : null}
    </div>
  );
};

export default Footer;

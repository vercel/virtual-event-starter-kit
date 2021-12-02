/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  IconButton,
  Preview,
  Loading,
  Avatar,
  Dialog,
  Select,
  Flex,
  Text
} from '@100mslive/react-ui';
import {
  MicOffIcon,
  MicOnIcon,
  SettingIcon,
  VideoOffIcon,
  VideoOnIcon,
  ArrowRightIcon
} from '@100mslive/react-icons';
import { useDevices, useHMSActions, usePreview, useVideoTile } from '@100mslive/react-sdk';
import { getAvatarBg } from '../getAvatarBg';
import s from './index.module.css';
import { HMSPeer } from '@100mslive/hms-video-store';

export const PreviewScreen: React.FC<{ token: string }> = ({ token }) => {
  const actions = useHMSActions();
  const { localPeer, audioEnabled, videoEnabled } = usePreview(token, 'preview');
  const [name, setName] = React.useState('');
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    actions.join({
      userName: name,
      authToken: token,
      settings: {
        isAudioMuted: !audioEnabled,
        isVideoMuted: !videoEnabled
      },
      rememberDeviceSelection: true
    });
  };
  return (
    <div className={s['preview-container']}>
      {localPeer ? <PreviewVideo name={name} peer={localPeer} /> : <VideoLoader />}
      <div className={s['wrapper']}>
        <div>
          <p className={s['head-text']}>Welcome!</p>
          <p className={s['sub-text']}>Preview your video and audio before joining the stage</p>
        </div>
        <form onSubmit={joinRoom}>
          <p className={s['label']}>Enter name:</p>
          <input
            className={s['input']}
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
          <button className={s['btn']} type="submit">
            Join Stage <ArrowRightIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

const PreviewVideo: React.FC<{ peer: HMSPeer; name: string }> = ({ peer, name }) => {
  const { color, initials } = getAvatarBg(name);
  const actions = useHMSActions();
  const { videoRef, isLocal, isAudioOn, isVideoOn, audioLevel } = useVideoTile(peer);
  return (
    <Preview.VideoRoot css={{ width: '290px', height: '290px' }} audioLevel={audioLevel}>
      {isVideoOn ? (
        <Preview.Video local={isLocal} ref={videoRef} autoPlay muted playsInline />
      ) : (
        <Avatar size="lg" style={{ backgroundColor: color }}>
          {initials}
        </Avatar>
      )}
      <Preview.Controls>
        <IconButton active={isAudioOn} onClick={() => actions.setLocalAudioEnabled(!isAudioOn)}>
          {isAudioOn ? <MicOnIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton active={isVideoOn} onClick={() => actions.setLocalVideoEnabled(!isVideoOn)}>
          {isVideoOn ? <VideoOnIcon /> : <VideoOffIcon />}
        </IconButton>
      </Preview.Controls>
      <Preview.Setting>
        <PreviewSetting />
      </Preview.Setting>
      <Preview.BottomOverlay />
    </Preview.VideoRoot>
  );
};

const PreviewSetting = () => {
  const d = useDevices();
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <IconButton>
          <SettingIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content title="Settings">
        {d!.showVideo ? (
          <Flex align="center" justify="between" css={{ my: '1rem' }}>
            <Text variant="heading-sm">Camera:</Text>
            <Select
              // @ts-ignore
              onChange={d!.handleInputChange}
              value={d!.selectedDevices.videoInputDeviceId}
            >
              {d!.videoInput.map(device => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </Flex>
        ) : null}
        {d!.showAudio ? (
          <Flex align="center" justify="between" css={{ my: '1rem' }}>
            <Text variant="heading-sm">Microphone:</Text>
            <Select
              // @ts-ignore
              onChange={d!.handleInputChange}
              value={d!.selectedDevices.audioInputDeviceId}
            >
              {d!.audioInput.map(device => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </Flex>
        ) : null}
        {d!.isSubscribing && d!.audioOutput.length > 0 ? (
          <Flex align="center" justify="between" css={{ my: '1rem' }}>
            <Text variant="heading-sm">Speaker:</Text>
            <Select
              // @ts-ignore
              onChange={d!.handleInputChange}
              value={d!.selectedDevices.audioOutputDeviceId}
            >
              {d!.audioOutput.map(device => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </Flex>
        ) : null}
      </Dialog.Content>
    </Dialog>
  );
};

const VideoLoader = () => (
  <div className={s['video-loader']}>
    <Loading size={90} />
  </div>
);

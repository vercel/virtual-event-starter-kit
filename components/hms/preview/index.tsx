/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { IconButton, Preview, Loading, Avatar, Dialog, Flex, Text } from '@100mslive/react-ui';
import {
  MicOffIcon,
  MicOnIcon,
  SettingIcon,
  VideoOffIcon,
  VideoOnIcon,
  ArrowRightIcon
} from '@100mslive/react-icons';
import { useHMSActions, useHMSStore, usePreview, useVideoTile } from '@100mslive/react-sdk';
import { getAvatarBg } from '../getAvatarBg';
import s from './index.module.css';
import { HMSPeer, selectDevices, selectLocalMediaSettings } from '@100mslive/hms-video-store';
import Select from '@components/hms/select';
import InfoIcon from '@components/icons/icon-info';
import router from 'next/router';

export const PreviewScreen: React.FC<{ token: string }> = ({ token }) => {
  const actions = useHMSActions();
  const { localPeer, audioEnabled, videoEnabled } = usePreview(token, 'preview');
  // const [name, setName] = React.useState('');
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    actions.join({
      userName: 'David',
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
      {localPeer ? <PreviewVideo name="David" peer={localPeer} /> : <VideoLoader />}
      <div className={s['wrapper']}>
        <div>
          <p className={s['head-text']}>Welcome David</p>
          <p className={s['sub-text']}>Preview your video and audio before joining the stage</p>
        </div>
        <form onSubmit={joinRoom}>
          {/* <p className={s['label']}>Enter name:</p>
          <input
            required
            maxLength={20}
            className={s['input']}
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          /> */}
          <p className={s['info']}>
            <InfoIcon /> Note: Your mic is {audioEnabled ? 'on' : 'off'} and video is{' '}
            {videoEnabled ? 'on' : 'off'}
          </p>

          <div className={s['btn-wrapper']}>
            <button className={`${s['back-btn']} ${s['btn']}`} onClick={() => router.push('/')}>
              Go back
            </button>
            <button className={s['btn']} type="submit">
              Join Stage <ArrowRightIcon />
            </button>
          </div>
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
  const actions = useHMSActions();
  const devices = useHMSStore(selectDevices);
  const videoInput = devices['videoInput'] || [];
  const audioInput = devices['audioInput'] || [];
  const audioOutput = devices['audioOutput'] || [];
  const selectedDevices = useHMSStore(selectLocalMediaSettings);
  const handleAudioInput = (a: string) => {
    actions.setAudioSettings({ deviceId: a });
  };
  const handleAudioOutput = (a: string) => {
    actions.setAudioOutputDevice(a);
  };
  const handleVideoInput = (a: string) => {
    actions.setVideoSettings({ deviceId: a });
  };
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <IconButton>
          <SettingIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content title="Settings">
        {videoInput.length > 0 ? (
          <Flex align="center" justify="between" css={{ my: '1rem' }}>
            <Text variant="heading-sm">Video:</Text>
            <Select
              onChange={e => handleVideoInput(e.target.value)}
              value={selectedDevices.videoInputDeviceId}
            >
              {videoInput.map((device: MediaDeviceInfo) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </Flex>
        ) : null}
        {audioInput.length > 0 ? (
          <Flex align="center" justify="between" css={{ my: '1rem' }}>
            <Text variant="heading-sm">Microphone:</Text>
            <Select
              onChange={e => handleAudioInput(e.target.value)}
              value={selectedDevices.audioInputDeviceId}
            >
              {audioInput.map((device: MediaDeviceInfo) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </Flex>
        ) : null}
        {audioOutput.length > 0 ? (
          <Flex align="center" justify="between" css={{ my: '1rem' }}>
            <Text variant="heading-sm">Speaker:</Text>
            <Select
              onChange={e => handleAudioOutput(e.target.value)}
              value={selectedDevices.audioOutputDeviceId}
            >
              {audioOutput.map((device: MediaDeviceInfo) => (
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

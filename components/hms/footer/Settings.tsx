/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SettingIcon } from '@100mslive/react-icons';
import React from 'react';
import s from './index.module.css';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { Dialog, Flex, Text } from '@100mslive/react-ui';
import { selectDevices, selectLocalMediaSettings } from '@100mslive/hms-video-store';
import Select from '../select';

const Settings = () => {
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
        <div className={s['btn-wrapper']}>
          <button className={s['btn']}>
            <SettingIcon />
          </button>
          <p className={s['btn-text']}>Setting</p>
        </div>
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

export default Settings;

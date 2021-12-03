/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SettingIcon } from '@100mslive/react-icons';
import React from 'react';
import s from './index.module.css';
import { useDevices } from '@100mslive/react-sdk';
import { Dialog, Flex, Text, Select } from '@100mslive/react-ui';

const Settings = () => {
  const d = useDevices();
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

export default Settings;

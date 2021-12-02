import { SettingIcon } from '@100mslive/react-icons';
import React from 'react';
import s from './index.module.css';
import { useDevices } from '@100mslive/react-sdk';
import * as Dialog from '@radix-ui/react-dialog';
import Select from '@components/select';

const Settings = () => {
  const st = useDevices();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={s['btn']}>
          <SettingIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Overlay className={s['dialog-overlay']} />
      <Dialog.Content className={s['dialog-content']}>
        {st!.showAudio ? (
          <div className={s['fieldset']}>
            <p>Microphone:</p>
            <Select
              className={s['select']}
              onChange={st!.handleInputChange}
              value={st!.selectedDevices.audioInputDeviceId}
            >
              {st!.audioInput.map(device => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        {st!.showVideo ? (
          <div className={s['fieldset']}>
            <p>Camera:</p>
            <Select
              className={s['select']}
              onChange={st!.handleInputChange}
              value={st!.selectedDevices.videoInputDeviceId}
            >
              {st!.videoInput.map(device => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        {st!.isSubscribing && st!.audioOutput.length > 0 ? (
          <div className={s['fieldset']}>
            <p>Speaker:</p>
            <Select
              className={s['select']}
              onChange={st!.handleInputChange}
              value={st!.selectedDevices.audioOutputDeviceId}
            >
              {st!.audioOutput.map(device => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Settings;

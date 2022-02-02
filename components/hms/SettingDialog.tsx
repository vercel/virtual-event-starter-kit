/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CrossIcon } from '@100mslive/react-icons';
import Select from './select';
import { AudioLevelIcon } from '@100mslive/react-icons';
import Button from './Button';
import { useDevices, DeviceType } from './lib/useDevices';

const SettingDialog: React.FC = ({ children }) => {
  const { allDevices, selectedDeviceIDs, updateDevice, isAllowedToPublish } = useDevices();
  const videoInput = allDevices['videoInput'] || [];
  const audioInput = allDevices['audioInput'] || [];
  const audioOutput = allDevices['audioOutput'] || [];
  const textClass = `text-gray-200`;
  const wrapperClass = `flex md:flex-row flex-col md:items-center md:justify-between my-6`;
  return (
    <Dialog.Root>
      <Dialog.Overlay className="fixed inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="dialog-content dialog-animation  bg-gray-700 md:w-[520px] rounded-2xl w-[90%] ">
        <div className="w-full flex items-center justify-between">
          <span className="text-xl font-bold">Settings</span>
          <Dialog.Close asChild>
            <button>
              <CrossIcon />
            </button>
          </Dialog.Close>
        </div>
        {isAllowedToPublish.audio && isAllowedToPublish.video ? (
          <p className="my-0 text-gray-300 text-sm">Control your audio, video source from here</p>
        ) : null}
        {videoInput.length > 0 && isAllowedToPublish.video ? (
          <div className={wrapperClass}>
            <span className={textClass}>Video</span>
            <Select
              onChange={e =>
                updateDevice({
                  deviceId: e.target.value,
                  deviceType: DeviceType.videoInput
                })
              }
              value={selectedDeviceIDs.videoInput}
            >
              {videoInput.map((device: MediaDeviceInfo) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        {audioInput.length > 0 && isAllowedToPublish.audio ? (
          <div className={wrapperClass}>
            <span className={textClass}>Microphone</span>
            <Select
              onChange={e =>
                updateDevice({
                  deviceId: e.target.value,
                  deviceType: DeviceType.audioInput
                })
              }
              value={selectedDeviceIDs.audioInput}
            >
              {audioInput.map((device: MediaDeviceInfo) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        {audioOutput.length > 0 ? (
          <div className={wrapperClass}>
            <span className={textClass}>Speaker</span>
            <Select
              onChange={e =>
                updateDevice({
                  deviceId: e.target.value,
                  deviceType: DeviceType.audioOutput
                })
              }
              value={selectedDeviceIDs.audioOutput}
            >
              {audioOutput.map((device: MediaDeviceInfo) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        <div className="flex justify-end">
          <TestAudio id={selectedDeviceIDs.audioOutput || ''} />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SettingDialog;

const TEST_AUDIO_URL = 'https://100ms.live/test-audio.wav';

export const TestAudio: React.FC<{ id: string }> = ({ id }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (audioRef.current && id) {
      try {
        // @ts-ignore
        audioRef.current.setSinkId(id);
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef.current, id]);
  return (
    <>
      <Button onClick={() => audioRef.current?.play()} disabled={playing} variant="secondary">
        <AudioLevelIcon className="mr-2" /> Play Audio Level Test
      </Button>
      <audio
        ref={audioRef}
        src={TEST_AUDIO_URL}
        onEnded={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      ></audio>
    </>
  );
};

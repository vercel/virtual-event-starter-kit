/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CrossIcon } from '@100mslive/react-icons';
import {
  selectDevices,
  selectIsAllowedToPublish,
  selectLocalMediaSettings
} from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import Select from './select';
import { AudioLevelIcon } from '@100mslive/react-icons';
import Button from './Button';

const SettingDialog: React.FC = ({ children }) => {
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
  const { video: showVideo, audio: showAudio } = useHMSStore(selectIsAllowedToPublish);
  const textClass = `text-gray-200`;
  const wrapperClass = `flex md:flex-row flex-col md:items-center md:justify-between my-6`;
  return (
    <Dialog.Root>
      <Dialog.Overlay className="fixed inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="dialog-content bg-gray-700 md:w-[520px] rounded-2xl w-[90%]">
        <div className="w-full flex items-center justify-between">
          <span className="text-xl font-bold">Settings</span>
          <Dialog.Close asChild>
            <button>
              <CrossIcon />
            </button>
          </Dialog.Close>
        </div>
        {showAudio || showVideo ? (
          <p className="my-0 text-gray-300 text-sm">Control your audio, video source from here</p>
        ) : null}

        {showVideo && videoInput.length > 0 ? (
          <div className={wrapperClass}>
            <span className={textClass}>Video</span>
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
          </div>
        ) : null}
        {showAudio && audioInput.length > 0 ? (
          <div className={wrapperClass}>
            <span className={textClass}>Microphone</span>
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
          </div>
        ) : null}
        {audioOutput.length > 0 ? (
          <div className={wrapperClass}>
            <span className={textClass}>Speaker</span>
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
          </div>
        ) : null}
        <div className="flex justify-end">
          <TestAudio id={selectedDevices.audioOutputDeviceId || ''} />
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
        audioRef.current.setSinkId(id).then(() => console.log('Playing test audio through', id));
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef.current, id]);
  return (
    <>
      <Button
        onClick={() => audioRef.current?.play().catch(console.error)}
        disabled={playing}
        variant="secondary"
      >
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

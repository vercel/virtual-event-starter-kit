import { selectDevices, selectLocalPeerRole, selectRoleChangeRequest } from '@100mslive/react-sdk';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React, { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import s from './index.module.css';
import Select from '../select';
import { isMobileDevice } from '../Join';

import {
  MicOnIcon,
  MicOffIcon,
  VideoOnIcon,
  VideoOffIcon,
  SettingIcon,
  ArrowRightIcon,
  CrossIcon
} from '@100mslive/react-icons';
import InfoIcon from '@components/icons/icon-info';
import router from 'next/router';
import { TestAudio } from '../SettingDialog';
import Avatar from '../Avatar';
import IconButton from '../preview/IconButton';
import Button from '../Button';

const RoleChangeDialog = () => {
  const isMobile = isMobileDevice();
  const requestSenderName = useRef<string | null>(null);
  const [showNote, setShowNote] = useState(false);
  const role = useHMSStore(selectLocalPeerRole)?.name === 'invitee';
  const actions = useHMSActions();
  const request = useHMSStore(selectRoleChangeRequest);
  React.useEffect(() => {
    if (request && isMobile) {
      requestSenderName.current = request.requestedBy?.name || '';
      actions.rejectChangeRole(request);
      setShowNote(true);
    }
  }, [request, isMobile, actions]);
  const roleChange = async (b: boolean) => {
    if (!request) {
      return;
    }
    setShowPreview(false);
    try {
      if (b) {
        await actions.acceptChangeRole(request);
      } else {
        actions.rejectChangeRole(request);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const vI = localStorage.getItem('videoInputDeviceId');
    const aI = localStorage.getItem('audioInputDeviceId');
    const aO = localStorage.getItem('audioOutputDeviceId');
    if (vI) {
      actions.setVideoSettings({ deviceId: vI });
    }
    if (aI) {
      actions.setAudioSettings({ deviceId: aI });
    }
    if (aO) {
      actions.setAudioOutputDevice(aO);
    }
  }, [role, actions]);
  const [showPreview, setShowPreview] = React.useState(false);
  return (
    <>
      {request && request.role.name === 'invitee' ? (
        <Dialog.Root open={request ? true : false}>
          <Dialog.Overlay className={s['pop-overlay']} />
          <Dialog.Content className="dialog-content dialog-animation bg-[#212121]   rounded-xl">
            {showPreview ? (
              <GuestPreview roleChange={roleChange} />
            ) : (
              <>
                <p className={s['head']}>You have been invited to speak</p>
                <p className={s['text']}>
                  {request?.requestedBy?.name} has invited you to speak, would you like to join?
                </p>
                <div className={s['cta-wrapper']}>
                  <button
                    className={s['reject-btn']}
                    onClick={() => {
                      roleChange(false);
                      setShowPreview(false);
                    }}
                  >
                    Reject
                  </button>
                  <button className={s['accept-btn']} onClick={() => setShowPreview(true)}>
                    Yes
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Root>
      ) : null}
      {showNote && isMobile ? (
        <Dialog.Root
          open={showNote}
          onOpenChange={s => {
            requestSenderName.current = '';
            setShowNote(s);
          }}
        >
          <Dialog.Overlay className={s['pop-overlay']} />
          <Dialog.Content className="dialog-content dialog-animation md:w-[300px] w-[95%] bg-[#111]   rounded-xl">
            <h3>{requestSenderName.current} has invited you to speak</h3>
            <p>
              You cannot join the stage on mobile. Please join the session via a desktop/laptop and
              ask the speaker for another invite.{' '}
            </p>
            <Dialog.Close asChild>
              <Button>Got it</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      ) : null}
    </>
  );
};

export default RoleChangeDialog;

const GuestPreview: React.FC<{ roleChange: (b: boolean) => void }> = ({ roleChange }) => {
  const localVI = localStorage.getItem('videoInputDeviceId');
  const localAI = localStorage.getItem('audioInputDeviceId');
  const localAO = localStorage.getItem('audioOutputDeviceId');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const devices = useHMSStore(selectDevices);
  const videoInput = devices['videoInput'] || [];
  const audioInput = devices['audioInput'] || [];
  const audioOutput = devices['audioOutput'] || [];
  const [aI, setAI] = useState(localAI || audioInput[0]?.deviceId);
  const [vI, setVI] = useState(localVI || videoInput[0]?.deviceId);
  const [aO, setAO] = useState(localAO || audioOutput[0]?.deviceId);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: vI } })
      .then(stream => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch(err => {
        console.error('error:', err);
      });
  };
  React.useEffect(() => {
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoOn, vI]);
  const handleAudioInput = (a: string) => {
    localStorage.setItem('audioInputDeviceId', a);
    setAI(a);
  };
  const handleAudioOutput = (a: string) => {
    localStorage.setItem('audioOutputDeviceId', a);
    setAO(a);
  };
  const handleVideoInput = (a: string) => {
    localStorage.setItem('videoInputDeviceId', a);
    setVI(a);
  };
  const textClass = `text-gray-200`;
  const wrapperClass = `flex md:flex-row flex-col md:items-center md:justify-between my-6`;
  return (
    <div className="flex space-x-8">
      <div className="w-[300px] h-[300px] relative flex justify-center items-center bg-gray-700 rounded-lg">
        {isVideoOn ? (
          <video
            className="w-full h-full rounded-lg object-cover mirror"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
        ) : (
          <Avatar size="lg" name={'Guest'} />
        )}
        <div className="absolute z-30 flex bottom-4 space-x-2">
          <IconButton active={!isAudioOn} onClick={() => setIsAudioOn(!isAudioOn)}>
            {isAudioOn ? <MicOnIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton active={!isVideoOn} onClick={() => setIsVideoOn(!isVideoOn)}>
            {isVideoOn ? <VideoOnIcon /> : <VideoOffIcon />}
          </IconButton>
        </div>
        <div className="absolute z-30 bottom-4 right-4">
          <Dialog.Root>
            <Dialog.Overlay
              className="fixed inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            />
            <Dialog.Trigger asChild>
              <IconButton>
                <SettingIcon />
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Content className="dialog-content bg-gray-700 md:w-[520px] rounded-2xl w-[90%]  dialog-animation ">
              <div className="w-full flex items-center justify-between">
                <span className="text-xl font-bold">Settings</span>
                <Dialog.Close asChild>
                  <button>
                    <CrossIcon />
                  </button>
                </Dialog.Close>
              </div>
              <p className="my-0 text-gray-300 text-sm">
                Control your audio, video source from here
              </p>
              {videoInput.length > 0 ? (
                <div className={wrapperClass}>
                  <span className={textClass}>Video</span>
                  <Select onChange={e => handleVideoInput(e.target.value)} value={vI}>
                    {videoInput.map((device: MediaDeviceInfo) => (
                      <option value={device.deviceId} key={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </Select>
                </div>
              ) : null}
              {audioInput.length > 0 ? (
                <div className={wrapperClass}>
                  <span className={textClass}>Microphone</span>
                  <Select onChange={e => handleAudioInput(e.target.value)} value={aI}>
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
                  <Select onChange={e => handleAudioOutput(e.target.value)} value={aO}>
                    {audioOutput.map((device: MediaDeviceInfo) => (
                      <option value={device.deviceId} key={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </Select>
                </div>
              ) : null}
              <div className="flex justify-end">
                <TestAudio id={aO || ''} />
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </div>
      <div className="w-[320px] flex flex-col ml-8 justify-between">
        <div>
          <p className="font-bold text-2xl my-0">Welcome </p>
          <p className="text-gray-400">Preview your video and audio before joining the stage</p>
        </div>
        <form onSubmit={() => {}}>
          <p className="flex items-center space-x-1">
            <InfoIcon /> Note: Your mic is {isAudioOn ? 'on' : 'off'} and video is{' '}
            {isVideoOn ? 'on' : 'off'}
          </p>
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => {
                roleChange(false);
                router.push('/');
              }}
            >
              Go back
            </Button>
            <Button
              onClick={() => {
                roleChange(true);
              }}
            >
              Join Stage <ArrowRightIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

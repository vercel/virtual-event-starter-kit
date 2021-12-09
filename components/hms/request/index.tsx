import { selectDevices, selectRoleChangeRequest } from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React, { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import s from './index.module.css';
import Select from '../select';
import g from './guest-invite.module.css';
import { Avatar, IconButton, Preview } from '@100mslive/react-ui';
import {
  MicOnIcon,
  MicOffIcon,
  VideoOnIcon,
  VideoOffIcon,
  SettingIcon,
  ArrowRightIcon
} from '@100mslive/react-icons';
import InfoIcon from '@components/icons/icon-info';
import router from 'next/router';
import { Dialog as HmsDialog } from '@100mslive/react-ui';

const RoleChangeDialog = () => {
  const actions = useHMSActions();
  const request = useHMSStore(selectRoleChangeRequest);
  const roleChange = (b: boolean) => {
    if (request) {
      try {
        if (b) {
          actions.acceptChangeRole(request);
        } else {
          actions.rejectChangeRole(request);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [showPreview, setShowPreview] = React.useState(false);
  return (
    <>
      {request && request.role.name === 'invitee' ? (
        <Dialog.Root open={request ? true : false}>
          <Dialog.Overlay className={s['pop-overlay']} />
          <Dialog.Content className={s['pop-content']}>
            {showPreview ? (
              <GuestPreview roleChange={roleChange} />
            ) : (
              <>
                <p className={s['head']}>You have been invited to speak</p>
                <p className={s['text']}>
                  {request.requestedBy.name} has invited you to speak, would you like to join?
                </p>
                <div className={s['cta-wrapper']}>
                  <button className={s['reject-btn']} onClick={() => roleChange(false)}>
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
    </>
  );
};

export default RoleChangeDialog;

const GuestPreview: React.FC<{ roleChange: (b: boolean) => void }> = ({ roleChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  React.useEffect(() => {
    getVideo();
  }, [isVideoOn]);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
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
  const devices = useHMSStore(selectDevices);
  return (
    <div className={g['container']}>
      <div className={g['video-container']}>
        <Preview.VideoRoot css={{ width: '290px', height: '290px' }}>
          {isVideoOn ? (
            <Preview.Video local={true} ref={videoRef} autoPlay muted playsInline />
          ) : (
            <Avatar size="lg" style={{ backgroundColor: 'red' }}>
              DB
            </Avatar>
          )}
          <Preview.Controls>
            <IconButton active={isAudioOn} onClick={() => setIsAudioOn(!isAudioOn)}>
              {isAudioOn ? <MicOnIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton active={isVideoOn} onClick={() => setIsVideoOn(!isVideoOn)}>
              {isVideoOn ? <VideoOnIcon /> : <VideoOffIcon />}
            </IconButton>
          </Preview.Controls>
          <Preview.Setting>
            <HmsDialog>
              <HmsDialog.Trigger asChild>
                <IconButton>
                  <SettingIcon />
                </IconButton>
              </HmsDialog.Trigger>
              <HmsDialog.Content title="Settings">
                <div className={g['setting-wrapper']}>
                  <span>Video:</span>
                  <Select>
                    {devices.videoInput.map(a => (
                      <option key={a.deviceId} value={a.deviceId}>
                        {a.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className={g['setting-wrapper']}>
                  <span className={g['setting-label']}>Microphone:</span>
                  <Select>
                    {devices.audioInput.map(a => (
                      <option key={a.deviceId} value={a.deviceId}>
                        {a.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </HmsDialog.Content>
            </HmsDialog>
          </Preview.Setting>
          <Preview.BottomOverlay />
        </Preview.VideoRoot>
      </div>
      <div className={g['wrapper']}>
        <div>
          <p className={g['head-text']}>Welcome </p>
          <p className={g['sub-text']}>Preview your video and audio before joining the stage</p>
        </div>
        <form onSubmit={() => {}}>
          <p className={g['info']}>
            <InfoIcon /> Note: Your mic is {isAudioOn ? 'on' : 'off'} and video is{' '}
            {isVideoOn ? 'on' : 'off'}
          </p>
          <div className={g['btn-wrapper']}>
            <button
              className={`${g['back-btn']} ${g['btn']}`}
              onClick={() => {
                roleChange(false);
                router.push('/');
              }}
            >
              Go back
            </button>
            <button className={g['btn']} type="button" onClick={() => roleChange(true)}>
              Join Stage <ArrowRightIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// const PreviewVideo: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   React.useEffect(() => {
//     getVideo();
//   }, [isVideoOn]);
//   const getVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: {} })
//       .then(stream => {
//         const video = videoRef.current;
//         if (video) {
//           video.srcObject = stream;
//           video.play();
//         }
//       })
//       .catch(err => {
//         console.error('error:', err);
//       });
//   };
//   return (
//     <Preview.VideoRoot css={{ width: '290px', height: '290px' }}>
//       {isVideoOn ? (
//         <Preview.Video local={true} ref={videoRef} autoPlay muted playsInline />
//       ) : (
//         <Avatar size="lg" style={{ backgroundColor: 'red' }}>
//           DB
//         </Avatar>
//       )}
//       <Preview.Controls>
//         <IconButton active={isAudioOn} onClick={() => setIsAudioOn(!isVideoOn)}>
//           {isAudioOn ? <MicOnIcon /> : <MicOffIcon />}
//         </IconButton>
//         <IconButton active={isVideoOn} onClick={() => setIsVideoOn(!isVideoOn)}>
//           {isVideoOn ? <VideoOnIcon /> : <VideoOffIcon />}
//         </IconButton>
//       </Preview.Controls>
//       <Preview.Setting>
//         <IconButton>
//           <SettingIcon />
//         </IconButton>
//       </Preview.Setting>
//       <Preview.BottomOverlay />
//     </Preview.VideoRoot>
//   );
// };

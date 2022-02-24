import React from 'react';
import { Loading } from '../Loading';
import {
  MicOffIcon,
  MicOnIcon,
  SettingIcon,
  VideoOffIcon,
  VideoOnIcon,
  ArrowRightIcon
} from '@100mslive/react-icons';
import {
  HMSPeer,
  useVideo,
  useHMSStore,
  selectLocalPeer,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoDisplayEnabled,
  useAVToggle
} from '@100mslive/react-sdk';
import { AudioLevel } from '../VideoTile';
import InfoIcon from '@components/icons/icon-info';
import { useRouter } from 'next/router';
import { usePreview } from './usePreview';
import SettingDialog from '../SettingDialog';
import Avatar from '../Avatar';
import Button from '../Button';
import IconButton from './IconButton';

export const PreviewScreen: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [name, setName] = React.useState(localStorage.getItem('name') || '');
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoDisplayEnabled);
  const { enableJoin, join } = usePreview({
    token,
    name
  });
  return (
    <div className="bg-[#212121] rounded-lg md:p-8 p-4 flex md:flex-row flex-col">
      <PreviewContainer name={name} />
      <div className="w-[320px] flex flex-col md:ml-8 md:mt-0 mt-4 justify-between">
        <div>
          <p className="font-bold text-2xl my-0">Welcome {name}</p>
          <p className="text-gray-400">Preview your video and audio before joining the stage</p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            join();
          }}
        >
          <input
            value={name}
            type="name"
            autoComplete="name"
            placeholder="Enter your name"
            required
            maxLength={20}
            className="w-full text-md bg-gray-600 rounded-lg placeholder:text-gray-400 h-10 pl-2 focus:outline-none focus:bg-gray-700"
            onChange={e => {
              setName(e.target.value);
              localStorage.setItem('name', e.target.value);
            }}
          />
          <p className="flex items-center">
            <InfoIcon className="mr-2" /> Note: Your mic is {audioEnabled ? 'on' : 'off'} and video
            is {videoEnabled ? 'on' : 'off'}
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary" onClick={() => router.push('/')}>
              Go back
            </Button>
            <Button disabled={!enableJoin} type="submit">
              Join Stage <ArrowRightIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PreviewContainer: React.FC<{ name: string }> = ({ name }) => {
  const localPeer = useHMSStore(selectLocalPeer);
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle();
  return (
    <div className="w-[300px] h-[300px] relative flex justify-center items-center bg-gray-700 rounded-lg">
      {localPeer ? (
        <>
          <PreviewVideo videoTrack={localPeer.videoTrack} />
          <AudioLevel audioTrack={localPeer.audioTrack} />
          <div className="absolute z-30 flex bottom-4 space-x-2">
            <IconButton active={!isLocalAudioEnabled} onClick={toggleAudio}>
              {isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton active={!isLocalVideoEnabled} onClick={toggleVideo}>
              {isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
            </IconButton>
          </div>
          <div className="absolute z-30 bottom-4 right-4">
            <SettingDialog>
              <IconButton>
                <SettingIcon />
              </IconButton>
            </SettingDialog>
          </div>
          {isLocalVideoEnabled ? null : <Avatar size="lg" className="absolute z-10" name={name} />}
        </>
      ) : (
        <Loading size={90} />
      )}
    </div>
  );
};

const PreviewVideo: React.FC<{ videoTrack: HMSPeer['videoTrack'] }> = ({ videoTrack }) => {
  const ref = useVideo(videoTrack || '');
  return (
    <video
      className={`w-full h-full rounded-lg object-cover mirror`}
      autoPlay
      muted
      playsInline
      ref={ref}
    />
  );
};

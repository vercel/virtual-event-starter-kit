import {
  HMSPublishAllowed,
  selectDevices,
  selectIsAllowedToPublish,
  selectLocalMediaSettings
} from '@100mslive/hms-video-store';
import { useCallback } from 'react';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';

export enum DeviceType {
  videoInput = 'videoInput',
  audioInput = 'audioInput',
  audioOutput = 'audioOutput'
}

type DeviceTypeInfo<T> = {
  [key in DeviceType]?: T;
};

export interface useDevicesResult {
  allDevices: DeviceTypeInfo<MediaDeviceInfo[]>;
  selectedDeviceIDs: DeviceTypeInfo<string>;
  updateDevice: ({
    deviceType,
    deviceId
  }: {
    deviceType: DeviceType;
    deviceId: string;
  }) => Promise<void>;
  isAllowedToPublish: HMSPublishAllowed;
}

/**
 * This hook can be used to implement a UI component which allows the user to manually change their
 * audio/video device. It returns the list of all devices as well as the currently selected one. The input
 * devices will be returned based on what the user is allowed to publish, so a audio only user won't get
 * the videInput field.
 *
 * Note:
 * - Browsers give access to the list of devices only if the user has given permission to access them
 * - Changing devices manually work best in combination with remembering the user's selection for the next time, do
 *   pass the rememberDeviceSelection flag at time of join for this to happen.
 *
 * @param handleError error handler for any errors during device change
 */
export const useDevices = (): useDevicesResult => {
  const hmsActions = useHMSActions();
  const allDevices: DeviceTypeInfo<MediaDeviceInfo[]> = useHMSStore(selectDevices);
  const sdkSelectedDevices = useHMSStore(selectLocalMediaSettings);
  const isAllowedToPublish = useHMSStore(selectIsAllowedToPublish);

  const selectedDeviceIDs: DeviceTypeInfo<string> = {
    [DeviceType.audioInput]: sdkSelectedDevices.audioInputDeviceId,
    [DeviceType.audioOutput]: sdkSelectedDevices.audioOutputDeviceId,
    [DeviceType.videoInput]: sdkSelectedDevices.videoInputDeviceId
  };

  if (!isAllowedToPublish.video && allDevices.videoInput === []) {
    delete allDevices[DeviceType.videoInput];
    delete selectedDeviceIDs[DeviceType.videoInput];
  }
  if (!isAllowedToPublish.audio && allDevices.audioInput === []) {
    delete allDevices[DeviceType.audioInput];
    delete selectedDeviceIDs[DeviceType.audioInput];
  }

  const updateDevice = useCallback(
    async ({ deviceType, deviceId }) => {
      try {
        switch (deviceType) {
          case DeviceType.audioInput:
            await hmsActions.setAudioSettings({ deviceId });
            break;
          case DeviceType.videoInput:
            await hmsActions.setVideoSettings({ deviceId });
            break;
          case DeviceType.audioOutput:
            hmsActions.setAudioOutputDevice(deviceId);
            break;
        }
      } catch (err) {}
    },
    [hmsActions]
  );

  return {
    allDevices,
    selectedDeviceIDs,
    updateDevice,
    isAllowedToPublish
  };
};

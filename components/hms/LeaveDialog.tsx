import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HangUpIcon } from '@100mslive/react-icons';
import ControlButton from './ControlButton';
import Button from './Button';
import { useHMSActions } from '@100mslive/react-sdk';
import { useRouter } from 'next/router';

const LeaveDialog = () => {
  const actions = useHMSActions();
  const router = useRouter();
  const leave = () => {
    try {
      actions.leave().then(() => router.push('/'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Overlay className="fixed inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <Dialog.Trigger asChild>
        <ControlButton text="Leave" className="leave" onClick={() => {}}>
          <HangUpIcon />
        </ControlButton>
      </Dialog.Trigger>
      <Dialog.Content className="dialog-content bg-gray-700 w-96 rounded-lg dialog-animation">
        <h3>Leave Stage?</h3>
        <p className="text-sm text-gray-200 my-0">Are you sure you want to leave the stage?</p>
        <div className="flex space-x-4 mt-6">
          <Button onClick={leave} variant="danger" className="w-1/2">
            Leave
          </Button>
          <Dialog.Close asChild>
            <Button variant="secondary" className="w-1/2">
              Cancel
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default LeaveDialog;

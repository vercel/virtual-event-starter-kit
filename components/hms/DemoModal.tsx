import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from './Button';

const DemoModal = () => {
  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Overlay className="fixed inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <Dialog.Content className="dialog-content bg-gray-700 md:w-[400px] w-[95%] rounded-lg dialog-animation">
        <h3 className="mb-4">Heads Up</h3>
        <p className="text-sm text-gray-200 my-0">
          Since this is a public demo, you might encounter other people on the stage who can hear /
          see you in case your audio/video is enabled. We recommend you to use the participants tab
          to check if there are other people on the call.
        </p>

        <Dialog.Close asChild>
          <Button className="mt-4 w-[100px]">Got it</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DemoModal;

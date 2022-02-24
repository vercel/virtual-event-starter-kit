import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CrossIcon, PersonIcon } from '@100mslive/react-icons';
import DemoModal from '../demo-modal';
import InviteIcon from '@components/icons/icon-invite';
import { useHMSStore, selectLocalPeerRole } from '@100mslive/react-sdk';
import { useRouter } from 'next/router';
import Button from '../Button';

const RoomCta = () => {
  const role = useHMSStore(selectLocalPeerRole);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const copy = () => {
    let stageId = `a`;
    if (router.isReady) {
      stageId = router.query.slug as string;
    }
    navigator.clipboard.writeText(
      `${window.location.host}/stage/${stageId}?role=${role?.name || 'viewer'}`
    );
    if (!copied) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        {copied ? (
          <p className="absolute top-12 left-0 flex bg-gray-600 justify-center  rounded-lg w-48 p-2">
            Copied to clipboard!
          </p>
        ) : null}
        <Button variant="secondary" className="h-[40px]" onClick={() => copy()}>
          <InviteIcon className="mr-2" />
          Invite
        </Button>
      </div>

      <ChangeRoleDialog>
        <Button className='className="h-[40px]"' variant="secondary">
          <PersonIcon height={20} className="mr-2" />
          Change Role
        </Button>
      </ChangeRoleDialog>
    </div>
  );
};

export default RoomCta;

export const ChangeRoleDialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Dialog.Root>
      <Dialog.Overlay className="fixed inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="dialog-content md:w-[700px] w-[95%] md:h-[700px] h-[600px] overflow-y-scroll bg-gray-800 text-center rounded-lg dialog-animation">
        <Dialog.Close asChild className="w-full flex justify-end">
          <button>
            <CrossIcon />
          </button>
        </Dialog.Close>
        <DemoModal />
      </Dialog.Content>
    </Dialog.Root>
  );
};

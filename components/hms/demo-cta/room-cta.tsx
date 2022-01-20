/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import s from './index.module.css';
import * as Dialog from '@radix-ui/react-dialog';
import { CrossIcon, PersonIcon } from '@100mslive/react-icons';
import DemoModal from '../demo-modal';
import InviteIcon from '@components/icons/icon-invite';
import { useHMSStore } from '@100mslive/react-sdk';
import { selectLocalPeerRole } from '@100mslive/hms-video-store';
import { useRouter } from 'next/router';

const RoomCta = () => {
  const role = useHMSStore(selectLocalPeerRole) || 'viewer';
  const [cp, setCp] = React.useState(false);
  const router = useRouter();
  const copy = () => {
    let stageId = `a`;
    if (router.isReady) {
      stageId = router.query.slug as string;
    }
    navigator.clipboard.writeText(
      // @ts-ignore
      `${window.location.host}/stage/${stageId}?role=${role.name || 'stage'}`
    );
    if (!cp) {
      setCp(true);
      setTimeout(() => {
        setCp(false);
      }, 3000);
    }
  };
  return (
    <div className={s['cta-wrapper']}>
      <div className="relative">
        {cp ? (
          <p className="absolute top-12 left-0 flex bg-gray-600 justify-center  rounded-lg w-48 p-2">
            Copied to clipboard!
          </p>
        ) : null}
        <button onClick={() => copy()} className={s['cta-role']}>
          <InviteIcon />
          Invite
        </button>
      </div>

      <ChangeRoleDialog>
        <button className={s['cta-role']}>
          <PersonIcon />
          Change Role
        </button>
      </ChangeRoleDialog>
    </div>
  );
};

export default RoomCta;

export const ChangeRoleDialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Dialog.Root>
      <Dialog.Overlay className={s['overlay']} />
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className={s['content']}>
        <Dialog.Close asChild className={s['close-btn']}>
          <button>
            <CrossIcon />
          </button>
        </Dialog.Close>
        <DemoModal />
      </Dialog.Content>
    </Dialog.Root>
  );
};

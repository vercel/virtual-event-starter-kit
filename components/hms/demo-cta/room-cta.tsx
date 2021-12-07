/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import s from './index.module.css';
import * as Dialog from '@radix-ui/react-dialog';
import { CrossIcon, PersonIcon } from '@100mslive/react-icons';
import DemoModal from '../demo-modal';
import InviteIcon from '@components/icons/icon-invite';
import { useHMSStore } from '@100mslive/react-sdk';
import { selectLocalPeerRole } from '@100mslive/hms-video-store';

const RoomCta = () => {
  const role = useHMSStore(selectLocalPeerRole) || 'viewer';
  return (
    <div className={s['cta-wrapper']}>
      <button
        onClick={() =>
          // @ts-ignore
          navigator.clipboard.writeText(`${window.location.host}/stage/a?role=${role.name}`)
        }
        className={s['cta-role']}
      >
        <InviteIcon />
        Invite
      </button>
      <Dialog.Root>
        <Dialog.Overlay className={s['overlay']} />
        <Dialog.Trigger asChild>
          <button className={s['cta-role']}>
            <PersonIcon />
            Change Role
          </button>
        </Dialog.Trigger>
        <Dialog.Content className={s['content']}>
          <Dialog.Close asChild className={s['close-btn']}>
            <button>
              <CrossIcon />
            </button>
          </Dialog.Close>
          <DemoModal />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default RoomCta;

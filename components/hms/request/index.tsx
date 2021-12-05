import { selectRoleChangeRequest } from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import s from './index.module.css';

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
  return (
    <>
      {request && request.role.name === 'invitee' ? (
        <Dialog.Root open={request ? true : false}>
          <Dialog.Overlay className={s['pop-overlay']} />
          <Dialog.Content className={s['pop-content']}>
            <p className={s['head']}>You have been invited to speak</p>
            <p className={s['text']}>
              {request.requestedBy.name} has invited you to speak, would you like to join?
            </p>
            <div className={s['cta-wrapper']}>
              <button className={s['reject-btn']} onClick={() => roleChange(false)}>
                Reject
              </button>
              <button className={s['accept-btn']} onClick={() => roleChange(true)}>
                Yes
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      ) : null}
    </>
  );
};

export default RoleChangeDialog;

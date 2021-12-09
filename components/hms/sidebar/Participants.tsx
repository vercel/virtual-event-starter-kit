import { selectLocalPeer, selectPeersByRole } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import s from './participant.module.css';
import React from 'react';
import Avatar from '../avatar';
import Dropdown from './dropdown';

const Participants = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const backstagePeers = useHMSStore(selectPeersByRole('backstage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const viewerPeers = useHMSStore(selectPeersByRole('viewer'));
  const localPeer = useHMSStore(selectLocalPeer);
  return (
    <div className={s['part-ctx']}>
      {backstagePeers.length > 0 && localPeer.roleName === 'backstage' ? (
        <>
          <div>
            <p className={s['part-role']}>Moderator ({backstagePeers.length})</p>
            {backstagePeers.map(p => (
              <div key={p.id} className={s['part-box']}>
                <Avatar name={p.name} />
                <div className={s['part-name']}>
                  {p.name} {p.id !== localPeer.id ? null : '(You)'}{' '}
                </div>
                {p.id !== localPeer.id ? (
                  <Dropdown role={p.roleName || 'viewer'} id={p.id} />
                ) : null}
              </div>
            ))}
          </div>
          <div className={s['divider']} />
        </>
      ) : null}
      {stagePeers.length > 0 ? (
        <div>
          <p className={s['part-role']}>Speaker ({stagePeers.length})</p>
          {stagePeers.map(p => (
            <div key={p.id} className={s['part-box']}>
              <Avatar name={p.name} />
              <div className={s['part-name']}>
                {p.name} {p.id !== localPeer.id ? null : '(You)'}
              </div>
              {p.id !== localPeer.id ? <Dropdown role={p.roleName || 'viewer'} id={p.id} /> : null}
            </div>
          ))}
          <div className={s['divider']} />
        </div>
      ) : null}

      {inviteePeers.length > 0 ? (
        <div>
          <p className={s['part-role']}>Guest Speakers ({inviteePeers.length})</p>
          {inviteePeers.map(p => (
            <div key={p.id} className={s['part-box']}>
              <Avatar name={p.name} />
              <div className={s['part-name']}>
                {p.name} {p.id !== localPeer.id ? null : '(You)'}
              </div>
              <Dropdown id={p.id} role={p.roleName || 'viewer'} />
            </div>
          ))}
        </div>
      ) : null}

      {viewerPeers.length > 0 ? (
        <div>
          <p className={s['part-role']}>Viewers ({viewerPeers.length})</p>
          {viewerPeers.map(p => (
            <div key={p.id} className={s['part-box']}>
              <Avatar name={p.name} />
              <div className={s['part-name']}>{p.name} </div>
              <Dropdown role={p.roleName || 'viewer'} id={p.id} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Participants;

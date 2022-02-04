import { useHMSStore, selectLocalPeer, selectPeersByRole } from '@100mslive/react-sdk';
import React from 'react';
import Avatar from '../Avatar';
import Dropdown from './Dropdown';

const Participants = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const backstagePeers = useHMSStore(selectPeersByRole('backstage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const viewerPeers = useHMSStore(selectPeersByRole('viewer'));
  const localPeer = useHMSStore(selectLocalPeer);
  return (
    <div className="h-full p-4 overflow-y-scroll text-foreground">
      {backstagePeers.length > 0 && localPeer.roleName === 'backstage' ? (
        <>
          <div>
            <p>Moderator ({backstagePeers.length})</p>
            {backstagePeers.map(p => (
              <div key={p.id} className="flex items-center my-4">
                <Avatar name={p.name} />
                <div className="grow ml-4">
                  {p.name} {p.id !== localPeer.id ? null : '(You)'}{' '}
                </div>
                {p.id !== localPeer.id ? (
                  <Dropdown role={p.roleName || 'viewer'} id={p.id} />
                ) : null}
              </div>
            ))}
          </div>
          <Divider />
        </>
      ) : null}
      {stagePeers.length > 0 ? (
        <div>
          <p className="flex items-center">Speaker ({stagePeers.length})</p>
          {stagePeers.map(p => (
            <div key={p.id} className="flex items-center my-4">
              <Avatar name={p.name} />
              <div className="grow ml-4">
                {p.name} {p.id !== localPeer.id ? null : '(You)'}
              </div>
              {p.id !== localPeer.id ? <Dropdown role={p.roleName || 'viewer'} id={p.id} /> : null}
            </div>
          ))}
          <Divider />
        </div>
      ) : null}

      {inviteePeers.length > 0 ? (
        <div>
          <p className="flex items-center">Guest Speakers ({inviteePeers.length})</p>
          {inviteePeers.map(p => (
            <div key={p.id} className="flex items-center my-4">
              <Avatar name={p.name} />
              <div className="grow ml-4">
                {p.name} {p.id !== localPeer.id ? null : '(You)'}
              </div>
              {localPeer.roleName === 'stage' || localPeer.roleName === 'backstage' ? (
                <Dropdown id={p.id} role={p.roleName || 'viewer'} />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {viewerPeers.length > 0 ? (
        <div>
          <p className="flex items-center">Viewers ({viewerPeers.length})</p>
          {viewerPeers.map(p => (
            <div key={p.id} className="flex items-center my-4">
              <Avatar name={p.name} />
              <div className="grow ml-4">{p.name} </div>
              <Dropdown role={p.roleName || 'viewer'} id={p.id} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Participants;

const Divider = () => <div className="my-8 h-[1px] bg-gray-700" />;

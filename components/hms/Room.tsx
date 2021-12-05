import React from 'react';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { selectIsConnectedToRoom } from '@100mslive/hms-video-store';
import { getToken } from './getToken';
import Join from './Join';
import Live from './Live';

interface Props {
  stagePeers: string[];
  backstagePeers: string[];
  roomId: string;
}

/**
 * Entry components for 100ms
 */
const Room = ({ roomId, stagePeers, backstagePeers }: Props) => {
  const [token, setToken] = React.useState('');
  const actions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  React.useEffect(() => {
    const email = localStorage.getItem('email') || 'test@gmail.com';
    const getRole = () => {
      if (stagePeers.includes(email)) {
        return 'stage';
      } else if (backstagePeers.includes(email)) {
        return 'backstage';
      } else {
        return 'viewer';
      }
    };
    const role = getRole();
    console.log('Role: ', role);
    getToken(role || 'viewer', roomId)
      .then(t => setToken(t))
      .catch(e => console.error(e));
  }, [roomId, backstagePeers, stagePeers]);
  React.useEffect(() => {
    window.onunload = () => {
      actions.leave();
    };
  }, [actions]);
  return <>{isConnected ? <Live /> : <Join token={token} />}</>;
};

export default Room;

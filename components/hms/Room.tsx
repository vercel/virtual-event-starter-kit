import React from 'react';
import { useHMSActions, useHMSStore, selectIsConnectedToRoom } from '@100mslive/react-sdk';
import { getToken } from './lib/getToken';
import Join from './Join';
import Live from './Live';
import { useRouter } from 'next/router';

interface Props {
  stagePeers: string[];
  backstagePeers: string[];
  roomId: string;
}

/**
 * Entry components for 100ms
 */
const Room = ({ roomId, stagePeers, backstagePeers }: Props) => {
  const router = useRouter();
  const [token, setToken] = React.useState('');
  const actions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  React.useEffect(() => {
    if (!router.isReady) return;
    const role = router.query.role ? (router.query.role as string) : 'viewer';
    console.log(role);
    getToken(role, roomId)
      .then(t => setToken(t))
      .catch(e => console.error(e));
  }, [roomId, backstagePeers, stagePeers, router.query, router.isReady]);
  React.useEffect(() => {
    window.onunload = () => {
      actions.leave();
    };
  }, [actions]);
  return (
    <>
      {isConnected ? (
        <Live />
      ) : (
        <Join role={router.query.role ? (router.query.role as string) : 'viewer'} token={token} />
      )}
    </>
  );
};

export default Room;

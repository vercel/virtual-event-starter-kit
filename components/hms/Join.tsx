import React from 'react';
import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from '../conf-entry.module.css';
import { PreviewScreen } from './preview';
import { useHMSActions } from '@100mslive/react-sdk';

interface Props {
  token: string;
  role: string;
}

const Join: React.FC<Props> = ({ token, role }) => {
  return (
    <div className={cn(styles.container, styleUtils.appear, styleUtils['appear-first'])}>
      {token ? (
        <> {role === 'viewer' ? <ViewersJoin token={token} /> : <PreviewScreen token={token} />}</>
      ) : null}
    </div>
  );
};

export default Join;

const ViewersJoin: React.FC<{ token: string }> = ({ token }) => {
  const [name, setName] = React.useState('');
  const actions = useHMSActions();
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    actions.join({
      userName: name || 'David',
      authToken: token
      // initEndpoint: 'https://qa-init.100ms.live/init'
    });
  };
  return (
    <div className="text-center">
      <h1>Join the conference.</h1>
      <p className="my-0 text-gray-300 text-sm">
        An interactive online experience by the community, free for everyone.
      </p>
      <form onSubmit={e => joinRoom(e)} className="mt-12 md:space-x-4">
        <input
          maxLength={20}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="p-4 w-80 text-md bg-gray-600 rounded-lg placeholder:text-gray-400"
          placeholder="Enter your name to join the event"
          type="text"
        />
        <button
          type="submit"
          className="bg-brand-300 hover:bg-brand-200 px-4 py-4 rounded-lg cursor-pointer md:mt-0 mt-4 w-80 md:w-20"
        >
          Join
        </button>
      </form>
    </div>
  );
};

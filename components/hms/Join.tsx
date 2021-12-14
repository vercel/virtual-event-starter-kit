import React from 'react';
import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from '../conf-entry.module.css';
import { PreviewScreen } from './preview';
import s from './join.module.css';
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
    });
  };
  return (
    <div className={s['viewer-container']}>
      <p className={s['header']}>Join the conference.</p>
      <p className={s['text']}>
        An interactive online experience by the community, free for everyone.
      </p>
      <form onSubmit={e => joinRoom(e)} className={s['wrapper']}>
        <input
          maxLength={20}
          value={name}
          onChange={e => setName(e.target.value)}
          className={s['input']}
          type="text"
          required
          placeholder="Enter your name to join the event"
        />
        <button type="submit" className={s['btn']}>
          Join
        </button>
      </form>
    </div>
  );
};

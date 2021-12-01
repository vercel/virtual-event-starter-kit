import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import {
  selectHMSMessages,
  selectLocalPeer,
  selectLocalPeerID,
  selectLocalPeerRole
} from '@100mslive/hms-video-store';
import React, { FormEvent } from 'react';
import s from './chat.module.css';
import Avatar from '../avatar';
import Dropdown from './dropdown';

const Chat = () => {
  const [msg, setMsg] = React.useState('');
  const actions = useHMSActions();
  const msgs = useHMSStore(selectHMSMessages);
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    actions.sendBroadcastMessage(msg);
    setMsg('');
  };
  React.useEffect(() => {
    const el = document.getElementById('chat-feed');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [msgs]);
  const localPeer = useHMSStore(selectLocalPeer);
  return (
    <>
      <div id="chat-feed" className={s['chats-ctx']}>
        {msgs.map(m => (
          <div key={m.id} className={s['chat-box']}>
            <Avatar name={m.sender === localPeer.id ? localPeer.name : m.senderName} />
            <div className={s['chat-meta']}>
              <div className={s['chat-name']}>
                {m.sender === localPeer.id ? `${localPeer.name} (You)` : m.senderName}{' '}
                <span className={s['chat-time']}>
                  {m.time.getHours()}:{m.time.getMinutes()}
                </span>
              </div>
              <div className={s['chat-text']}>{m.message}</div>
            </div>
            {localPeer.roleName === 'stage' || localPeer.roleName === 'backstage' ? (
              <>
                {localPeer.id !== m.sender ? (
                  <Dropdown role={m.senderRole || 'viewer'} id={m.sender} />
                ) : null}
              </>
            ) : null}
          </div>
        ))}
      </div>
      <form className={s['chat-ctx']} onSubmit={sendMessage}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          type="text"
          placeholder="Send a message..."
        />
      </form>
    </>
  );
};

export default Chat;

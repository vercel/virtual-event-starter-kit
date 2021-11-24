import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { selectHMSMessages, selectLocalPeerRole } from '@100mslive/hms-video-store';
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
  const role = useHMSStore(selectLocalPeerRole);
  React.useEffect(() => {
    const el = document.getElementById('chat-feed');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [msgs]);
  return (
    <>
      <div id="chat-feed" className={s['chats-ctx']}>
        {msgs.map(m => (
          <div key={m.id} className={s['chat-box']}>
            <Avatar name={m.senderName} />
            <div className={s['chat-meta']}>
              <div className={s['chat-name']}>
                {m.senderName} <span className={s['chat-time']}>12:30</span>
              </div>
              <div className={s['chat-text']}>{m.message}</div>
            </div>
            {role?.name === 'stage' || role?.name === 'backstage' ? (
              <Dropdown role={m.senderRole || 'viewer'} id={m.sender} />
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
      <div></div>
    </>
  );
};

export default Chat;

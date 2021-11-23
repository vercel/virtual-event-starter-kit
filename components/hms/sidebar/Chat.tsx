import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { selectHMSMessages, selectLocalPeerRole } from '@100mslive/hms-video-store';
import React, { FormEvent } from 'react';
import s from './chat.module.css';
import Avatar from '../avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import HorizontalMenuIcon from '@components/icons/icon-menu-hor';

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
  return (
    <>
      <div className={s['chats-ctx']}>
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
              <Dropdown id={m.sender} />
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

const Dropdown: React.FC<{ id: string }> = ({ id }) => {
  const actions = useHMSActions();
  const changeRole = () => {
    actions.changeRole(id, 'invitee', true);
  };
  const removePeer = () => {
    actions.removePeer(id, 'Bye');
  };
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={s['menu-btn']}>
            <HorizontalMenuIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={s['menu-content']}>
          <DropdownMenu.Item asChild>
            <button className={s['menu-item']} onClick={changeRole}>
              <BringToStageIcon /> Bring user to stage
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button className={s['menu-item']} onClick={removePeer}>
              <RemoveUserIcon /> Remove user
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

const BringToStageIcon = () => (
  <svg
    width={20}
    style={{ marginRight: '10px' }}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.889 3.333v12.445a.889.889 0 11-1.778 0M5.111 15.778v-8.89"
      stroke="#fff"
      strokeWidth={1.067}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.111 15.778a.889.889 0 11-1.778 0V4.222a.889.889 0 01.89-.889h11.555a.889.889 0 01.889.89v11.555a.889.889 0 11-1.778 0v-.89M6.889 15.333H9.11"
      stroke="#fff"
      strokeWidth={1.067}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13.111v-1.333a2.222 2.222 0 114.444 0v1.333h-.888l-.445 3.556h-1.778l-.444-3.556H10zM10.444 6.889a1.778 1.778 0 103.556 0 1.778 1.778 0 00-3.556 0v0z"
      stroke="#fff"
      strokeWidth={1.067}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RemoveUserIcon = () => (
  <svg
    style={{ marginRight: '10px' }}
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 13.602c0-1.194.479-2.34 1.33-3.184A4.564 4.564 0 017.044 9.1c.613.001 1.22.123 1.784.36M7.043 8.106c1.535 0 2.78-1.233 2.78-2.755 0-1.521-1.245-2.754-2.78-2.754-1.535 0-2.78 1.233-2.78 2.754 0 1.522 1.245 2.755 2.78 2.755zM9.244 17.597a3.067 3.067 0 01-2.068-.935 3.013 3.013 0 01-.844-2.09c0-.779.302-1.527.844-2.09a3.068 3.068 0 012.068-.935h5.344a3.068 3.068 0 012.067.935c.542.563.845 1.311.845 2.09 0 .778-.303 1.527-.845 2.09a3.068 3.068 0 01-2.067.935H9.244zM10.886 13.595l2.02 2M12.905 13.595l-2.019 2"
      stroke="#fff"
      strokeWidth={1.211}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

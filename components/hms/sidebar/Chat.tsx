import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { selectHMSMessages, selectLocalPeer } from '@100mslive/react-sdk';
import React, { FormEvent } from 'react';
import Avatar from '../Avatar';
import Dropdown from './Dropdown';
import { ChatIcon } from '@100mslive/react-icons';

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
      <div id="chat-feed" className="h-full overflow-y-scroll p-4">
        {msgs.length > 0 ? (
          msgs.map(m => (
            <div key={m.id} className="flex items-start w-full mb-5 relative">
              <Avatar name={m.sender === localPeer.id ? localPeer.name : m.senderName} />
              <div className="flex flex-col flex-grow">
                <div className="w-full flex  items-center font-medium pl-2">
                  <span className="text-foreground">
                    {m.sender === localPeer.id ? localPeer.name : m.senderName}
                  </span>
                  {m.senderRole === 'stage' || m.senderRole === 'backstage' ? (
                    <Badge
                      isLocal={m.sender === localPeer.id}
                      isMod={m.senderRole === 'backstage'}
                    />
                  ) : null}
                  <span className="text-gray-400 text-xxs ml-1">
                    {m.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="pl-2 text-gray-200 break-words w-[220px] mt-1">{m.message}</div>
              </div>
              {localPeer.roleName === 'stage' || localPeer.roleName === 'backstage' ? (
                <div className="absolute top-0 right-0">
                  {localPeer.id !== m.sender ? (
                    <Dropdown role={m.senderRole || 'viewer'} id={m.sender} />
                  ) : null}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div className="h-full flex justify-center items-center">
            <div className="w-full flex flex-col items-center text-center">
              <div className="md:w-[80px] md:h-[80px] w-[50px] h-[50px] bg-gray-700 rounded-full text-foreground flex justify-center items-center">
                <ChatIcon className="md:w-[50px] md:h-[50px] h-[30px] w-[30px]" />
              </div>
              <p>
                Welcome to the Webinar. You can engage with the speaker and other participants
                through the chat below.
              </p>
            </div>
          </div>
        )}
      </div>
      <form
        className="h-[80px] px-4 flex items-center"
        onSubmit={sendMessage}
        style={{ borderTop: '1px solid var(--accents-7)' }}
      >
        <input
          className="w-full bg-transparent focus:outline-none"
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

const Badge: React.FC<{ isMod?: boolean; isLocal: boolean }> = ({ isMod = false, isLocal }) => {
  return (
    <div
      style={{ border: `${isMod ? '1px solid transparent' : '1px solid #2f6eeb'}` }}
      className={`inline-flex items-center text-[10px] p-0.5 mx-1 rounded bg-gray-700 text-foreground`}
    >
      {isLocal ? (
        <>
          You <span className="w-1 h-1 mx-1 rounded-full bg-foreground" />
        </>
      ) : null}{' '}
      {isMod ? 'Moderator' : 'Speaker'}
    </div>
  );
};

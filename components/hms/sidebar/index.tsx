import React from 'react';
import Chat from './Chat';
import s from './index.module.css';

const Sidebar = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <div className={s['container']}>
      <div className={s['tabs']}>
        <button
          onClick={() => setTab(0)}
          className={`${s['tab-btn']} ${s['tab-left']} ${tab === 0 ? s['tab-active'] : ''}`}
        >
          Chat
        </button>
        <button
          onClick={() => setTab(1)}
          className={`${s['tab-btn']} ${s['tab-right']} ${tab === 1 ? s['tab-active'] : ''}`}
        >
          Participants
        </button>
      </div>
      {tab === 0 ? <Chat /> : null}
    </div>
  );
};

export default Sidebar;

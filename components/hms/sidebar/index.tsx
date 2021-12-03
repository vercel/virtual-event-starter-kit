import { selectLocalPeerRole } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import Chat from './Chat';
import s from './index.module.css';
import Participants from './Participants';
import ScheduleSidebar from '@components/schedule-sidebar-individual';
import { Stage } from '@lib/types';

type Props = {
  allStages: Stage[];
};

const Sidebar = ({ allStages }: Props) => {
  const [tab, setTab] = React.useState(0);
  const localRole = useHMSStore(selectLocalPeerRole);
  return (
    <div className={s['container']}>
      <div className={s['tabs']}>
        <button
          onClick={() => setTab(0)}
          className={`${s['tab-btn']} ${s['tab-left']} ${tab === 0 ? s['tab-active'] : ''}`}
        >
          Chat
        </button>
        {localRole?.name === 'stage' || localRole?.name === 'backstage' ? (
          <button
            onClick={() => setTab(1)}
            className={`${s['tab-btn']} ${s['tab-right']} ${tab === 1 ? s['tab-active'] : ''}`}
          >
            Participants
          </button>
        ) : (
          <button
            onClick={() => setTab(2)}
            className={`${s['tab-btn']} ${s['tab-right']} ${tab === 2 ? s['tab-active'] : ''}`}
          >
            Schedule
          </button>
        )}
      </div>
      {tab === 0 ? <Chat /> : null}
      {tab === 1 ? <Participants /> : null}
      {tab === 2 ? <ScheduleSidebar allStages={allStages} /> : null}
    </div>
  );
};

export default Sidebar;

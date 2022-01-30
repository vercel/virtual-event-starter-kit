import { selectLocalPeerRole } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import Chat from './Chat';
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
    <div className="sidebar-container">
      <div className="w-full px-4">
        <button
          onClick={() => setTab(0)}
          className={`w-1/2 text-gray-300 h-[35px] text-[14px] border-solid border border-gray-700 rounded-l-md ${
            tab === 0 ? 'bg-gray-700 font-bold text-foreground' : 'bg-transparent'
          }`}
        >
          Chat
        </button>
        {localRole?.name === 'stage' || localRole?.name === 'backstage' ? (
          <button
            onClick={() => setTab(1)}
            className={`w-1/2  text-gray-300 h-[35px] text-[14px] border-solid border border-gray-700 rounded-r-md ${
              tab === 1 ? 'bg-gray-700 font-bold text-foreground' : 'bg-transparent'
            }`}
          >
            Participants
          </button>
        ) : (
          <button
            onClick={() => setTab(2)}
            className={`w-1/2  text-gray-300 h-[35px] text-[14px] border-solid border border-gray-700 rounded-r-md ${
              tab === 2 ? 'bg-gray-700 font-bold text-foreground' : 'bg-transparent'
            }`}
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

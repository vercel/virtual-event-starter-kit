/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import useSWR from 'swr';
import cn from 'classnames';
import { Stage } from '@lib/types';
import useLoginStatus from '@lib/hooks/use-login-status';
import styles from './stage-container.module.css';
import styleUtils from './utils.module.css';
import ConfEntry from './conf-entry';
import Room from './hms/Room';
import Sidebar from './hms/sidebar';
import { useHMSStore, selectIsConnectedToRoom } from '@100mslive/react-sdk';
import ScheduleSidebar from './schedule-sidebar';

type Props = {
  stage: Stage;
  allStages: Stage[];
};

export default function StageContainer({ stage, allStages }: Props) {
  const response = useSWR('/api/stages', {
    initialData: allStages,
    refreshInterval: 5000
  });
  const updatedStages = response.data || [];
  const updatedStage = updatedStages.find((s: Stage) => s.slug === stage.slug) || stage;
  const { loginStatus, mutate } = useLoginStatus();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  return (
    <div className={styles.container}>
      <div className={`${styles.streamContainer} ${isConnected ? '' : styles.streamYt}`}>
        {loginStatus === 'loggedIn' ? (
          !stage.isLive ? (
            <div className={cn(styles.stream, styleUtils.appear, styleUtils['appear-first'])}>
              <iframe
                allow="autoplay; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                src={`${updatedStage.stream}?autoplay=1&mute=1`}
                title={updatedStage.name}
                width="100%"
              />
              <div className={cn(styles.bottom, styleUtils.appear, styleUtils['appear-second'])}>
                <div className={styles.messageContainer}>
                  <h2 className={styles.stageName}>{stage.name}</h2>
                </div>
                <a
                  href={updatedStage.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.button}
                >
                  <span>Join the chat on</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 245 240"
                  >
                    <path
                      fill="white"
                      d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zm36.5 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"
                    />
                    <path
                      fill="white"
                      d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <Room
              backstagePeers={stage.backstagePeers}
              stagePeers={stage.stagePeers}
              roomId={stage.roomId}
            />
          )
        ) : loginStatus === 'loading' ? null : (
          <ConfEntry onRegister={() => mutate()} />
        )}
      </div>
      {stage.isLive ? (
        isConnected ? (
          <Sidebar allStages={allStages} />
        ) : null
      ) : (
        <ScheduleSidebar allStages={updatedStages} />
      )}
    </div>
  );
}

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

import styles from './schedule.module.css';
import TalkCard from './talk-card';

export default function Schedule({ events }) {
  return (
    <div className={styles.container}>
      <div className={styles['row-wrapper']}>
        <div className={styles.row}>
          <div className={styles.talks}>
            {events.map((event) => (
              <div key={event.startTime}>
                <TalkCard key={event.title} talk={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stage } from '@lib/types';
import styles from './schedule-sidebar.module.css';
import Select from './select';
import TalkCard from './talk-card';
import { SHORT_DATE } from '@lib/constants';

type Props = {
  allStages: Stage[];
};

export default function ScheduleSidebar({ allStages }: Props) {
  const router = useRouter();
  const [currentStageSlug, setCurrentStageSlug] = useState(router.query.slug);
  const currentStage = allStages.find((s: Stage) => s.slug === currentStageSlug);

  useEffect(() => {
    setCurrentStageSlug(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Schedule</h3>
      <p>{SHORT_DATE}</p>
      <Select
        aria-label="Select a stage"
        value={currentStageSlug}
        onChange={e => {
          const slug = e.target.value;
          setCurrentStageSlug(slug);
          router.push(`/stage/${slug}`);
        }}
      >
        {allStages.map(stage => (
          <option key={stage.slug} value={stage.slug}>
            {stage.name}
          </option>
        ))}
      </Select>
      <div className={styles.talks}>
        {currentStage?.schedule.map(talk => (
          <TalkCard key={talk.title} talk={talk} showTime />
        ))}
      </div>
    </div>
  );
}

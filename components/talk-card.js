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

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { parseISO, format, isBefore, isAfter } from "date-fns";

import styles from "./talk-card.module.css";

const formatDate = (date) => {
  // https://github.com/date-fns/date-fns/issues/946
  return format(parseISO(date), "h:mmaaaaa'm'");
};

export default function TalkCard({ talk }) {
  const [isTalkLive, setIsTalkLive] = useState(false);
  const [startAndEndTime, setStartAndEndTime] = useState("");

  useEffect(() => {
    const now = Date.now();
    setIsTalkLive(isAfter(now, parseISO(talk.startTime)) && isBefore(now, parseISO(talk.endTime)));
    setStartAndEndTime(`${formatDate(talk.startTime)} – ${formatDate(talk.endTime)}`);
  }, []);

  return (
    <div key={talk.title} className={styles.talk}>
      {<p className={styles.time}>{startAndEndTime || <>&nbsp;</>}</p>}
      {/* TODO: Give Correct Link */}
      <Link href='/speakers'>
        <a className={cn(styles.card, { [styles["is-live"]]: isTalkLive })}>
          <div className={styles["card-body"]}>
            <h4 title={talk.title} className={styles.title}>
              {talk.title}
            </h4>
            {talk.speaker != null && (
              <div className={styles.speaker}>
                <div className={styles["avatar-group"]}>
                  <div key={talk.speaker.name} className={styles["avatar-wrapper"]}>
                    <Image
                      loading='lazy'
                      alt={talk.speaker.name}
                      className={styles.avatar}
                      src={talk.speaker.image.url}
                      title={talk.speaker.name}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <h5 className={styles.name}>
                  {/* {talk.speaker.length === 1 ? talk.speaker[0].name : `${talk.speaker.length} speakers`} */}
                  {talk.speaker.name}
                </h5>
              </div>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}

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

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import styles from './innovator-section.module.css';
import styleUtils from './utils.module.css';

export default function InnovatorSection({ innovator }) {
  return (
    <>
      <Link href="/expo">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to expo
        </a>
      </Link>
      <div className={styles.layout}>
        <iframe
          className={cn(styles.video, styleUtils.appear, styleUtils['appear-first'])}
          allow="picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="100%"
          src={innovator.website}
          title={innovator.company}
          width="100%"
        />
        <div className={styles.container}>
          <div className={styles['name-and-logo']}>
            <Image
              alt={innovator.company}
              src={innovator.image.url}
              className={styles.image}
              loading="lazy"
              title={innovator.company}
              height={64}
              width={64}
            />
            <h1 className={styles.name}>
              {innovator.company}
            </h1>
          </div>
          <p className={styles.description}>
            {innovator.bio}
          </p>
          <div className={styles.resources}>
            <h2 className={styles.heading}>Innovators</h2>
            {innovator.people.map((person) => (
              <div key={person.name} className={cn(styles.button, styles['button-resource'])}>
                <span className={styles.truncate}>
                   {person.name} | {person.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

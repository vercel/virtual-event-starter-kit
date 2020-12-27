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
import styles from './innovators-grid.module.css';

function InnovatorCard({ innovator }) {
  return (
    <Link key={innovator.company} href={`/expo/${innovator.slug}`}>
      <a role="button" tabIndex={0} className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            alt={innovator.company}
            src={innovator.image.url}
            className={styles.image}
            loading="lazy"
            title={innovator.company}
            width={900}
            height={500}
          />
        </div>
        <div className={styles.cardBody}>
          <div>
            <h2 className={styles.name}>
              {innovator.company}
            </h2>
            <p className={styles.description}>
              {innovator.tagline}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function InnovatorsGrid({ innovators }) {
  return (
    <div className={styles.grid}>
      {innovators.map((innovator) => (
        <InnovatorCard key={innovator.company} innovator={innovator} />
      ))}
    </div>
  );
}

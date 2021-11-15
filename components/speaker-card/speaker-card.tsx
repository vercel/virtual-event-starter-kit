import { Speaker } from '@lib/types';
import Link from 'next/link';
import styles from '@components/speaker-grid/speakers-grid.module.css';
import Image from 'next/image';
import React, { FC } from 'react';

type Props = {
  speaker: Speaker;
}

export const SpeakerCard: FC<Props> = ({ speaker }) => {
  return (
    <Link href={`/speakers/${speaker.slug}`}>
      <a role='button' tabIndex={0} className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            alt={speaker.name}
            src={speaker.image.url}
            className={styles.image}
            loading='lazy'
            quality='50'
            title={speaker.name}
            placeholder={speaker.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={speaker.image.blurDataURL}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.cardBody}>
          <div>
            <h2 className={styles.name}>{speaker.name}</h2>
            <p className={styles.title}>
              {`${speaker.title} @ `}
              <span className={styles.company}>{speaker.company}</span>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

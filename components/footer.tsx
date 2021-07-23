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

import cn from 'classnames';
import VercelLogo from '@components/icons/icon-platform';
import styles from './footer.module.css';
import { COPYRIGHT_HOLDER, SITE_NAME, CODE_OF_CONDUCT, LEGAL_URL, REPO } from '@lib/constants';

export function HostedByVercel() {
  return (
    <a
      href="https://vercel.com"
      className={cn(styles.footerLink, styles.footerLogo)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.secondaryText}>Created by </div>
      <VercelLogo color="white" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className={cn(styles.footer)}>
      <div className={styles.footerLegal}>
        <div className={styles.footerHostedBy}>
          <HostedByVercel />
          <div className={styles.footerSeparator} />
        </div>
        <div className={styles.footerCopyright}>
          Copyright © {`${new Date().getFullYear()} `} {COPYRIGHT_HOLDER || `${SITE_NAME}.`} All
          rights reserved.
        </div>
        <div className={styles.footerCenterGroup}>
          <p className={styles.footerParagraph}>
            <a
              href={REPO}
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </p>
          <div className={styles.footerSeparator} />
          <p className={styles.footerParagraph}>
            <a
              href={CODE_OF_CONDUCT}
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct
            </a>
          </p>
          {LEGAL_URL && (
            <>
              <div className={styles.footerSeparator} />
              <p className={styles.footerParagraph}>
                <a
                  href={LEGAL_URL}
                  className={styles.footerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Legal
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

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
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import { NAVIGATION } from '@lib/constants';
import styles from './layout.module.css';
import Logo from './icons/icon-logo';
import MobileMenu from './mobile-menu';
import Footer from './footer';
import * as Dialog from '@radix-ui/react-dialog';
import DemoModal from './hms/demo-modal';
import { CrossIcon } from '@100mslive/react-icons';
import React from 'react';
import useClickOutside from '@lib/hooks/use-click-outside';
import InfoIcon from './icons/icon-info';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
};

export default function Layout({ children, className, hideNav, layoutStyles }: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;
  React.useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById('cta-btn');
      el?.classList.add('show-overlay');
      const tooltip = document.getElementById('cta-tooltip');
      tooltip?.classList.add('fade-in');
    }, 3000);
  }, []);
  const ctaRef = React.useRef(null);
  const clickedOutside = () => {
    const el = document.getElementById('cta-btn');
    const tooltip = document.getElementById('cta-tooltip');
    tooltip?.remove();
    el?.classList.remove('show-overlay');
  };
  useClickOutside(ctaRef, clickedOutside);
  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              <MobileMenu key={router.asPath} />
              <Link href="/">
                {/* eslint-disable-next-line */}
                <a className={styles.logo}>
                  <Logo />
                </a>
              </Link>
            </div>
            <div className={styles.tabs}>
              {NAVIGATION.map(({ name, route }) => (
                <Link key={name} href={route}>
                  <a
                    className={cn(styles.tab, {
                      [styles['tab-active']]: activeRoute.startsWith(route)
                    })}
                  >
                    {name}
                  </a>
                </Link>
              ))}
            </div>
            <div className={cn(styles['header-right'])}>
              <Dialog.Root>
                <Dialog.Overlay className={cn(styles['overlay'])} />
                <Dialog.Trigger asChild>
                  <button ref={ctaRef} id="cta-btn" className={cn(styles['cta-btn'])}>
                    Try Demo
                  </button>
                </Dialog.Trigger>
                <div id="cta-tooltip" className={cn(styles['tooltip'])}>
                  <InfoIcon />
                  Click here to demo a live webinar powered by 100ms
                </div>
                <Dialog.Content className={cn(styles['content'])}>
                  <Dialog.Close asChild className={cn(styles['close-btn'])}>
                    <button>
                      <CrossIcon />
                    </button>
                  </Dialog.Close>
                  <DemoModal />
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          {!activeRoute.startsWith('/stage') && <Footer />}
        </div>
      </div>
    </>
  );
}

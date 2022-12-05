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

import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { SkipNavContent as RSkipNavContent } from '@reach/skip-nav';
import styles from './layout.module.css';
import { Footer } from './Footer';
import { Nav } from './Nav';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  isLive?: boolean;
  showFooter?: boolean;
};

// Workaround for TS 2590 error
const SkipNavContent: any = RSkipNavContent;

export default function Layout({ showFooter, children, className }: LayoutProps) {
  const router = useRouter();
  const activeRoute = router.asPath;

  return (
    <>
      <Nav />
      <SkipNavContent />
      <main>
        <div className={cn(styles.full, className)}>{children}</div>
      </main>
      {showFooter && <Footer />}
    </>
  );
}

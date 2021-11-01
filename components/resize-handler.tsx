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

import { useEffect } from 'react';

function calcVh() {
  document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`);
}

/**
 * Fix iOS 100vh bug (Unlike PostCSS-based solutions,
 * this JS-based solution allows var(--100vh) to be used inside calc())
 */
export default function ResizeHandler() {
  useEffect(() => {
    window.addEventListener('resize', calcVh);
    calcVh();
    return () => {
      window.removeEventListener('resize', calcVh);
    };
  }, []);
  return <></>;
}

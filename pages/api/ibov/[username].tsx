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

import { NextApiRequest, NextApiResponse } from 'next';
import screenshot from '@lib/screenshot';
import { SITE_URL } from '@lib/constants';

export default async function ibovImages(req: NextApiRequest, res: NextApiResponse) {
  let url: string;
  const { username } = req.query || {};
  const usernameString = username.toString();
  if (username) {
      url = `${SITE_URL}/ibov?username=${encodeURIComponent(
        usernameString
      )}`;

    const file = await screenshot(url, 1080, 1900);
    res.setHeader('Content-Type', `image/png`);
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=10, max-age=31536000, stale-while-revalidate`
    );
    res.statusCode = 200;
    res.end(file);
  } else {
    res.status(404).send('Not Found aa_');
  }
}

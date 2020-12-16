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

import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllStages } from '@lib/cms-api';

// Number of seconds to cache the API response for
const EXPIRES_SECONDS = 5;

export default async function getStages(_: NextApiRequest, res: NextApiResponse) {
  try {
    const allStages = await getAllStages();

    // Set caching headers
    const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`));
    res.setHeader('Expires', expires.toUTCString());
    res.setHeader(
      'Cache-Control',
      `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
    );

    return res.status(200).json(allStages);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error'
      }
    });
  }
}

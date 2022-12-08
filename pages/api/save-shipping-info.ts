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
import { updateUserWithShippingInfo } from '@lib/db-api';

export default async function saveGithubToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const body = req.body;

  if (!body.id) {
    return res.status(400).json({
      error: {
        code: 'not_registered',
        message: 'The registration does not exist. Please register for the event first.'
      }
    });
  }

  if (
    !body.name ||
    !body.address ||
    !body.cityTown ||
    !body.stateProvinceRegion ||
    !body.postalCode ||
    !body.country
  ) {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Invalid parameters'
      }
    });
  }

  try {
    const response = await updateUserWithShippingInfo(
      body.id,
      body.name,
      body.address,
      body.address2,
      body.cityTown,
      body.stateProvinceRegion,
      body.postalCode,
      body.country
    );

    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
}

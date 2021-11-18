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

import Redis from 'ioredis';
import crypto from 'crypto';

const redis = new Redis(process.env.REDIS_CONNECTION)

export function emailToId(email: string) {
  if (process.env.REDIS_EMAIL_TO_ID_SECRET) {
    const hmac = crypto.createHmac('sha1', process.env.REDIS_EMAIL_TO_ID_SECRET);
    hmac.update(email);
    const result = hmac.digest('hex');
    return result;
  } else {
    throw new Error('REDIS_EMAIL_TO_ID_SECRET is missing');
  }
}

export default redis;

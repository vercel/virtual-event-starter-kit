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
import redis from '@lib/redis';
import { supabase } from '@lib/supabase';

export default async function saveGithubToken(req: NextApiRequest, res: NextApiResponse) {
  console.log('saveGithubToken');
  
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const body = req.body;
  console.log({body});
  

  if (!body.token || !body.id) {
    return res.status(400).json({
      error: {
        code: 'bad_input',
        message: 'Invalid parameters'
      }
    });
  }

  if (redis) {
    const ticketNumber = await redis.hget(`id:${body.id}`, 'ticketNumber');
    if (!ticketNumber) {
      return res.status(404).json({ code: 'invalid_id', message: 'The registration does not exist' });
    }
  
    const [username, name] = await redis.hmget(`github-user:${body.token}`, 'login', 'name');
    if (!username) {
      return res.status(400).json({ code: 'invalid_token', message: 'Invalid or expired token' });
    }
  
    const key = `id:${body.id}`;
    const userKey = `user:${username}`;
  
    await redis
      .multi()
      .hsetnx(key, 'username', username)
      .hsetnx(key, 'name', name || '')
      // Also save username → data pair
      .hsetnx(userKey, 'name', name || '')
      .hsetnx(userKey, 'ticketNumber', ticketNumber)
      .exec();

    res.json({ username, name });
  // } else if (supabase) {
    // const { data } = await supabase
    //   .from('registrations')
    //   .select('*')
    //   .eq('id', body.id)
    //   .single()
    // const ticketNumber = data.ticket_number
    // if (!ticketNumber) {
    //   return res.status(404).json({ code: 'invalid_id', message: 'The registration does not exist' });
    // }
    // // TODO:
    // const username = data.username
    // const name = data.name
    // if (!username) {
    //   return res.status(400).json({ code: 'invalid_token', message: 'Invalid or expired token' });
    // }
  
    // const key = `id:${body.id}`;
    // const userKey = `user:${username}`;
    // await redis
    // .multi()
    // .hsetnx(key, 'username', username)
    // .hsetnx(key, 'name', name || '')
    // // Also save username → data pair
    // .hsetnx(userKey, 'name', name || '')
    // .hsetnx(userKey, 'ticketNumber', ticketNumber)
    // .exec();


  } else if (!redis || !supabase) {
    throw new Error('Redis or Supabase must be set up');
  }
}

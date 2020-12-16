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
import { nanoid } from 'nanoid';
import * as qs from 'querystring';
import redis from '@lib/redis';
import { renderSuccess, renderError } from '@lib/render-github-popup';

/**
 * This API route must be triggered as a callback of your GitHub OAuth app.
 */
export default async function githubOAuth(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.code) {
    // This happens when user cancelled the authentication.
    // In this case, we send an empty message which indicates no data available.
    res.end(renderSuccess());
    return;
  }

  const q = qs.stringify({
    client_id: process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID,
    client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    code: req.query.code
  });

  const accessTokenRes = await fetch(`https://github.com/login/oauth/access_token?${q}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!accessTokenRes.ok) {
    console.error(
      `Failed to get access token: ${accessTokenRes.status} ${await accessTokenRes.text()}`
    );
    res.statusCode = 500;
    res.end(renderError());
    return;
  }

  const { access_token: accessToken } = await accessTokenRes.json();

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${accessToken as string}`
    }
  });

  if (!userRes.ok) {
    console.error(`Failed to get GitHub user: ${userRes.status} ${await userRes.text()}`);
    res.statusCode = 500;
    res.end(renderError());
    return;
  }

  const user = await userRes.json();

  if (redis) {
    const token = nanoid();
    const key = `github-user:${token}`;

    await redis
      .multi()
      .hmset(key, 'id', user.id, 'login', user.login, 'name', user.name || '')
      .expire(key, 60 * 10) // 10m TTL
      .exec();

    res.end(renderSuccess({ type: 'token', token }));
  } else {
    res.end(renderSuccess({ type: 'user', login: user.login, name: user.name }));
  }
}

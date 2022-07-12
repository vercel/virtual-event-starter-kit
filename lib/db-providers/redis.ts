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
import { ConfUser } from '@lib/types';
import { nanoid } from 'nanoid';
import Redis from 'ioredis';

const redis =
  process.env.REDIS_PORT && process.env.REDIS_URL && process.env.REDIS_EMAIL_TO_ID_SECRET
    ? new Redis({
        port: parseInt(process.env.REDIS_PORT || '', 10),
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
        tls:
          process.env.REDIS_SSL_ENABLED && process.env.REDIS_SSL_ENABLED != 'false' ? {} : undefined
      })
    : undefined;

export async function getUserByUsername(username: string): Promise<ConfUser> {
  const [name, ticketNumber] = await redis!.hmget(`user:${username}`, 'name', 'ticketNumber');
  return { name, ticketNumber: ticketNumber ? parseInt(ticketNumber, 10) : null };
}

export async function getUserById(id: string): Promise<ConfUser> {
  const [name, username, createdAt] = await redis!.hmget(
    `id:${id}`,
    'name',
    'username',
    'createdAt'
  );
  return { name, username, createdAt: parseInt(createdAt!, 10) };
}

export async function createUser(id: string, email: string): Promise<ConfUser> {
  const ticketNumber = await redis!.incr('count');
  const createdAt = Date.now();
  await redis!.hmset(
    `id:${id}`,
    'email',
    email,
    'ticketNumber',
    ticketNumber,
    'createdAt',
    createdAt
  );
  return { id, email, ticketNumber, createdAt };
}

export async function getTicketNumberByUserId(id: string): Promise<string | null> {
  return await redis!.hget(`id:${id}`, 'ticketNumber');
}

export async function createGitHubUser(user: any): Promise<string> {
  const token = nanoid();
  const key = `github-user:${token}`;

  await redis!
    .multi()
    .hmset(key, 'id', user.id, 'login', user.login, 'name', user.name || '')
    .expire(key, 60 * 10) // 10m TTL
    .exec();
  return token;
}

export async function updateUserWithGitHubUser(
  id: string,
  token: string,
  ticketNumber: string
): Promise<ConfUser> {
  const [username, name] = await redis!.hmget(`github-user:${token}`, 'login', 'name');
  if (!username) {
    throw new Error('Invalid or expired token');
  }

  const key = `id:${id}`;
  const userKey = `user:${username}`;

  await redis!
    .multi()
    .hsetnx(key, 'username', username)
    .hsetnx(key, 'name', name || '')
    // Also save username → data pair
    .hsetnx(userKey, 'name', name || '')
    .hsetnx(userKey, 'ticketNumber', ticketNumber)
    .exec();

  return { username, name };
}

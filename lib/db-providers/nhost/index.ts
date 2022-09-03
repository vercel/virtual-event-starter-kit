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
import { NhostClient } from '@nhost/nhost-js';

const nhost =
  process.env.NHOST_SUBDOMAIN && process.env.NHOST_REGION
    ? new NhostClient({
        subdomain: process.env.NHOST_SUBDOMAIN,
        region: process.env.NHOST_REGION,
        adminSecret: process.env.NHOST_ADMIN_SECRET
      })
    : undefined;

export async function getUserByUsername(username: string): Promise<ConfUser> {
  if (!nhost) {
    throw new Error('Nhost client not initialized');
  }

  const QUERY = `#graphql
  query getUserByUsername($username: String!) {
    conference_users (where: { username: { _eq: $username } }) {
      id
      email
      ticketNumber
      name
      username
      createdAt
    }
  }
  `;

  const { data, error } = await nhost.graphql.request(QUERY, { username });

  if (error) {
    throw error;
  }

  return data.conference_users[0] ?? {};
}

export async function getUserById(id: string): Promise<ConfUser> {
  if (!nhost) {
    throw new Error('Nhost client not initialized');
  }

  const QUERY = `#graphql
  query getConferenceUserById($id: String!) {
    conference_user: conference_users_by_pk(id: $id) {
        id
        email
        ticketNumber
        name
        username
        createdAt
    }
  }
  `;

  const { data, error } = await nhost.graphql.request(QUERY, { id });

  if (error) {
    throw error;
  }

  return data.conference_user ?? {};
}

export async function createUser(id: string, email: string): Promise<ConfUser> {
  if (!nhost) {
    throw new Error('Nhost client not initialized');
  }

  const MUTATION = `#graphql
  mutation insertConferenceUser($conferenceUser: conference_users_insert_input!) {
    inserted_conference_user: insert_conference_users_one(object: $conferenceUser) {
        id
        email
        ticketNumber
        name
        username
        createdAt
    }
  }
  `;

  const { data, error } = await nhost.graphql.request(MUTATION, { conferenceUser: { id, email } });

  if (error) {
    throw error;
  }

  return data.inserted_conference_user ?? {};
}

export async function getTicketNumberByUserId(id: string): Promise<string | null> {
  if (!nhost) {
    throw new Error('Nhost client not initialized');
  }

  const QUERY = `#graphql
  query getConferenceUserById($id: String!) {
    conference_user: conference_users_by_pk(id: $id) {
        id
        email
        ticketNumber
        name
        username
        createdAt
    }
  }
  `;

  const { data, error } = await nhost.graphql.request(QUERY, { id });

  if (error) {
    throw error;
  }

  return data?.conference_user?.ticketNumber.toString() ?? null;
}

export async function createGitHubUser(user: any): Promise<string> {
  if (!nhost) {
    throw new Error('Nhost client not initialized');
  }

  const MUTATION = `#graphql
  mutation insertConferenceGitHubUser($conferenceGitHubUser: conference_github_users_insert_input!) {
    inserted_conference_github_user: insert_conference_github_users_one(object: $conferenceGitHubUser) {
      id
    }
  }
  `;

  const { data, error } = await nhost.graphql.request(MUTATION, {
    conferenceGitHubUser: {
      userData: {
        user
      }
    }
  });

  if (error) {
    throw error;
  }

  return data.inserted_conference_github_user.id;
}

export async function updateUserWithGitHubUser(id: string, token: string): Promise<ConfUser> {
  if (!nhost) {
    throw new Error('Nhost client not initialized');
  }

  // `token` is the conference github user id
  // `id` is the conference user id

  // get github user (login (username) and name)
  const GET_GITHUB_USER = `#graphql
    query getGitHubUser($id: uuid!) {
    conferenceGitHubUser: conference_github_users_by_pk(id: $id) {
      userData
    }
  }
  `;

  const { data, error } = await nhost.graphql.request(GET_GITHUB_USER, { id: token });

  if (error) {
    console.error(error);
    throw error;
  }

  const { conferenceGitHubUser } = data;

  if (!conferenceGitHubUser) {
    console.error('invalid or expired token');
    throw new Error('Invalid or expired token');
  }

  // extract github user data
  const { login: username, name } = conferenceGitHubUser.userData.user;

  // update conference user with github user data
  const UPDATE_CONFERENCE_USER = `#graphql
  mutation updateConferenceUser($id: String!, $conferenceUser: conference_users_set_input!) {
    update_conference_users_by_pk(pk_columns: {id: $id}, _set: $conferenceUser) {
      id
    }
  }
  `;

  const { error: updateUserError } = await nhost.graphql.request(UPDATE_CONFERENCE_USER, {
    id,
    conferenceUser: { username, name }
  });

  if (updateUserError) {
    console.error(updateUserError);
    throw updateUserError;
  }

  return { username, name };
}

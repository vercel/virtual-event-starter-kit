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

export const SITE_URL = 'https://bright-choux-c953ce.netlify.app';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'storybookjs';
export const BRAND_NAME = 'Storybook';
export const SITE_NAME_MULTILINE = ['Storybook Day', 'March 1, 2023'];
export const SITE_NAME = 'Storybook Day';
export const META_DESCRIPTION =
  'Join us for an online event about the future of UI development with Storybook. See what’s new in 7.0, meet world-class frontend devs, and check out the leading projects in the community.';
export const SITE_DESCRIPTION =
  'An interactive online experience by the community, free for everyone.';
export const DATE = 'March 1, 2023';
export const SHORT_DATE = 'Mar 10:00am - 12:00pm PST';
export const SHORT_TIME = '10am - 12pm';
export const TIMEZONE = 'Pacific Standard Time';
export const FULL_DATE = 'March 1st 10am Pacific Time (GMT-8)';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT =
  'https://www.notion.so/vercel/Code-of-Conduct-Example-7ddd8d0e9c354bb597a0faed87310a78';
export const REPO = 'https://github.com/storybookjs/storybook-day';
export const SAMPLE_TICKET_NUMBER = 1234;
export const NAVIGATION = [
  {
    name: 'Live Stage',
    route: '/stage/a'
  },
  {
    name: 'Vercel Stage',
    route: '/stage/c'
  },
  {
    name: '100ms Stage',
    route: '/stage/m'
  },
  {
    name: 'Schedule',
    route: '/schedule'
  },
  {
    name: 'Speakers',
    route: '/speakers'
  },
  {
    name: 'Expo',
    route: '/expo'
  },
  {
    name: 'Jobs',
    route: '/jobs'
  }
];

export type TicketGenerationState = 'default' | 'loading';

export const TWITTER_URL = 'https://twitter.com/storybookjs';
export const DISCORD_URL = 'https://discord.gg/storybook';
export const YOUTUBE_URL = 'https://www.youtube.com/c/StorybookJS';
export const GITHUB_URL = 'https://github.com/storybookjs';
export const SNEAK_PEEK_URL = 'https://storybook.js.org/blog/storybook-7-0/';

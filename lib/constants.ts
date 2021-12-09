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

export const SITE_URL = 'https://opencomponentshackathon.netlify.app';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'unfoldingWord';
export const BRAND_NAME = 'Open Components';
export const SITE_NAME_MULTILINE = ['Open', 'Components', 'Hackathon'];
export const SITE_NAME = 'Open Components Hackathon';
export const META_DESCRIPTION =
  'unfoldingWord Open Components Hackathon Event.';
export const SITE_DESCRIPTION =
  'An interactive online experience by the community, free for everyone.';
export const DATE = 'February 28th - March 4th, 2022';
export const SHORT_DATE = 'February 28 - 9:00am EST';
export const FULL_DATE = 'February 28th 9am Eastern Daylight Time (EDT), UTC -4';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT =
  'https://github.com/unfoldingWord/tc-create-app/blob/develop/CODE_OF_CONDUCT.md';
export const REPO = 'https://github.com/unfoldingWord/open-components-hackathon-website';
export const SAMPLE_TICKET_NUMBER = 1234;
export const DISCORD_SERVER = 'https://discord.gg/ejNmvUnN';
export const NAVIGATION = [
  {
    name: 'Schedule',
    route: '/schedule'
  },
  // TODO: #13
  // {
  //   name: 'Expo',
  //   route: '/expo'
  // }
];

export type TicketGenerationState = 'default' | 'loading';

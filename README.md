[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvirtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js%20and%20Vercel.&demo-url=https%3A%2F%2Fdemo.vercel.events%2F&demo-image=https%3A%2F%2Fdemo.vercel.events%2Fdeploy.png&integration-ids=oac_I1h8Dm9Mf30VNb3xQ0hebYvS&external-id={%22githubRepo%22:%20%22vercel/virtual-event-starter-kit%22})

# [Virtual Event Starter Kit](https://vercel.com/virtual-event-starter-kit)

### Demo: https://demo.vercel.events

This virtual event starter kit was used to run [Next.js Conf 2020](https://nextjs.org/2020/conf), which had almost 40,000 live attendees. It includes the following features:

- Multiple stages with an embedded YouTube stream
- Sponsor expo, including individual virtual booths
- Career Fair, allowing attendees to network and find job opportunties
- Ticket registration and generation
- Speaker pages and bios
- Schedule

This platform is built upon three principles:

- **Delegation:** Running a conference is difficult – you have to **delegate** tasks to third-parties to ensure success. Certain elements of an online conference experience are tough to get right, and we'd rather lean on established, industry leading solutions.
- **Flexibility:** While delegating certain elements of the conference experience is helpful, it's also important to own the platform. That's why this template provides a **flexible** open-source codebase that can be modified for your event.
- **Reducing Risk:** It's inevitable something will go wrong during your event. This platform **reduces risk** by leaning on a dynamic site that outputs as static files using [Incremental Static Generation](https://nextjs.org/docs/basic-features/data-fetching). These static files are cached, ensuring your site is never down. Then, it uses [API Routes](https://nextjs.org/docs/api-routes/introduction) to sprinkle dynamic content on top, which are hosted by a provider with 99.99% uptime.

### Built With

- Framework: [Next.js](https://nextjs.org)
  - [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support)
  - [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- CMS: [DatoCMS](https://www.datocms.com)
- Videos: [YouTube](https://www.youtube.com)
- Deployment: [Vercel](https://vercel.com)
- Authentication: [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps)
- Database: [Redis](https://redis.io)

## Running Locally

First, set local environment variables. We've included a read-only DatoCMS access token you can use in `.env.local.example`.

```
cp .env.local.example .env.local
```

Then install packages and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Clone and Deploy

Click the button below to clone and deploy this template on [Vercel](https://vercel.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvirtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js%20and%20Vercel.&demo-url=https%3A%2F%2Fdemo.vercel.events%2F&demo-image=https%3A%2F%2Fdemo.vercel.events%2Fdeploy.png&integration-ids=oac_I1h8Dm9Mf30VNb3xQ0hebYvS&external-id={%22githubRepo%22:%20%22vercel/virtual-event-starter-kit%22})

You’ll be asked to install a [DatoCMS](https://www.datocms.com) integration. It lets you sign up or log in to DatoCMS and create a new DatoCMS project based on the data used in the demo.

Feel free to modify the code to use a different CMS. See `lib/cms-api.ts` for details.

## Set up Backend

You'll need to customize this starter kit to your needs. There are three pieces you'll want to choose:

- Authentication (defaults to [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app))
- Database (defaults to [Redis](https://redis.io/))

We've included the defaults used for Next.js Conf. However, you are free to switch these as you see fit.

### Authentication

1. Create a [GitHub OAuth application](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) to use for authentication.

- Set **Authorization Callback URL** as `<your domain>/api/github-oauth`.
- After creating the OAuth app, create a **client secret**.

2. Set these environment variables [on Vercel](https://vercel.com/docs/environment-variables):

- `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID`: **Client ID** of the OAuth app.
- `GITHUB_OAUTH_CLIENT_SECRET`: **Client secret** of the OAuth app.

#### If testing locally:

- Set the Authorization Callback URL as `http://localhost:3000/api/github-oauth` on GitHub.
- Create `.env.local` and set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET`.
- Finally, set `SITE_ORIGIN` env var as `http://localhost:3000`. This is required to get the OAuth popup to work locally.

### Test Database (Redis) Locally

1. Install Redis locally and launch it.
2. Specify the following in `.env.local`:

```
REDIS_PORT=6379
REDIS_URL=localhost
REDIS_PASSWORD=
REDIS_EMAIL_TO_ID_SECRET=foo # Come up with your own secret string
```

> `REDIS_EMAIL_TO_ID_SECRET` will be used to create a hash of the email address, which will be used for the Redis key for each user data (i.e. `id:<hash>`). See `lib/redis.ts` for details.

3. In a separate terminal window, start the Next.js dev server (`yarn dev`) and sign up using the registration form.
4. In a separate terminal window, run Redis CLI and inspect the `id:<hash>` key. You should see the newly registered user.

## More Details

### Stages

There are four different stages included in the seed data. You are feel to add or remove these based on your schedule. Each stage requires the user to enter their email to register with the conference before entering the event. After successfully entering their email and saving the user with your database of choice, the user is able to view the embedded YouTube stream. The login state is persisted as a cookie.

One major feature of the conference platform is a near real-time sync with DatoCMS. Every five seconds, the stage queries `/api/stages` to fetch the latest information from the CMS. This allows you to make changes on the fly, without the user having the refresh the page. No need for websockets.

The primary use case for this is updating the YouTube embedded URL. Next.js Conf used this to seamlessly switch between pre-recorded videos running as a live premiere, and truly live content (e.g. panels). Plus, we had a few instances where our schedule needed to be tweaked on the fly. This implementation is fault tolerant, as well. The API route is properly cached and if the CMS was to somewhow go down, it won't break the page.

### Schedule / Speaker Pages

Schedule and speaker information is hosted in DatoCMS. The demo (`demo.vercel.events`) is seeded with images from Unsplash and a placeholder schedule. Each speaker has their own page with an image, bio, social media links, and information about their talk. The schedule is also shown as a sidebar on each corresponding stage.

### Sponsor Expo

If you'd like to have your event sponsored, the Expo provides a platform to showcase sponsors with:

- Their logo
- Four call-to-action links
- Embedded YouTube video
- Link to chat room (Discord)

For Next.js Conf, we created a Discord channel for each sponsor.

### Career Fair

Networking is vital for in-person conferences and replicating that environment virtually poses a challege. For the Career Fair, this starter provides the ability to list job postings, as well as an external link to talk with the company's recruiters on Discord.

### Adding Discord Chat

For Next.js Conf, we used Discord for conference attendees to chat. On each stage, we showed a highlighted message from the corresponding Discord channel. If a user in our allow list used the camera emoji (📸) it would show the message on the stage.

If you'd like to add similar functionality to your conference, you can use the API route below to fetch messages after creating a Discord bot. This API route is set up with the proper caching headers and ensures you won't get rate-limited with high traffic.

```ts
import ms from 'ms';
import fetch, { Headers, RequestInit } from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

interface Reaction {
  emoji: { name: string };
}

interface Message {
  id: string;
  channel_id: string;
  content: string;
  timestamp: string;
  author: {
    username: string;
  };
  reactions?: Reaction[];
}

interface ReactionSelector {
  id: string;
}

// After creating a bot, add the token as an environment var
const { DISCORD_BOT_TOKEN } = process.env;

// Number of seconds to cache the API response for
const EXPIRES_SECONDS = 60;

// Emoji that should be selected by a whitelisted user
// in order for this API to return the message
const EMOJI = '🎥';

// Whitelisted user IDs that are allowed to add the emoji to influence this API
const USERS = [
  '752552204124291104' // username
];

// Discord base API URL
const API = 'https://discordapp.com/api/';

// Map of Stage names to Discord channel IDs
const CHANNELS = new Map<string, string>([
  ['a', '769350098697191515'],
  ['c', '769350352226877549'],
  ['m', '769350396623192074'],
  ['e', '769350429644685351']
]);

const api = (url: string, opts: RequestInit = {}) => {
  const headers = new Headers(opts.headers);
  headers.set('Authorization', `Bot ${DISCORD_BOT_TOKEN}`);
  headers.set('User-Agent', 'Discord Bot (https://yoursite.com/conf, v0.1)');

  return fetch(`${API}${url}`, {
    ...opts,
    headers
  });
};

async function getReactionSelectors(
  channelId: string,
  messageId: string,
  emoji: string
): Promise<ReactionSelector[]> {
  const res = await api(
    `channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`
  );
  if (!res.ok) {
    throw new Error(`Failed to get message reactions: ${await res.text()} (${res.status})`);
  }
  return res.json();
}

async function getLatestMessageWithEmoji(
  messages: Message[],
  emoji: string,
  usersWhitelist: string[]
) {
  for (const message of messages) {
    if (!message.content.trim()) {
      // Empty message, ignore
      // You could also filter messages here
      continue;
    }
    for (const reaction of message.reactions || []) {
      if (reaction.emoji.name === emoji) {
        const selectors = await getReactionSelectors(message.channel_id, message.id, emoji);
        const selector = selectors.find(r => usersWhitelist.includes(r.id));
        if (selector) {
          // The correct emoji was added from a whitelisted user
          return { message, selector };
        }
      }
    }
  }
}

export default async function getDiscordMessage(req: NextApiRequest, res: NextApiResponse) {
  const { stage } = req.query;
  if (typeof stage !== 'string') {
    return res.status(400).json({ error: 'Query parameter "stage" must be a string' });
  }

  const channelId = CHANNELS.get(stage);
  if (!channelId) {
    return res.status(400).json({ error: `Invalid "stage": ${stage}` });
  }

  const apiRes = await api(`channels/${channelId}/messages`);
  let messages: Message[] = [];
  if (apiRes.status !== 429 && apiRes.ok) {
    messages = await apiRes.json();
  }

  if (apiRes.status === 429) {
    const reset = apiRes.headers.get('X-RateLimit-Reset-After') || 5;
    res.setHeader(
      'Cache-Control',
      `s-maxage=${reset}, public, must-revalidate, stale-while-revalidate`
    );
  }

  const messageToShow = await getLatestMessageWithEmoji(messages, EMOJI, USERS);
  if (!messageToShow) {
    return res.status(404).json({ error: 'Could not find message with emoji' });
  }

  const body = {
    username: messageToShow.message.author.username,
    content: messageToShow.message.content,
    timestamp: messageToShow.message.timestamp
  };

  // Set caching headers
  const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`));
  res.setHeader('Expires', expires.toUTCString());
  res.setHeader(
    'Cache-Control',
    `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
  );

  return res.status(200).json(body);
}
```

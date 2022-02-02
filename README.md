[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/100mslive/virtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-url=https://demo.vercel.events&demo-image=https://demo.vercel.events/deploy.png&integration-ids=oac_7yeSwUoVR5no3SlA9WM6oR7l&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js,%20100ms%20and%20DatoCMS)

Demo without live video : [https://demo.vercel.events](https://demo.vercel.events/)

Demo with live video : [https://100ms.vercel.app](https://100ms.vercel.app)

This virtual event starter kit was used to run [Next.js Conf 2020](https://nextjs.org/2020/conf), which had almost 40,000 live attendees. It includes the following features:

- Multiple stages - with the ability to add multiple sessions on each stage
- Each stage can be configured as -
  - An embedded YouTube stream OR 
  - A live interactive audio-video experience powered by [100ms](https://www.100ms.live)
- Sponsor expo, including individual virtual booths
- Career Fair, allowing attendees to network and find job opportunities
- Ticket registration and generation
- Speaker pages and bios
- Schedule

This platform is built upon three principles:

- **Delegation:** Running a conference is difficult – you have to **delegate** tasks to third-parties to ensure success. Certain elements of an online conference experience are tough to get right, and we'd rather lean on established, industry leading solutions.
- **Flexibility:** While delegating certain elements of the conference experience is helpful, it's also important to own the platform. That's why this template provides a **flexible** open-source codebase that can be modified for your event.
- **Reducing Risk:** It's inevitable something will go wrong during your event. This platform **reduces risk** by leaning on a dynamic site that outputs as static files using [Incremental Static Generation](https://nextjs.org/docs/basic-features/data-fetching). These static files are cached, ensuring your site is never down. Then, it uses [API Routes](https://nextjs.org/docs/api-routes/introduction) to sprinkle dynamic content on top, which are hosted by a provider with 99.99% uptime.

---

## Built With

- Framework: [Next.js](https://nextjs.org/)
  - [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support)
  - [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- CMS: [Multiple Options](https://github.com/vercel/virtual-event-starter-kit#cms)
- Video (Pre-recorded): [YouTube](https://www.youtube.com/)
- Live interactive video: [100ms](http://www.100ms.live)
- Deployment: [Vercel](https://vercel.com/)
- Authentication: [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps)
- Database: [Redis](https://redis.io/)

## What’s New?


https://user-images.githubusercontent.com/61158210/152098593-33f6562b-232d-40f3-b57c-1a43933405c6.mp4



The virtual events starter kit now has added support for organising truly LIVE virtual events. You can quickly setup a live stage and invite speakers to interact with viewers. Live audio-video opens up a ton of possibilities with respect to what you can do with this template. You can use it for:

1. Live Webinars
2. Community Calls
3. Hackathons
4. Panel Discussions
5. Multi-stage live conferences with a backstage (coming soon)

## **Clone and Deploy**

Click the button below to clone and deploy this template on [Vercel](https://vercel.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/100mslive/virtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-url=https://demo.vercel.events&demo-image=https://demo.vercel.events/deploy.png&integration-ids=oac_7yeSwUoVR5no3SlA9WM6oR7l&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js,%20100ms%20and%20DatoCMS)

You’ll be asked to install the **100ms with DatoCMS** integration. It lets you sign up or log in to 100ms and DatoCMS, and connects your DatoCMS and 100ms account to vercel. In a single integration, you will be able to deploy a fully working template that contains all the elements of the virtual events starter kit.

## Running Locally

> **NOTE:** Before this setup make sure to deploy the project using 100ms + DatoCMS integration to speed up the setup process.

After the project is deployed on Vercel, you can find `DATOCMS_READ_ONLY_API_TOKEN` and `NEXT_PUBLIC_HMS_TOKEN_ENDPOINT` already setup in the environment-variables section in project settings. The integration also sets up the [rooms](https://docs.100ms.live/server-side/v2/features/room), [templates & roles](https://docs.100ms.live/server-side/v2/foundation/templates-and-roles) associated with it.

First, to set local environment variables you can either use Vercel CLI [vercel env pull](https://vercel.com/docs/cli#commands/env) or just manually copy paste them.

```bash

cp .env.local.example .env.local
```

Then install the package and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000/) to see the landing page.

### Stages

There are four different stages included in the seed data. Feel free to add or remove these based on your schedule. Each stage can be easily configured to be a Live Video/Audio experience or an embedded YouTube stream. (You can do all of these configurations via DatoCMS console)

### Joining a stage

Visit `/stage/a` after entering your email you should see a "Enter your name" input form.

> NOTE: by default, you will join as a Viewer

![join](/media/join.png)

Click on Join and you should see "No Speakers Present". This is because only you have joined the Stage aka the "Room" as a viewer. A viewer does not have the permission to publish their audio and video. You can read more about roles in the sections below.

![stage.png](/media/stage.png)

### Joining with different Roles

For this we pass a query param in url for eg: `/stage/a?role=<ROLE_NAME>`

- Moderator: `/stage/a?role=backstage`

- Speaker: `/stage/a?role=stage`

- Viewer: `/stage/a`

So if you visit `/stage/a?role=stage` now you should see a Preview screen opening up. After joining you should be able to see yourselves. Open a new tab or invite others to host your next meetup, community calls, etc.

![preview](/media/preview.png)

## First Things First - How does live video work?

As a part of the integration, we have set up rooms and roles with the best possible configuration to host your events without issues.

### What is a room?

Room is a virtual space that holds conferencing of the people. To allow users to join a 100ms video conferencing session inside your app, you first need to create a room. Luckily the 100ms + Dataocms integration creates the rooms and adds them to all stages for you.

Every room has a “template” associated with it, which becomes the blueprint of the room. It defines the settings of the room along with the behavior/permissions of users who are part of it. If you want to see the template used for this purpose, visit the [100ms dashboard.](http://dashboard.100ms.live)

![join](/media/dashboard.png)

In this case, we’ve created a custom virtual events template with pre-configured roles that are essential to organize a live virtual event.

### What is a role?

The role is a collection of permissions that allows you to perform a certain set of operations while being part of the room. Every role has publish strategies which means if the user of that role is allowed to stream his video/audio or allowed to screen share or not.

Roles that are created with the 100ms + Dato CMS integration

| Role Name | Can share audio | Can share video | Can share screen | Can invite others to stage | Can remove others from stage | Info                                                                                                                  |
| --------- | --------------- | --------------- | ---------------- | -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Backstage | Yes             | Yes             | Yes              | Yes                        | Yes                          | Can remove users and see everyone but only users with role stage can see backstage users, can invite viewers on stage |
| Stage     | Yes             | Yes             | Yes              | Yes                        | No                           | Ideal role for speakers, can invite viewers to stage                                                                  |
| Invitee   | Yes             | Yes             | Yes              | No                         | No                           | Viewers who are invited to the stage                                                                                  |
| Viewer    | No              | No              | No               | No                         | No                           | Can only see Users with role Stage and Invitee and chat                                                               |

You can read more on Template and Role in our official doc:

[Templates and roles](https://docs.100ms.live/javascript/v2/foundation/templates-and-roles)

Every role that is publishing video has the default video quality of 360p with 300kbps Bitrate, 30fps and aspect ratio is set to 4:3 landscape mode. Screenshare quality is set to 1080p with 10fps.

> **NOTE:** All these settings can be easily customised on 100ms dashboard. You can set it as per your need. We recommend not going beyond 720p as it might lead to high internet and CPU usage on low-end devices, thereby affecting the call experience.

## Customize

### Live Video

The template is 100% customizable, you can style and change layouts as per your design system.

We have added some helper constants to quickly toggle some critical values, open the file `components/hms/config.ts` which contains a list of variables you can customize to change the video layouts, aspect ratio, etc.

- aspect ratio: modify width and height of `aspectRatio`

By default the aspect ratio is 1.8 : 1 which displays video tiles in the shown proportion:

![Aspect ratio 1](/media/ar-1.png)

So if you set the aspect ratio to 1:1 you will get the following result

![Aspect ratio 2](/media/ar-2.png)

By default, if there is more than one user on stage it switches to Active speaker mode. If you want the Active speaker mode turned on when there are more than 4 speakers you can set `activeSpeakerThreshold` to 4.

- To set active speaker threshold: modify `activeSpeakerThreshold`.

You can also use activespeakerthreshold value as a hack to toggle b/w carousel mode and active speaker mode. For example, suppose there are only 2 speakers, by default there would be 1 active speaker tile and other one at the bottom this is how it will look like:

![Active speaker 1](/media/as-1.png)

If you set `activeSpeakerThreshold` as 2 then they would come side by side instead of splitting into active/ carousel mode.

To avoid switching into carousel mode you set the `activeSpeakerThreshold` value according to your need.

![Active speaker 2](/media/as-2.png)

- Toggling pre-recorded vs live stages

There are four different stages included in the seed data. Feel free to add or remove these based on your requirement. Each stage can be easily configured to be a Live Video/Audio experience or embed YouTube stream.

![cms.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/54c690ce-1200-435c-94d8-cceb7023b307/cms.png)

- `isLive`(default setting): This makes your stage Live. If you just want to stream a Youtube URL turn this off and add YT url in the `Stream` field.
- `roomId`: Contains 100ms's `roomId` associated with the specific stage. This is pre-populated, so we advice you not to change the parameters for this field unless you know what you're doing.

![CMS](/media/cms.png)

You might have seen a list of speakers just below the Active Speaker videotile. If you think 5 videos is too many to be fit in that space you can toggle it by changing the value of `maxTileCountSpeakers` according to your need. We recommend keeping it below 6 for an optimum experience.

- changing/tweaking roles

Visit 100ms Dashboard and open the Virtual events template, you can see a bunch of settings to modify. Note that this might break some the features like you, so we advice you to not to modify it unless you’re completely aware of what you’re doing.

Refer this section [https://docs.100ms.live/javascript/v2/foundation/templates-and-roles](https://docs.100ms.live/javascript/v2/foundation/templates-and-roles)

- changing colors/theme

Open `global.css` file and change the css tokens according to your design

- remove demo cta

To remove the Demo CTA from the top navbar, set `hmsIntegration` as false. Usually, you’d want to remove the CTA before organizing any live event on the template, since the CTA enables anyone to join with any role they want.

---

### **CMS**

Environment variables determine which CMS to use. See [lib/cms-api.ts](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/cms-api.ts) for details and `.env.local.example` for all environment variables. The demo ([demo.vercel.events](https://demo.vercel.events/)) uses DatoCMS, but we also have support for:

- [Agility](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvirtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js%20and%20Vercel.&demo-url=https%3A%2F%2Fdemo.vercel.events%2F&demo-image=https%3A%2F%2Fdemo.vercel.events%2Fdeploy.png&integration-ids=oac_Dnqk9CoC6rZ18k9nVR9KresV&external-id=%7B%22manifest%22%3A%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fvercel%2Fvirtual-event-starter-kit%2Fmain%2Fdatocms.json%22%2C%20%22githubRepo%22%3A%20%22vercel%2Fvirtual-event-starter-kit%22%7D)
- [Contentful](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/cms-providers/contentful.ts)
- [Prismic](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/cms-providers/prismic/index.ts) ([Instructions](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/cms-providers/prismic/README.md))
- [Sanity](https://create.sanity.io/?template=sanity-io%2Fsanity-template-nextjs-event-starter)
- [Storyblok](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/cms-providers/storyblok.ts)
  - Click the following link to create the space for this starter kit in Storyblok: [Create Event Space](https://app.storyblok.com/#!/build/101757)

### **Constants**

`lib/constants.ts` contains a list of variables you should customize.

Note - In case you're looking to add live audio-video to the events template, we'd recommend you to move ahead with DatoCMS for a seamless integration experience. We've created a dato + 100ms integration that will help you to integrate both 100ms and DatoCMS to your vercel account in a few clicks.

---

## **Authentication and Database**

Some features won’t work until you set up authentication and database. The demo ([demo.vercel.events](https://demo.vercel.events/)) uses [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) for authentication and [Redis](https://redis.io/) for database. You can use different providers as you see fit.

### **Authentication**

You need to have GitHub OAuth set up to be able to customize the ticket after signing up on the registration form.

First, create a [GitHub OAuth application](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) to use for authentication.

- Set **Authorization Callback URL** as `<your domain>/api/github-oauth`
- After creating the OAuth app, create a **client secret**.

### **Running Locally:**

- Set the Authorization Callback URL as `http://localhost:3000/api/github-oauth` on GitHub.
- On `.env.local`, set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` as the **Client ID** of the OAuth app.
- Set `GITHUB_OAUTH_CLIENT_SECRET` as the **Client secret** of the OAuth app.
- Finally, make sure the `NEXT_PUBLIC_SITE_ORIGIN` environment variable is set as `http://localhost:3000`. This is required to get the OAuth popup to work locally.
- Restart the app (`yarn dev`) after editing `.env.local`.

Once it’s set up, sign up using the registration form on the home page (not on a stage page) and then click "Generate with GitHub".

### **On Vercel:**

- Set the Authorization Callback URL as `<your deployment’s URL>/api/github-oauth` on GitHub.
- Set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` on [Vercel Project Environment Variables Settings](https://vercel.com/docs/environment-variables) for the production environment.
- Edit `SITE_URL` in `lib/constants.ts` to match your deployment’s URL (no trailing slash).
- Push the code to redeploy the Project on Vercel.

### **Database**

You need a database to save user data and enable the following features:

- Generating a unique ticket number for each email when signing up on the registration form. If DB is not set up, it’ll always be `1234`.
- Generating a unique ticket image or ticket URL after signing in with GitHub. If DB is not set up, each ticket image or URL will show generic data.

The demo ([demo.vercel.events](https://demo.vercel.events/)) uses [Redis](https://redis.io/), but you can customize it to use any database you like.

### **Running Redis Locally**

1. Install Redis locally and run it.
2. Specify the following in `.env.local`:

`REDIS_PORT=6379 # Default Redis port number REDIS_URL=localhost REDIS_PASSWORD= REDIS_SSL_ENABLED= REDIS_EMAIL_TO_ID_SECRET=foo # Come up with your own secret string`

> REDIS_EMAIL_TO_ID_SECRET will be used to create a hash of the email address, which will be used for the Redis key for each user data (i.e. id:<hash>). See lib/redis.ts for details.

> If your Redis server has SSL (TLS) encryption enabled then set REDIS_SSL_ENABLED=true

1. Restart the app (`yarn dev`) after editing `.env.local`.
2. In a separate terminal window, start the Next.js dev server (`yarn dev`) and sign up using the registration form.
3. In a separate terminal window, run Redis CLI, list keys (`keys *`) and inspect a `id:<hash>` key (`hgetall id:<hash>`). You should see the newly registered user.

### **Using Redis On Vercel**

Provision your own Redis instance and set `REDIS_PORT`, `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_SSL_ENABLED` and `REDIS_EMAIL_TO_ID_SECRET` (come up with your own secret string) on [Vercel Project Environment Variables Settings](https://vercel.com/docs/environment-variables) for the production environment.

If you do not want to maintain a Redis server, you can use [Upstash](https://upstash.com/) which provides Serverless Redis with a free tier.

---

## Contributing

We’re on a mission to create an open-source alternative to hopin / airmeet that will enable anyone to simply build their own events platform that will be 100% customisable, 100% open-source and 100% brag-worthy ;)

We’re aiming to build an active community of developers who will work together to help us realise this mission. You are welcome to contribute to the issues on this repository on Github. Contributing to open-source projects is an excellent way for users to become contributors. And it’s both a fun and rewarding experience. We’re ready to swag it out, too, for every valid PR!

P.S - Be sure to check contribution guidelines, review, and merge policies.



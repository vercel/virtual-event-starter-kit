# Storybook day website

Join us for an online event about the future of UI development with Storybook. See what’s new in 7.0, meet world-class frontend devs, and check out the leading projects in the community.

## Built With

This project was bootstrapped using the [virtual event starter kit](/virtual-event-starter-kit.md).

- Framework: [Next.js](https://nextjs.org/)
  - [Storybook design system](https://github.com/storybookjs/design-system)
  - [Storybook components-marketing](https://github.com/storybookjs/components-marketing)
  - [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- CMS: [Storyblok](https://www.storyblok.com/)
- Video (Pre-recorded): [YouTube](https://www.youtube.com/)
- Deployment: [Netlify](https://www.netlify.com/)
- Authentication: [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps)
- Database: [Supabase](https://supabase.com)

## Running Locally

Set local environment variables:

```bash
cp .env.local.example .env.local
```

Grab the values for only the following variables from your Netlify console or CLI (`netlify env:list`):

- `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID`
- `GITHUB_OAUTH_CLIENT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_SECRET`
- `STORYBLOK_PREVIEW_TOKEN`

Then install the package and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000/) to see the landing page.

## Running Storybook

This project uses Storybook 7 which requires Node 16+. However, the API server requires Node 14. To run Storybook locally, disable engine check:

```bash
yarn config set ignore-engines true
```

### **CMS**

This project uses Storyblok to manage all content. You can find the content models in the [Storyblok space](https://app.storyblok.com/#/me/spaces/186678/dashboard?fe_version=v2).

### **Constants**

`lib/constants.ts` contains a list of variables you should customize.

Note - In case you're looking to add live audio-video to the events template, we'd recommend you to move ahead with DatoCMS for a seamless integration experience. We've created a dato + 100ms integration that will help you to integrate both 100ms and DatoCMS to your vercel account in a few clicks.

### **Running Authentication Locally**

You need to have GitHub OAuth set up to be able to customize the ticket after signing up on the registration form.

First, create a [GitHub OAuth application](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) to use for authentication.

- Set the Authorization Callback URL as `http://localhost:3000/api/github-oauth` on GitHub.
- On `.env.local`, set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` as the **Client ID** of the OAuth app.
- Set `GITHUB_OAUTH_CLIENT_SECRET` as the **Client secret** of the OAuth app.
- Finally, make sure the `NEXT_PUBLIC_SITE_ORIGIN` environment variable is set as `http://localhost:3000`. This is required to get the OAuth popup to work locally.
- Restart the app (`yarn dev`) after editing `.env.local`.

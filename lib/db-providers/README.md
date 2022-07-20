# Database Providers

You need a database to save user data and enable the following features:

- Generating a unique ticket number for each email when signing up on the registration form. If no DB is set up, it’ll always be `1234`.
- Generating a unique ticket image or ticket URL after signing in with GitHub. If no DB is set up, each ticket image or URL will show generic data.

Environment variables determine which database to use. See [lib/db-api.ts](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/db-api.ts) for details and `.env.local.example` for all environment variables. There's support for:

## Redis

### **Running Redis Locally**

1. [Install Redis](https://redis.io/docs/getting-started/installation/) locally and run it.
2. Specify the following in `.env.local`:

`REDIS_PORT=6379 # Default Redis port number REDIS_URL=localhost REDIS_PASSWORD= REDIS_SSL_ENABLED= EMAIL_TO_ID_SECRET=foo # Come up with your own secret string`

> EMAIL_TO_ID_SECRET will be used to create a hash of the email address, which will be used for the Redis key for each user data (i.e. id:<hash>). See lib/redis.ts for details.

> If your Redis server has SSL (TLS) encryption enabled then set REDIS_SSL_ENABLED=true

1. Restart the app (`yarn dev`) after editing `.env.local`.
2. In a separate terminal window, start the Next.js dev server (`yarn dev`) and sign up using the registration form.
3. In a separate terminal window, run Redis CLI, list keys (`keys *`) and inspect a `id:<hash>` key (`hgetall id:<hash>`). You should see the newly registered user.

### **Using Redis On Vercel**

Provision your own Redis instance and set `REDIS_PORT`, `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_SSL_ENABLED` and `EMAIL_TO_ID_SECRET` (come up with your own secret string) on [Vercel Project Environment Variables Settings](https://vercel.com/docs/environment-variables) for the production environment.

If you do not want to maintain a Redis server, you can use [Upstash](https://upstash.com/) which provides Serverless Redis with a free tier.

## Supabase

[Supabase](https://supabase.com/) provides a cloud hosted Postgres database which can be accessed via an auto-generated REST API.

### **Setup**

- If you haven't already, [create a Supabase account](https://app.supabase.com/) and project.
- Within your project, navigate to the [SQL editor](https://app.supabase.com/project/_/sql) and create a "New query".
- Copy the SQL from [supabase/schema.sql](https://github.com/vercel/virtual-event-starter-kit/blob/main/lib/db-providers/schema.sql) and paste it into the Supabase SQL editor and click run.
- Navigate to the [API settings](https://app.supabase.com/project/_/settings/api) and copy the project URL and service role key (make sure to keep it secret) to your env variables.

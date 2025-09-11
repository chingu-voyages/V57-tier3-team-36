import 'server-only';

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  rateLimit: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET as string,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
export type Session = (typeof auth.$Infer.Session)['session'];
export type User = (typeof auth.$Infer.Session)['user'];

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
    ...(process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
      ? {
          expiresIn: 60 * 60 * 24 * 365, // 1 year (in seconds)
          updateAge: 60 * 60 * 24 * 30, // Refresh every 30 days
        }
      : {}),
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
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
});
export type Session = (typeof auth.$Infer.Session)['session'];
export type User = (typeof auth.$Infer.Session)['user'];

export type AuthContext =
  | { user: User; session: Session; isAuthenticated: true }
  | { user?: User; session?: Session; isAuthenticated: false };

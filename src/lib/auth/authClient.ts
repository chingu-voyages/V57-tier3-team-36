'use client';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string,
  plugins: [
    inferAdditionalFields({
      user: { login: { type: 'string', required: true } },
    }),
  ],
});

'use client';

import { apiHandlers } from '@/lib/github/apiHandlers';
import { handleClientRequest } from '@/lib/github/handleClientRequest';

export const api = apiHandlers(handleClientRequest);

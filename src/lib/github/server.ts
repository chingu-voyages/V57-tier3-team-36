'use server';

import { apiHandlers } from '@/lib/github/apiHandlers';
import { handleServerRequest } from '@/lib/github/handleServerRequest';

export async function createApi() {
  return apiHandlers(handleServerRequest);
}

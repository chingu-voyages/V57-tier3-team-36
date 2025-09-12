import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';

export async function getUserId() {
  try {
    const userId = (
      await auth.api.getSession({
        headers: await headers(),
      })
    )?.user.id;
    if (!userId) {
      console.log('Missing userId');
      return null;
    }
    return userId;
  } catch (error) {
    console.error('Failed to get user id from session:\n', error);
    return null;
  }
}

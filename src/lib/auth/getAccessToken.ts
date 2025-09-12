import { auth } from '@/lib/auth/auth';

export async function getAccessToken(userId: string) {
  try {
    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: 'github',
        userId,
      },
    });
    if (!accessToken) {
      console.log('Missing accessToken');
      return null;
    }
    return accessToken;
  } catch (error) {
    console.error('Failed to get access token:\n', error);
    return null;
  }
}

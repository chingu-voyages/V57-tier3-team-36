import { getAccessToken } from '@/lib/getAccessToken';
import { getUserId } from '@/lib/getUserId';

type User = {
  id: number;
  login: string; // username
  avatar_url?: string;
};

export async function fetchUser(): Promise<User> {
  const emptyResponse = Promise.resolve({} as User);
  const githubApiUrl = 'https://api.github.com';

  try {
    const userId = await getUserId();
    if (!userId) return emptyResponse;

    const accessToken = await getAccessToken(userId);
    if (!accessToken) return emptyResponse;

    const url = `${githubApiUrl}/user`;
    console.log(`Fetching from GitHub: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.log('Failed to fetch\n', response.status, response.statusText);
      return emptyResponse;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch user:\n', error);
    return emptyResponse;
  }
}

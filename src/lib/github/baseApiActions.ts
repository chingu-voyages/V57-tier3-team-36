import { getBearerAccessToken } from "@/lib/auth/getBearerAccessToken";

export function BaseGithubApiActions() {
  const baseUrl = "https://api.github.com";

  async function get<T>(path: string): Promise<T> {
    const bearerToken = await getBearerAccessToken();

    if (!bearerToken) {
      throw new Error("Missing user access token");
    }

    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
  return { get };
}

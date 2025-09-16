import { getBearerAccessToken } from "@/lib/auth/getBearerAccessToken";

// TODO: Add pagination
async function fetchGitHubReposResult(): Promise<Result<GitHubRepo[], string>> {
  const githubApiUrl = "https://api.github.com";

  try {
    const bearerAccessToken = await getBearerAccessToken();

    // TODO: if these functions fail, do we error out or return an object?
    if (!bearerAccessToken) {
      return { status: "error", error: "Missing user access token" };
    }

    const url = `${githubApiUrl}/user/repos`;
    console.log(`Fetching from GitHub: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: bearerAccessToken,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return {
        status: "error",
        error: `${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { status: "success", data };
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function fetchGitHubRepos() {
  const result = await fetchGitHubReposResult();
  return result.status === "success" ? result.data : undefined;
}

// getAllRepos:                   /user/repos
// getAllReposForUsername:        /users/${owner}/repos
// getOpenPullRequestsForRepo:    /repos/${owner}/${repo}/pulls?state=open
// getClosedPullRequestsForRepo:  /repos/${owner}/${repo}/pulls?state=closed
// getContributorsForRepo:        /repos/${owner}/${repo}/contributors

// listPullRequests:              octokit.rest.pulls.list
// fetchUser:                     /user
// fetchGithubRepos:              /user/repos

import { getUserId } from '@/lib/getUserId';
import { getAccessToken } from '@/lib/getAccessToken';
import { App, Octokit } from 'octokit';

type PullRequest = {
  id: number;
  title: string;
  url: string;
};

// TODO: Add pagination
export async function listPullRequests({
  repo,
  owner,
}: {
  repo: string;
  owner: string;
}): Promise<PullRequest[]> {
  const emptyResponse = Promise.resolve([] as PullRequest[]);
  const githubApiUrl = 'https://api.github.com';

  try {
    const userId = await getUserId();
    if (!userId) return emptyResponse;

    const accessToken = await getAccessToken(userId);
    if (!accessToken) return emptyResponse;

    const params = new URLSearchParams({
      state: 'open',
      visibility: 'public',
    });
    const url = `${githubApiUrl}/repos/${owner}/${repo}/pulls?${params.toString()}`;
    console.log('Fetching from GitHub: ', url);
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.log('Failed to fetch\n', response.status, response.statusText);
      return emptyResponse;
    }

    return response.json();

    // const octokit = new Octokit({
    //   auth: accessToken,
    // });
    // const { data: pulls } = await octokit.rest.pulls.list({
    //   owner,
    //   repo,
    //   state: 'open',
    // });
    // return pulls;

    // const app = new App({
    //   appId: process.env.GITHUB_APP_ID!,
    //   privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
    // });

    // const installationResponse = await fetch(
    //   `${githubApiUrl}/repos/${owner}/${repo}/installation`,
    //   {
    //     headers: {
    //       Authorization: `token ${accessToken}`,
    //     },
    //   },
    // );

    // const installationId = (await installationResponse.json())?.id;
    // if (!installationId) {
    //   console.log('Missing installationId');
    //   return emptyResponse;
    // }

    // const octokit = await app.getInstallationOctokit(installationId);
    // const { data: pulls } = await octokit.rest.pulls.list();
    // return pulls;
  } catch (error) {
    console.error('Failed to get pull requests:\n', error);
    return emptyResponse;
  }
}

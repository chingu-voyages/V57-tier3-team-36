import { getGithubRepoIdsForUser } from '@/lib/db/getGithubRepoIdsForUser';
import { createApi } from '@/lib/github/server';
import { avgTimeToFirstReview } from '@/mocks/data/avgTimeToFirstReview';

type ReviewData = {
  repoName: string;
  repoOwner: string;
  pullRequestNumber: number;
  pullRequestCreatedAt: string;
  reviewSubmittedAt: string;
};

// Get user's repos from database (repo ids)
// For each repo:
//   1. Fetch repo details
//   2. Fetch PRs from last 30 days (PR number and created_at)
//   3. For each PR, fetch reviews (limit = 1)
//   4. "save" the time from PR creation to first review

export async function getReviewData(userId: string): Promise<ReviewData[]> {
  // FIXME: not the best way to handle mock data
  if (process.env.NODE_ENV !== 'production') {
    return avgTimeToFirstReview;
  }
  const api = await createApi();

  // Get user's repos from database (repo ids)
  const userRepos = await getGithubRepoIdsForUser(userId);
  const data = [] as ReviewData[];

  // For each repo:
  for (const userRepo of userRepos) {
    // 1. Fetch repo details
    const repoResponse = await api.getRepoById(userRepo.githubRepoId);
    const owner = repoResponse.owner.login;
    const repo = repoResponse.name;

    //   2. Fetch PRs from last 30 days (PR number and created_at)
    const pullRequests = await api.getPullRequestsForRepo({
      owner,
      repo,
      state: 'all',
      per_page: 100,
    }); // TODO: additional pages of pull requests

    //   3. For each PR, fetch reviews (limit = 1)
    for (const pullRequest of pullRequests) {
      const reviewsResponse = await api.getReviewsForPullRequest({
        owner,
        repo,
        pull_number: pullRequest.number,
        per_page: 1,
      });

      if (reviewsResponse.length > 0) {
        const submittedAt = reviewsResponse[0].submitted_at;

        if (submittedAt) {
          //   4. "save" the time from PR creation to first review
          data.push({
            repoOwner: owner,
            repoName: repo,
            pullRequestCreatedAt: pullRequest.created_at,
            pullRequestNumber: pullRequest.number,
            reviewSubmittedAt: submittedAt,
          });
        }
      }
    }
  }

  return data;
}

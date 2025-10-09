import { computeAveragePrReviews } from '@/components/AveragePrReviewsWidget/calculateAverageReviewsPerPr';
import { expect, test } from '@playwright/test';

const testCases = [
  {
    description: 'No pull requests',
    reviewPromises: [],
    pullRequests: [],
    expectedAverage: '0.00',
  },
  {
    description: 'Pull requests with no reviews',
    reviewPromises: [
      { status: 'fulfilled', value: { success: true, data: [] } },
      { status: 'fulfilled', value: { success: true, data: [] } },
    ] as PromiseSettledResult<Result<GitHubPullRequestReview[]>>[],
    pullRequests: [
      {
        number: 1,
        base: { repo: { owner: { login: 'owner1' }, name: 'repo1' } },
      },
      {
        number: 2,
        base: { repo: { owner: { login: 'owner1' }, name: 'repo1' } },
      },
    ] as GitHubPullRequest[],
    expectedAverage: '0.00',
  },
  {
    description: 'Pull requests with varying number of reviews',
    reviewPromises: [
      {
        status: 'fulfilled',
        value: { success: true, data: [{}, {}] },
      }, // 2 reviews for PR 1
      {
        status: 'fulfilled',
        value: { success: true, data: [{}] },
      },
      {
        status: 'fulfilled',
        value: { success: true, data: [{}, {}, {}] },
      },
    ] as PromiseSettledResult<Result<GitHubPullRequestReview[]>>[],
    pullRequests: [
      {
        number: 1,
        base: { repo: { owner: { login: 'owner1' }, name: 'repo1' } },
      },
      {
        number: 2,
        base: { repo: { owner: { login: 'owner1' }, name: 'repo1' } },
      },
      {
        number: 3,
        base: { repo: { owner: { login: 'owner2' }, name: 'repo2' } },
      },
    ] as GitHubPullRequest[],
    expectedAverage: '2.00',
  },
  {
    description: 'Some review fetches fail',
    reviewPromises: [
      {
        status: 'fulfilled',
        value: { success: true, data: [{}, {}, {}] },
      },
      {
        status: 'rejected',
        reason: 'Network error',
      }, // Failed fetch for PR 2
      {
        status: 'fulfilled',
        value: { success: true, data: [{}] },
      },
    ] as PromiseSettledResult<Result<GitHubPullRequestReview[]>>[],
    pullRequests: [
      {
        number: 1,
        base: { repo: { owner: { login: 'owner1' }, name: 'repo1' } },
      },
      {
        number: 2,
        base: { repo: { owner: { login: 'owner1' }, name: 'repo1' } },
      },
      {
        number: 3,
        base: { repo: { owner: { login: 'owner2' }, name: 'repo2' } },
      },
    ] as GitHubPullRequest[],
    expectedAverage: '1.33',
  },
];

test.describe('computeAveragePrReviews function', () => {
  testCases.forEach(
    ({ description, reviewPromises, pullRequests, expectedAverage }) => {
      const average = computeAveragePrReviews(reviewPromises, pullRequests);
      test(`should compute the average number of reviews per PR correctly: ${description}`, () => {
        expect(average).toBe(expectedAverage);
      });
    }
  );
});

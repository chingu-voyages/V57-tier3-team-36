import { test, expect } from '@playwright/test';
import type { Repo } from '@/db/schema';
import { authFile } from '@/tests/constants';

test.describe('User Repos API', () => {
  test('full user repos workflow', async ({ playwright }) => {
    // Create a request context with the stored auth
    const request = await playwright.request.newContext({
      storageState: authFile,
    });

    // Get the authenticated user
    const sessionResponse = await request.get('/api/auth/get-session');
    const sessionData = await sessionResponse.json();
    const testUserId = sessionData.user.id;

    if (!testUserId) throw Error('User not authenticated');

    const testRepoId = '10270250'; // this is the React repo id (any public id is fine)

    await test.step('1. Create new user repo', async () => {
      const createRepoResponse = await request.post(
        `/api/users/${testUserId}/repos`,
        {
          data: {
            githubRepoId: testRepoId,
          },
        }
      );
      expect(createRepoResponse.ok()).toBeTruthy();
      const createRepoData = await createRepoResponse.json();
      expect(createRepoData).toHaveProperty('githubRepoId', testRepoId);
    });

    await test.step('2. Get all repos for a user', async () => {
      const getReposResponse = await request.get(
        `/api/users/${testUserId}/repos`
      );
      expect(getReposResponse.ok()).toBeTruthy();
      const reposData = await getReposResponse.json();

      expect(Array.isArray(reposData)).toBeTruthy();
      expect(reposData.length).toBeGreaterThan(0);

      // Verify our created repo is in the list
      const foundRepo = reposData.find(
        (repo: Repo) => repo.id.toString() === testRepoId
      );
      expect(foundRepo).toBeDefined();
    });

    await test.step('3. Delete user repo', async () => {
      const deleteRepoResponse = await request.delete(
        `/api/users/${testUserId}/repos/${testRepoId}`
      );
      expect(deleteRepoResponse.ok()).toBeTruthy();

      // Verify deletion - user should no longer have the repo
      const reposAfterDelete = await request.get(
        `/api/users/${testUserId}/repos`
      );
      const reposData = await reposAfterDelete.json();

      const repoStillExists = reposData.some(
        (repo: Repo) => repo.id.toString() === testRepoId
      );
      expect(repoStillExists).toBeFalsy();
    });

    // Clean up the request context
    await request.dispose();
  });
});

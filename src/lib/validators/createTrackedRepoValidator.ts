import z from 'zod';

export const createTrackedRepoValidator = z.object({
  githubRepoId: z.string().min(1, 'GitHub Repo ID is required'),
});

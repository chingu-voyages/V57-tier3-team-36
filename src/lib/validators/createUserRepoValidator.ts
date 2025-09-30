import z from 'zod';

export const createUserRepoValidator = z.object({
  githubRepoId: z.string().min(1, 'GitHub Repo ID is required'),
});

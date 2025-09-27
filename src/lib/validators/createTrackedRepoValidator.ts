import z from 'zod';

export const createTrackedRepoValidator = z.object({
  repo_id: z.string().min(1, 'Repo ID is required'),
});

import { db } from '@/db';
import { userRepo, repo } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getGithubRepoIdsForUser(userId: string) {
  return db
    .select({
      githubRepoId: repo.githubRepoId,
    })
    .from(userRepo)
    .where(eq(userRepo.userId, userId))
    .innerJoin(repo, eq(userRepo.repoId, repo.id));
}

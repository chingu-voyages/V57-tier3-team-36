import { db } from '@/db';
import { repo, userRepo } from '@/db/schema';
import { getServerSession } from '@/lib/auth/getServerSession';
import { createApi } from '@/lib/github/server';
import * as Response from '@/lib/response';
import { createUserRepoValidator } from '@/lib/validators/createUserRepoValidator';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { isAuthenticated } = await getServerSession();
    if (!isAuthenticated) {
      return Response.Unauthorized;
    }
    const { user_id } = await params;

    const requestBody = await req.json();
    const { success } = createUserRepoValidator.safeParse(requestBody);
    if (!success) {
      console.error('Invalid request body:', requestBody);
      return Response.BadRequest;
    }

    const { githubRepoId } = requestBody;

    // Check for an existing gitHubRepoId in the repo table
    const existingTrackedGitHubRepo = await db.query.repo.findFirst({
      where: eq(repo.githubRepoId, githubRepoId),
    });

    // If it doesn't exist in the repo table, create a new entry and then create a user_repo entry
    if (!existingTrackedGitHubRepo) {
      const newId = uuidv4();
      await db.insert(repo).values({
        id: newId,
        githubRepoId,
      });
      await insertUserRepoEntry(user_id, newId);
    } else {
      // If it exists, just create a user_repo entry
      await insertUserRepoEntry(user_id, existingTrackedGitHubRepo.id);
    }

    // Create a github API
    const api = await createApi();

    // Fetch data for newly created repo
    const newRepo = await api.getRepoById(githubRepoId);

    return NextResponse.json(newRepo, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in POST /api/users/[user_id]/repos:', error.message);
    }
    return Response.InternalServerError;
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { isAuthenticated } = await getServerSession();
    if (!isAuthenticated) {
      return Response.Unauthorized;
    }

    const { user_id } = await params;

    const userRepos = await db
      .select({
        githubRepoId: repo.githubRepoId,
      })
      .from(userRepo)
      .where(eq(userRepo.userId, user_id))
      .innerJoin(repo, eq(userRepo.repoId, repo.id));

    // Create a github API
    const api = await createApi();

    // Fetch all repos in parallel
    const repoDataPromises = userRepos.map(userRepo =>
      api.getRepoById(userRepo.githubRepoId)
    );

    const repoData = await Promise.all(repoDataPromises);
    return NextResponse.json(repoData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in GET /api/users/[user_id]/repos:', error.message);
    }
    return Response.InternalServerError;
  }
}

async function insertUserRepoEntry(user_id: string, repoId: string) {
  // Check if an entry already exists in the user_repo table

  const existingEntry = await db.query.userRepo.findFirst({
    where: and(eq(userRepo.userId, user_id), eq(userRepo.repoId, repoId)),
  });

  if (!existingEntry) {
    await db.insert(userRepo).values({
      id: uuidv4(),
      userId: user_id,
      repoId: repoId,
    });
  } else {
    console.warn(
      `Warning: Entry already exists in user_repo for userId: ${user_id} and repoId: ${repoId}`
    );
    return existingEntry;
  }
}

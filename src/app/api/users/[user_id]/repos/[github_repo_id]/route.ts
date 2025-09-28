import { repo, userRepo } from '@/db/schema';
import { db } from '@/index';
import { getServerSession } from '@/lib/auth/getServerSession';
import { InternalServerError, Unauthorized } from '@/lib/response';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string; github_repo_id: string }> }
) {
  const { isAuthenticated } = await getServerSession();
  if (!isAuthenticated) {
    return Unauthorized;
  }
  const { user_id, github_repo_id } = await params;

  // Find the entry in the user_repo table and delete it

  try {
    const repoEntryInDb = await db.query.repo.findFirst({
      where: eq(repo.githubRepoId, github_repo_id),
    });
    if (!repoEntryInDb) {
      return NextResponse.json(
        { success: false, error: 'Repository not found' },
        { status: 404 }
      );
    }

    // Delete the user's tracked repo entry
    await db
      .delete(userRepo)
      .where(
        and(eq(userRepo.userId, user_id), eq(userRepo.repoId, repoEntryInDb.id))
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      'Error in DELETE /api/users/[user_id]/repos/[github_repo_id]:',
      (error as Error).message
    );
    return InternalServerError;
  }
}

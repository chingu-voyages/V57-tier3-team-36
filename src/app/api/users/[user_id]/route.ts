import { getServerSession } from '@/lib/auth/getServerSession';
import * as Response from '@/lib/response';
import { createTrackedRepoValidator } from '@/lib/validators/createTrackedRepoValidator';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    // Find a repo with a matching userId
    const requestBody = await req.json();
    const validationResult = createTrackedRepoValidator.safeParse(requestBody);
    const { user_id } = await params;

    if (!validationResult.success) {
      return Response.BadRequest;
    }

    const { user } = await getServerSession();

    if (!user || user.id !== user_id) {
      return Response.Unauthorized;
    }
    const { repo_id } = requestBody;

    // const matchingRepo = await db.query.userRepo.findFirst({
    //   where: and(eq(userRepo.userId, user_id), eq(userRepo.repoId))
    // });
    return NextResponse.json({ user_id, requestBody });
  } catch (error) {
    return Response.InternalServerError;
  }
}

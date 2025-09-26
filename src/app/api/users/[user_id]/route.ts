import { user } from '@/db/schema';
import { db } from '@/index';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const { user_id } = await params;

  const userInDb = await db.query.user.findFirst({
    where: eq(user.id, user_id),
  });

  // We shouldn't need this since we are authenticating the user
  if (!userInDb) {
    return NextResponse.json(
      { error: `User with id ${user_id} not found`, success: false } as const,
      { status: 404 }
    );
  }

  return NextResponse.json({ data: userInDb, success: true }, { status: 200 });
}

import { NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
}

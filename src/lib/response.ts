import { NextResponse } from 'next/server';

export const BadRequest = NextResponse.json(
  {
    error: '400 Bad Request',
    success: false,
  } as const,
  { status: 400 }
);

export const Unauthorized = NextResponse.json(
  {
    error: '401 Unauthorized',
    success: false,
  } as const,
  { status: 401 }
);

export const MethodNotAllowed = NextResponse.json(
  {
    error: '405 Method Not Allowed',
    success: false,
  } as const,
  { status: 405 }
);

export const InternalServerError = NextResponse.json(
  {
    error: '500 Internal Server Error',
    success: false,
  } as const,
  { status: 500 }
);

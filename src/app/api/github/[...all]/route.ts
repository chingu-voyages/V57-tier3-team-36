import { NextRequest, NextResponse } from 'next/server';
import { githubApiPath, githubApiUrl } from '@/lib/github/constants';
import { requireAuth } from '@/lib/auth/requireAuth';
import { getBearerAccessToken } from '@/lib/auth/getBearerAccessToken';

const unauthorized = NextResponse.json(
  {
    success: false,
    error: '401 Unauthorized',
  } as const,
  { status: 401 },
);

export async function GET<T>(
  request: NextRequest,
): Promise<NextResponse<Result<T>>> {
  try {
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) return unauthorized;

    const bearerToken = await getBearerAccessToken();
    if (!bearerToken) return unauthorized;

    const headers = new Headers({
      Accept: request.headers.get('accept') || 'application/vnd.github.v3+json',
      Authorization: bearerToken,
      'User-Agent': `${process.env.APP_NAME}/${process.env.APP_VERSION} (+${process.env.NEXT_PUBLIC_BASE_URL})`,
    });

    const requestUrl = new URL(request.url);
    const pathname = requestUrl.pathname;
    const githubPath = pathname.replace(githubApiPath, '');

    const githubUrl = `${githubApiUrl}${githubPath}`;

    const searchParams = requestUrl.searchParams.toString();
    const url = searchParams ? `${githubUrl}?${searchParams}` : githubUrl;

    const githubResponse = await fetch(url, {
      method: 'GET',
      headers,
    });

    const allowedHeaders = [
      'last-modified',
      'x-oauth-scopes',
      'x-accepted-oauth-scopes',
      'x-oauth-client-id',
      'x-github-media-type',
      'x-github-api-version-selected',
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-ratelimit-reset',
      'x-ratelimit-used',
      'x-ratelimit-resource',
      'x-github-request-id',
    ];

    const responseHeaders = new Headers();
    githubResponse.headers.forEach((value, key) => {
      if (allowedHeaders.includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    const responseData = await githubResponse.json();

    return NextResponse.json(
      { data: responseData, success: true },
      {
        status: githubResponse.status,
        headers: responseHeaders,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
        success: false,
      } as const,
      { status: 500 },
    );
  }
}

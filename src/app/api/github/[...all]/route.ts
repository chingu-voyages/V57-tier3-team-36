import { NextRequest, NextResponse } from 'next/server';
import { githubApiPath, githubApiUrl } from '@/lib/github/constants';
import { getServerSession } from '@/lib/auth/getServerSession';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
): Promise<NextResponse<unknown>> {
  try {
    const data = await getServerSession();

    if (!data.isAuthenticated) {
      return NextResponse.json(
        {
          error: '401 Unauthorized',
        },
        { status: 401 },
      );
    }

    const headers = new Headers({
      Accept: request.headers.get('accept') || 'application/vnd.github.v3+json',
    });
    const userId = data.user.id;

    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: 'github',
        userId,
      },
    });
    headers.set('Authorization', `Bearer ${accessToken}`);

    const userAgent = `${process.env.APP_NAME}/${process.env.APP_VERSION} (+${process.env.NEXT_PUBLIC_BASE_URL})`;
    headers.set('User-Agent', userAgent);

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

    return NextResponse.json(responseData, {
      status: githubResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

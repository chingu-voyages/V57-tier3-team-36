import { NextRequest, NextResponse } from 'next/server';
import { githubApiPath, githubApiUrl } from '@/lib/github/constants';
import { requireAuth } from '@/lib/auth/requireAuth';
import { getBearerAccessToken } from '@/lib/auth/getBearerAccessToken';
import * as Response from '@/lib/response';
import { fetchRequest } from '@/lib/request';

export async function proxy<T>(
  request: NextRequest
): Promise<NextResponse<Result<T>>> {
  try {
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) return Response.Unauthorized;

    const bearerToken = await getBearerAccessToken();
    if (!bearerToken) return Response.Unauthorized;

    // Security check: Only allow POST for GraphQL requests
    const method = request.method;
    if (method === 'POST') {
      const requestUrl = new URL(request.url);
      const { pathname }= requestUrl;
      const githubPath = pathname.replace(githubApiPath, '');

      if (githubPath !== '/graphql') {
        return Response.MethodNotAllowed;
      }
    }

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

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    // For POST requests, include the request body
    if (method === 'POST') {
      try {
        const body = await request.text();
        if (body) {
          fetchOptions.body = body;
        }
      } catch (error) {
        console.warn('Could not read request body:', error);
        return Response.BadRequest;
      }
    }

    const githubResponse = await fetchRequest(url, fetchOptions);

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
      }
    );
  } catch (error) {
    console.warn('Could not complete request:', error);
    return Response.InternalServerError;
  }
}

import { http, HttpResponse, passthrough } from 'msw';
import publicRepos from './data/repos-public.json';

export const handlers = [
  // Do not intercept database requests.
  http.all('*neon.tech*', () => passthrough()),

  // Do not intercept auth requests.
  http.post('https://github.com/login/oauth/access_token', () => passthrough()),
  http.get('https://api.github.com/user', () => passthrough()),
  http.get('https://api.github.com/user/emails', () => passthrough()),

  http.get(`${process.env.GITHUB_API_URL}/user/repos`, () => {
    return HttpResponse.json(publicRepos);
  }),
];

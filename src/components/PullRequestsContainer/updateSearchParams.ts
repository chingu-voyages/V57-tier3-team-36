import type { PRFilterState } from '@/types/PRFilterState';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface updateSearchParamsProps {
  query: string;
  filters: PRFilterState;
  dir: string;
  searchParams: URLSearchParams;
  router: AppRouterInstance;
}

export default function updateSearchParams({
  query,
  filters,
  dir,
  searchParams,
  router,
}: updateSearchParamsProps) {
  const params = new URLSearchParams(searchParams.toString());

  if (query.trim()) params.set('q', query.trim());
  else params.delete('q');

  if (filters.prStatus) params.set('status', filters.prStatus);
  else params.delete('status');

  if (filters.involvesMe) params.set('involves', String(filters.involvesMe));
  else params.delete('involves');

  if (filters.reviewProgress) params.set('review', filters.reviewProgress);
  else params.delete('review');

  const currentDir = dir;
  params.delete('dir');

  const orderedParams = new URLSearchParams();
  for (const [key, value] of params.entries()) {
    orderedParams.append(key, value);
  }
  orderedParams.append('dir', currentDir);

  const newUrl = `?${orderedParams.toString()}`;
  const currentUrl = `?${searchParams.toString()}`;
  if (newUrl !== currentUrl) {
    router.replace(newUrl);
  }
}

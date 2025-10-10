import type { PRFilterState } from '@/types/PRFilterState';

export default function isDefaultFilters(
  filters: PRFilterState,
  query: string
) {
  const isDefaultFilters =
    filters.prStatus === 'open' &&
    filters.involvesMe === false &&
    filters.reviewProgress === null;

  return isDefaultFilters && !query.trim();
}

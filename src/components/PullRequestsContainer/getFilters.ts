import type { PRFilterState } from '@/types/PRFilterState';
import { type ReadonlyURLSearchParams } from 'next/navigation';

export const getFilters = (searchParams: ReadonlyURLSearchParams) => {
  const status = searchParams.get('status') || '';
  const prStatus = ['open', 'merged'].includes(status) ? status : 'open';

  const involvesMe = searchParams.get('involves') === 'true';

  const review = searchParams.get('review') || '';
  const reviewProgress = ['none', 'approved', 'changes_requested'].includes(
    review
  )
    ? review
    : null;

  return {
    prStatus,
    involvesMe,
    reviewProgress,
  } as PRFilterState;
};

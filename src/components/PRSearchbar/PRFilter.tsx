'use client';

import ResetIcon from '@/icons/ResetIcon';
import { PRFilterState } from '@/types/PRFilterState';
import { useState } from 'react';

export default function PRFilter({
  filters,
  setFilters,
}: {
  filters: PRFilterState;
  setFilters: (filters: PRFilterState) => void;
}) {
  const [prStatus, setPrStatus] = useState<'open' | 'merged'>('open');
  const [involvesMe, setInvolvesMe] = useState<boolean>(false);
  const [reviewProgress, setReviewProgress] = useState<
    'none' | 'approved' | 'changes_requested' | null
  >(null);

  const handleReset = () => {
    setPrStatus('open');
    setInvolvesMe(false);
    setReviewProgress(null);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline">
        Filters
      </div>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 shadow-md rounded-box w-96 p-4 flex flex-col border border-base-300"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-content">
            Status
          </div>
          <div className="join">
            <input
              className="join-item btn btn-sm btn-outline w-16"
              type="radio"
              name="status"
              aria-label="Open"
              checked={prStatus === 'open'}
              onChange={() => setPrStatus('open')}
            />
            <input
              className="join-item btn btn-sm btn-outline w-16"
              type="radio"
              name="status"
              aria-label="Merged"
              checked={prStatus === 'merged'}
              onChange={() => setPrStatus('merged')}
            />
          </div>
        </div>
        <div className="divider m-0" />
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-content">
            Involving Me
          </div>
          <input
            type="checkbox"
            className="checkbox checkbox-lg checkbox-primary [&:checked]:shadow-none"
            checked={involvesMe}
            onChange={e => setInvolvesMe(e.target.checked)}
          />
        </div>
        <div className="divider m-0" />
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-neutral-content">
            Review Progress
          </div>
          <form
            className="filter"
            onReset={e => {
              e.preventDefault();
              setReviewProgress(null);
            }}
          >
            <input className="btn btn-square" type="reset" value="×" />
            <input
              className="btn text-xs"
              type="radio"
              name="review progress"
              aria-label="Not Reviewed"
              checked={reviewProgress === 'none'}
              onChange={() => setReviewProgress('none')}
            />
            <input
              className="btn text-xs"
              type="radio"
              name="review progress"
              aria-label="Approved"
              checked={reviewProgress === 'approved'}
              onChange={() => setReviewProgress('approved')}
            />
            <input
              className="btn  text-xs"
              type="radio"
              name="review progress"
              aria-label="Changes Requested"
              checked={reviewProgress === 'changes_requested'}
              onChange={() => setReviewProgress('changes_requested')}
            />
          </form>
        </div>
        <div className="divider m-0" />
        <div className="flex flex gap-2">
          <button className="btn flex-1 btn-primary btn-outline">
            Apply Filters
          </button>
          <button
            className="btn flex-1 btn-secondary btn-outline"
            onClick={handleReset}
          >
            Clear Filters
            <ResetIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function PRFilter() {
  const [prStatus, setPrStatus] = useState<'open' | 'merged'>('open');
  const [relatedToMe, setRelatedToMe] = useState<boolean | null>(null);
  const [reviewProgress, setReviewProgress] = useState<
    'none' | 'approved' | 'changes_requested' | null
  >(null);

  const handleReset = () => {
    setPrStatus('open');
    setRelatedToMe(null);
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
          <div className="join ">
            <input
              className="join-item btn btn-sm btn-outline w-16"
              type="radio"
              name="status"
              aria-label="Open"
              defaultChecked
            />
            <input
              className="join-item btn btn-sm btn-outline w-16"
              type="radio"
              name="status"
              aria-label="Merged"
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
          />
        </div>
        <div className="divider m-0" />
        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-neutral-content">
            Review Progress
          </div>
          <form className="filter">
            <input className="btn btn-square" type="reset" value="×" />
            <input
              className="btn text-xs"
              type="radio"
              name="review progress"
              aria-label="Not Reviewed"
            />
            <input
              className="btn text-xs"
              type="radio"
              name="review progress"
              aria-label="Approved"
            />
            <input
              className="btn  text-xs"
              type="radio"
              name="review progress"
              aria-label="Changes Requested"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

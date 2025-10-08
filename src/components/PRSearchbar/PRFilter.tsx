'use client';

import ResetIcon from '@/icons/ResetIcon';
import { PRFilterState } from '@/types/PRFilterState';
import { useEffect, useRef, useState } from 'react';

export default function PRFilter({
  filters,
  setFilters,
}: {
  filters: PRFilterState;
  setFilters: (filters: PRFilterState) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [prStatusInput, setPrStatusInput] = useState<'open' | 'merged'>(
    filters.prStatus
  );
  const [involvesMeInput, setInvolvesMeInput] = useState<boolean>(
    filters.involvesMe
  );
  const [reviewProgressInput, setReviewProgressInput] = useState<
    'none' | 'approved' | 'changes_requested' | null
  >(filters.reviewProgress ?? null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setFilters({
      prStatus: 'open',
      involvesMe: false,
      reviewProgress: null,
    });
    setPrStatusInput('open');
    setInvolvesMeInput(false);
    setReviewProgressInput(null);
  };
  const applyFilters = () => {
    setFilters({
      prStatus: prStatusInput,
      involvesMe: involvesMeInput,
      reviewProgress: reviewProgressInput,
    });
    setPending(true);
  };

  useEffect(() => {
    if (pending) {
      const timer = setTimeout(() => {
        setOpen(false);
        setPending(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [filters, pending]);

  useEffect(() => {
    if (!open) {
      setPrStatusInput(filters.prStatus);
      setInvolvesMeInput(filters.involvesMe);
      setReviewProgressInput(filters.reviewProgress ?? null);
    }
  }, [open, filters]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('pointerdown', handleOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        role="button"
        className="btn btn-outline cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Filters
      </div>
      {open && (
        <div className="absolute right-0 mt-2 bg-base-100 shadow-md rounded-box w-96 p-4 flex flex-col border border-base-300 z-50">
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
                checked={prStatusInput === 'open'}
                onChange={() => setPrStatusInput('open')}
              />
              <input
                className="join-item btn btn-sm btn-outline w-16"
                type="radio"
                name="status"
                aria-label="Merged"
                checked={prStatusInput === 'merged'}
                onChange={() => setPrStatusInput('merged')}
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
              checked={involvesMeInput}
              onChange={e => setInvolvesMeInput(e.target.checked)}
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
                setReviewProgressInput(null);
              }}
            >
              <input className="btn btn-square" type="reset" value="×" />
              <input
                className="btn text-xs"
                type="radio"
                name="review progress"
                aria-label="Not Reviewed"
                checked={reviewProgressInput === 'none'}
                onChange={() => setReviewProgressInput('none')}
              />
              <input
                className="btn text-xs"
                type="radio"
                name="review progress"
                aria-label="Approved"
                checked={reviewProgressInput === 'approved'}
                onChange={() => setReviewProgressInput('approved')}
              />
              <input
                className="btn  text-xs"
                type="radio"
                name="review progress"
                aria-label="Changes Requested"
                checked={reviewProgressInput === 'changes_requested'}
                onChange={() => setReviewProgressInput('changes_requested')}
              />
            </form>
          </div>
          <div className="divider m-0" />
          <div className="flex flex gap-2">
            <button
              className="btn flex-1 btn-primary btn-outline"
              onClick={applyFilters}
            >
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
      )}
    </div>
  );
}

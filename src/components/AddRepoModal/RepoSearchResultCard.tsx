'use client';

import { useAppContext } from '@/hooks/useAppContext';

export function RepoSearchResultCard({
  id,
  name,
  description,
  url,
}: {
  id: number;
  name: string;
  description: string | null;
  url: string;
}) {
  const { addRepo, removeRepo, isLoadingRepos, repos } = useAppContext();

  const isAdded = repos?.some(repo => repo.id === id);

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body flex-row justify-between">
        <div className="flex flex-col gap-2 flex-1 min-w-0  ">
          <h2 className="card-title">{name}</h2>
          <p className="truncate whitespace-normal">{description}</p>
          <p>{url}</p>
        </div>
        <div className="card-actions shrink-0">
          {isLoadingRepos ? (
            <button className="btn btn-disabled">
              <span className="loading loading-dots" />
            </button>
          ) : isAdded ? (
            <div className="group">
              <button
                className="btn btn-success"
                onClick={() => removeRepo?.(id!.toString())}
              >
                <span className="block group-hover:hidden">Added</span>
                <span className="hidden group-hover:block">Remove</span>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => addRepo?.(id.toString())}
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

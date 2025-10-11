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
  const { repos, addRepo, removeRepo, isLoadingRepos } = useAppContext();
  const isUserRepo = repos && repos.some(repo => repo.id === id);

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
          ) : isUserRepo ? (
            <button
              className="btn btn-secondary"
              onClick={() => removeRepo?.(id.toString())}
            >
              - Remove
            </button>
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

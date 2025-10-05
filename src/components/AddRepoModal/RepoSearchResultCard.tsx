'use client';

import { useRepoService } from '@/hooks/useRepoService';
import { useState } from 'react';

export function RepoSearchResultCard({
  id,
  name,
  description,
  tracked,
  setTrackedRepos,
  setCurrentRepo,
  url,
}: {
  id: number | null;
  name: string;
  description: string | null;
  tracked: boolean;
  setTrackedRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  setCurrentRepo: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  url: string;
}) {
  const { createUserRepo, fetchUserRepos, deleteUserRepo } = useRepoService();
  const [loading, setLoading] = useState(false);

  const onSelected = async (id: string) => {
    try {
      setLoading(true);
      await createUserRepo(id);
      const repos = await fetchUserRepos();
      setTrackedRepos([...repos]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRepo = async (repoId: string) => {
    try {
      setLoading(true);
      await deleteUserRepo(repoId);
      const repos = await fetchUserRepos();

      setTrackedRepos([...repos]);
      setCurrentRepo([...repos]);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body flex-row justify-between">
        <div className="flex flex-col gap-2 flex-1 min-w-0  ">
          <h2 className="card-title">{name}</h2>
          <p className="truncate whitespace-normal">{description}</p>
          <p>{url}</p>
        </div>
        <div className="card-actions shrink-0">
          {loading ? (
            <button className="btn btn-disabled">
              <span className="loading loading-dots" />
            </button>
          ) : tracked ? (
            <div className="group">
              <button
                className="btn btn-success"
                onClick={() => deleteRepo(id!.toString())}
              >
                <span className="block group-hover:hidden">Selected</span>
                <span className="hidden group-hover:block">Deselect</span>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => onSelected?.(id!.toString())}
            >
              + Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

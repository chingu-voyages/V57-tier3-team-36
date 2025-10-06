'use client';

import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
import RepoDropdownList from '@/components/Header/RepoDropdownList';
import { useEffect, useRef, useState } from 'react';

export default function RepoDropdown() {
  const [trackedRepos, setTrackedRepos] = useState<GitHubRepo[]>([]);
  const [currentRepo, setCurrentRepo] = useState<GitHubRepo[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleRepoClick = (repoName: string) => {
    setTrackedRepo(repoName);
    window.dispatchEvent(
      new CustomEvent('repoChanged', { detail: { repo: repoName } })
    );
  };
  const handleRepoClick = (repo: GitHubRepo[]) => {
    setCurrentRepo(_prevRepos => [...repo]);
  };

  useEffect(() => {
    if (trackedRepos.length > 0 && currentRepo.length === 0) {
      setCurrentRepo(trackedRepos);
    }
  }, [trackedRepos]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        {currentRepo.length === 0
          ? 'Select Repository'
          : currentRepo.length > 1
            ? 'All Repositories'
            : currentRepo[0].name}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm p-0"
      >
        <li
          className="border-b-2 border-gray-200"
          onClick={() => handleRepoClick(trackedRepos)}
        >
          <a>All Repositories</a>
        </li>
        <RepoDropdownList
          onClick={handleRepoClick}
          repos={trackedRepos}
          setRepos={setTrackedRepos}
          setCurrentRepo={setCurrentRepo}
        />
        <li
          className="text-primary border-t-2 border-gray-200"
          onClick={() => modalRef?.current?.showModal()}
        >
          <a>+ Add Repository</a>
        </li>
      </ul>
      <AddRepoModal
        trackedRepoIds={trackedRepos.map(repo => repo.id)}
        setTrackedRepos={setTrackedRepos}
        setCurrentRepo={setCurrentRepo}
        modalRef={modalRef}
      />
    </div>
  );
}

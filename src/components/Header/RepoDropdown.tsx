'use client';

import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
import RepoDropdownList from '@/components/Header/RepoDropdownList';
import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

export default function RepoDropdown() {
  const { repos, isLoadingRepos, modalRef } = useAppContext();
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo>();
  const noneAvailable = !isLoadingRepos && repos && repos.length === 0;

  return (
    <div data-label="RepoDropdown" className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        {noneAvailable
          ? 'Select Repository'
          : !selectedRepo
            ? 'All Repositories'
            : selectedRepo.name}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm p-0"
      >
        <li
          className="border-b-2 border-gray-200"
          onClick={() => {
            setSelectedRepo(undefined);
          }}
        >
          <a>All Repositories</a>
        </li>
        <RepoDropdownList setSelectedRepo={setSelectedRepo} />
        <li
          className="text-primary border-t-2 border-gray-200"
          onClick={() => modalRef?.current?.showModal()}
        >
          <a>+ Add Repository</a>
        </li>
      </ul>
      {/* <AddRepoModal
        trackedRepoIds={trackedRepos.map(repo => repo.id)}
        setTrackedRepos={setTrackedRepos}
        setCurrentRepo={setCurrentRepo}
      /> */}
    </div>
  );
}

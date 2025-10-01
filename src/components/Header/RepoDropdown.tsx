'use client';

import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
import RepoDropdownList from '@/components/Header/RepoDropdownList';
import { useState } from 'react';

export default function RepoDropdown() {
  const [trackedRepo, setTrackedRepo] = useState('All Repositories');

  const handleRepoClick = (repoName: string) => {
    setTrackedRepo(repoName);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        {trackedRepo}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li
          className="border-b-2 border-gray-200"
          onClick={() => handleRepoClick('All Repositories')}
        >
          <a>All Repositories</a>
        </li>
        <RepoDropdownList onClick={handleRepoClick} />
        <li
          className="text-primary border-t-2 border-gray-200"
          onClick={() => {
            const modalElement = document.getElementById(
              'AddRepoModal'
            ) as HTMLDialogElement;
            modalElement?.showModal();
          }}
        >
          <a>+ Add Repository</a>
        </li>
      </ul>
      <AddRepoModal />
    </div>
  );
}

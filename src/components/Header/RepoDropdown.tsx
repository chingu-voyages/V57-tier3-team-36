'use client';

import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
import RepoDropdownList from '@/components/Header/RepoDropdownList';
import { useAppContext } from '@/hooks/useAppContext';

export default function RepoDropdown() {
  const { repos, modalRef, selectRepo, selectedRepo } = useAppContext();
  const label = selectedRepo
    ? selectedRepo.name
    : repos && repos.length > 1
      ? 'All Repositories'
      : 'Select Repository';

  return (
    <div data-label="RepoDropdown" className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        {label}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm p-0"
      >
        <li
          className="border-b-2 border-gray-200"
          onClick={() => {
            selectRepo?.(undefined);
          }}
        >
          <a>All Repositories</a>
        </li>
        <RepoDropdownList />
        <li
          className="text-primary border-t-2 border-gray-200"
          onClick={() => modalRef?.current?.showModal()}
        >
          <a>+ Add Repository</a>
        </li>
      </ul>
      <AddRepoModal />
    </div>
  );
}

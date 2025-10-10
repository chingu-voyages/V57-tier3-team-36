'use client';

import { useAuth } from '@/hooks/useAuth';
import DeleteIcon from '@/icons/DeleteIcon';
import { useAppContext } from '@/hooks/useAppContext';

export default function RepoDropdownList() {
  const { repos, removeRepo, isLoadingRepos, selectRepo } = useAppContext();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  if (isLoadingRepos)
    return (
      <li className="flex justify-center items-center p-2">
        <span className="loading loading-spinner loading-md" />
      </li>
    );

  if (repos?.length === 0)
    return (
      <li>
        <span className="text-gray-500 italic">No repositories tracked.</span>
      </li>
    );

  return (
    <>
      {repos?.map(repo =>
        !repo ? null : (
          <li
            key={repo.id}
            onClick={() => {
              selectRepo?.(repo.id.toString());
            }}
          >
            <div className="flex justify-between items-center">
              <a>{repo.name}</a>
              <div
                className="cursor-pointer  hover:text-red-500"
                onClick={() => removeRepo?.(repo.id.toString())}
              >
                <DeleteIcon />
              </div>
            </div>
          </li>
        )
      )}
    </>
  );
}

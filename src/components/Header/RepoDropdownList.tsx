'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRepoService } from '@/hooks/useRepoService';
import DeleteIcon from '@/icons/DeleteIcon';
import { useEffect, useState } from 'react';

export default function RepoDropdownList({
  onClick,
  repos,
  setRepos,
}: {
  onClick: (repo: GitHubRepo[]) => void;
  repos: GitHubRepo[];
  setRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const { fetchUserRepos, deleteUserRepo } = useRepoService();
  const user = useAuth().user;

  const fetchRepos = async () => {
    try {
      setLoading(true);
      const repos = await fetchUserRepos();
      setRepos(repos);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRepo = async (repoId: string) => {
    try {
      setLoading(true);
      await deleteUserRepo(repoId);
      fetchRepos();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchRepos();
  }, [user]);

  if (loading)
    return (
      <li className="flex justify-center items-center p-2">
        <span className="loading loading-spinner loading-md" />
      </li>
    );

  if (repos.length === 0)
    return (
      <li>
        <span className="text-gray-500 italic">No repositories tracked.</span>
      </li>
    );

  return (
    <>
      {repos.map(repo => (
        <li key={repo.id} onClick={() => onClick([repo])}>
          <div className="flex justify-between items-center">
            <a>{repo.name}</a>
            <div
              className="cursor-pointer  hover:text-red-500"
              onClick={() => deleteRepo(repo.id.toString())}
            >
              <DeleteIcon />
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

// 'use client';

// import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
// import RepoDropdownList from '@/components/Header/RepoDropdownList';
// import { useEffect, useState } from 'react';

// export default function RepoDropdown() {
//   const [trackedRepos, setTrackedRepos] = useState<GitHubRepo[]>([]);
//   const [currentRepo, setCurrentRepo] = useState<GitHubRepo[]>([]);

//   /** Handle clicking a repo or "All Repositories" */
//   const handleRepoClick = (repo: GitHubRepo[] | 'all') => {
//     if (repo === 'all') {
//       setCurrentRepo(trackedRepos);
//       window.dispatchEvent(
//         new CustomEvent('repoChanged', { detail: { repo: 'all' } })
//       );
//     } else {
//       setCurrentRepo(repo);
//       window.dispatchEvent(
//         new CustomEvent('repoChanged', { detail: { repo } })
//       );
//     }
//   };

//   /** Ensure that if we have trackedRepos but no currentRepo, we set them */
//   useEffect(() => {
//     if (trackedRepos.length > 0 && currentRepo.length === 0) {
//       setCurrentRepo(trackedRepos);
//     }
//   }, [trackedRepos, currentRepo]);

//   return (
//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} role="button" className="btn m-1">
//         {currentRepo.length === 0
//           ? 'Select Repository'
//           : currentRepo.length > 1
//             ? 'All Repositories'
//             : currentRepo[0].name}
//       </div>

//       <ul
//         tabIndex={0}
//         className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
//       >
//         {/* All Repositories option */}
//         <li
//           className="border-b-2 border-gray-200"
//           onClick={() => handleRepoClick('all')}
//         >
//           <a>All Repositories</a>
//         </li>

//         {/* Repo list fetched from API via RepoDropdownList */}
//         <RepoDropdownList
//           onClick={handleRepoClick}
//           repos={trackedRepos}
//           setRepos={setTrackedRepos}
//           setCurrentRepo={setCurrentRepo}
//         />

//         {/* Add Repository modal trigger */}
//         <li
//           className="text-primary border-t-2 border-gray-200"
//           onClick={() => {
//             const modalElement = document.getElementById(
//               'AddRepoModal'
//             ) as HTMLDialogElement;
//             modalElement?.showModal();
//           }}
//         >
//           <a>+ Add Repository</a>
//         </li>
//       </ul>

//       {/* Add Repository modal */}
//       <AddRepoModal
//         trackedRepoIds={trackedRepos.map(repo => repo.id)}
//         setTrackedRepos={setTrackedRepos}
//         setCurrentRepo={setCurrentRepo}
//       />
//     </div>
//   );
// }

'use client';

import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
import RepoDropdownList from '@/components/Header/RepoDropdownList';
import GitHubRepo from '@/types/global'; // optional, if you have a type file

export default function RepoDropdown({
  trackedRepos,
  setTrackedRepos,
  currentRepo,
  setCurrentRepo,
}: {
  trackedRepos: GitHubRepo[];
  setTrackedRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  currentRepo: GitHubRepo[];
  setCurrentRepo: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  /**
   * Handles when a user clicks a repo or "All Repositories".
   * The selection is now lifted to the parent, no custom events.
   */
  const handleRepoClick = (repo: GitHubRepo[] | 'all') => {
    if (repo === 'all') {
      setCurrentRepo(trackedRepos);
    } else {
      setCurrentRepo(repo);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown button */}
      <div tabIndex={0} role="button" className="btn m-1">
        {currentRepo.length === 0
          ? 'Select Repository'
          : currentRepo.length > 1
            ? 'All Repositories'
            : currentRepo[0].name}
      </div>

      {/* Dropdown menu */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {/* Select all option */}
        <li
          className="border-b-2 border-gray-200"
          onClick={() => handleRepoClick('all')}
        >
          <a>All Repositories</a>
        </li>

        {/* Dynamic list of tracked repos */}
        <RepoDropdownList
          onClick={handleRepoClick}
          repos={trackedRepos}
          setRepos={setTrackedRepos}
          setCurrentRepo={setCurrentRepo}
        />

        {/* Add new repo option */}
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

      {/* Modal for adding new repositories */}
      <AddRepoModal
        trackedRepoIds={trackedRepos.map(repo => repo.id)}
        setTrackedRepos={setTrackedRepos}
        setCurrentRepo={setCurrentRepo}
      />
    </div>
  );
}

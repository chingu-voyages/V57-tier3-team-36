// 'use client';

// import RepoDropdown from '@/components/Header/RepoDropdown';

// export default function Header() {
//   return (
//     <header className="w-full p-4">
//       <div
//         data-label="HeaderContents"
//         className="w-full flex items-center justify-between gap-4"
//       >
//         <h1 className="text-2xl font-bold tracking-tight">
//           <span className="text-accent">Merge</span>
//           <span>Force</span>
//         </h1>

//         <RepoDropdown/>
//       </div>
//     </header>
//   );
// }

'use client';

import { useState } from 'react';
import RepoDropdown from '@/components/Header/RepoDropdown';

export default function Header() {
  const [trackedRepos, setTrackedRepos] = useState<GitHubRepo[]>([]);
  const [currentRepo, setCurrentRepo] = useState<GitHubRepo[]>([]);

  return (
    <header className="w-full p-4">
      <div
        data-label="HeaderContents"
        className="w-full flex items-center justify-between gap-4"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-accent">Merge</span>
          <span>Force</span>
        </h1>

        <RepoDropdown
          trackedRepos={trackedRepos}
          setTrackedRepos={setTrackedRepos}
          currentRepo={currentRepo}
          setCurrentRepo={setCurrentRepo}
        />
      </div>
    </header>
  );
}

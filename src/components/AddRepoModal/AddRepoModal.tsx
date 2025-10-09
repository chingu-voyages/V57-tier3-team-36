import { SearchComponent } from './SearchComponent';
import { useAppContext } from '@/hooks/useAppContext';

export default function AddRepoModal({
  trackedRepoIds,
  setTrackedRepos,
  setCurrentRepo,
}: {
  trackedRepoIds: number[];
  setTrackedRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  setCurrentRepo: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  const { modalRef } = useAppContext();

  return (
    <dialog data-label="AddRepoModal" className="modal" ref={modalRef}>
      <div className="modal-box max-w-3xl max-h-3/5 p-0">
        <SearchComponent
          trackedRepoIds={trackedRepoIds}
          setTrackedRepos={setTrackedRepos}
          setCurrentRepo={setCurrentRepo}
        />
      </div>
    </dialog>
  );
}

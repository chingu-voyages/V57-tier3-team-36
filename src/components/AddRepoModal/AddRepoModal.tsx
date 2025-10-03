import { SearchComponent } from './SearchComponent';

export default function AddRepoModal({
  trackedRepoIds,
  setTrackedRepos,
  setCurrentRepo,
}: {
  trackedRepoIds: number[];
  setTrackedRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  setCurrentRepo: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  return (
    <>
      <dialog id="AddRepoModal" className="modal">
        <div className="modal-box max-w-3xl max-h-3/5 p-0">
          <SearchComponent
            trackedRepoIds={trackedRepoIds}
            setTrackedRepos={setTrackedRepos}
            setCurrentRepo={setCurrentRepo}
          />
        </div>
      </dialog>
    </>
  );
}

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
        <div className="modal-box max-w-3xl max-h-3/5">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Add Repository to Track</h3>
            <SearchComponent
              trackedRepoIds={trackedRepoIds}
              setTrackedRepos={setTrackedRepos}
              setCurrentRepo={setCurrentRepo}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}

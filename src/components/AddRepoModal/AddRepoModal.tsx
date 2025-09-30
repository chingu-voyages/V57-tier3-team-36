import { SearchComponent } from './SearchComponent';

export default function AddRepoModal() {
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
            <SearchComponent />
          </div>
        </div>
      </dialog>
    </>
  );
}

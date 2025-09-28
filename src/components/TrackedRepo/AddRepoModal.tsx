import { requireAuth } from '@/lib/auth/requireAuth';
import { apiHandlers } from '@/lib/github/apiHandlers';
import { createApi } from '@/lib/github/server';

export default async function AddRepoModal() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  const api: ReturnType<typeof apiHandlers> = (await createApi()) as ReturnType<
    typeof apiHandlers
  >;
  const repos = await api.getUserRepos();
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        open modal
      </button> */}
      <dialog id="AddRepoModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Repo</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
}

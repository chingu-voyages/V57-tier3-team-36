// No 'use client' needed unless you add state/effects.
export default function DashHeaderBar() {
  return (
    <div className="navbar bg-base-200 shadow">
      <div className="navbar-start">
        <button className="btn btn-ghost text-xl">
          <span className="mr-2">🌟</span> MergeForce
        </button>
      </div>
      <div className="navbar-end">
        <label className="input input-bordered flex items-center w-64 md:w-68">
          {/* search icon <svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
               viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" d="M21 21l-4.35-4.35m1.35-4.65a6 6 0 11-12 0 6 6 0 0112 0z"/>
          </svg>
          <input type="text" className="grow" placeholder="Search…" />
        </label>
      </div>
    </div>
  );
}

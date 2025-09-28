import TrackedRepoList from './TrackedRepoList';

export default function RepoDropdown() {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        All Repos
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <a>All Repos</a>
        </li>
        <div className="divider" />
        <TrackedRepoList />
        <div className="divider" />
        <li className="text-primary">
          <a>+ Add Repo</a>
        </li>
      </ul>
    </div>
  );
}

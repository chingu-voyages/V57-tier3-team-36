type RepoSearchResultCardProps = Partial<GitHubRepo> & {
  onSelected?: (id: number) => void;
};
export function RepoSearchResultCard({
  id,
  name,
  description,
  onSelected,
}: RepoSearchResultCardProps) {
  return (
    <div className="card card-border bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description ? description : "No description provided."}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => onSelected?.(id!)}>
            + Select
          </button>
        </div>
      </div>
    </div>
  );
}

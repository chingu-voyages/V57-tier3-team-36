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
    <div className="card card-border bg-base-100">
      <div className="card-body flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="card-title">{name}</h2>
          <p>{description ? description : 'No description provided.'}</p>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => onSelected?.(id!)}>
            + Select
          </button>
        </div>
      </div>
    </div>
  );
}

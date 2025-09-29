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
        <div className="flex flex-col gap-2 flex-1 min-w-0  ">
          <h2 className="card-title">{name}</h2>
          <p className="truncate whitespace-normal">
            {description ? description : 'No description provided.'}
          </p>
        </div>
        <div className="card-actions shrink-0">
          <button className="btn btn-primary" onClick={() => onSelected?.(id!)}>
            + Select
          </button>
        </div>
      </div>
    </div>
  );
}

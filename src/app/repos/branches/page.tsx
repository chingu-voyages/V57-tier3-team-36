"use client";

import { usePagination } from "@/hooks/use-pagination";
import { getBranchesForRepo } from "@/lib/github-repo-actions/github-repo-actions";

export default function ListBranchesPage() {
  const { navigate, fetchResults, nextPage, previousPage } =
    usePagination<GitHubBranch[]>();

  const handleFetch = async (event: React.FormEvent) => {
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    if (!submitter) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const reponame = formData.get("reponame") as string; // Github Repository Name

    // We should validate the data
    event.preventDefault();

    try {
      await navigate(getBranchesForRepo, submitter.name, username, reponame);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleFetch} className="flex flex-col gap-4">
        <label htmlFor="username">Enter GitHub Username:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter GitHub username"
          className="px-2 bg-black"
        />
        <label htmlFor="reponame">Enter GitHub Repository Name:</label>
        <input
          name="reponame"
          type="text"
          placeholder="Enter GitHub repository name"
          className="px-2 bg-black"
        />
        <button type="submit" name="initial">
          Fetch Branches
        </button>
        {!!nextPage && (
          <button type="submit" className="mt-2" name="next">
            Fetch Next Page
          </button>
        )}
        {!!previousPage && (
          <button type="submit" className="mt-2" name="previous">
            Fetch Previous Page
          </button>
        )}
      </form>
      <div>
        {fetchResults && (
          <ul>
            {fetchResults.map((branch: GitHubBranch) => (
              <li key={branch.name}>
                <strong>Branch Name:</strong> {branch.name} <br />
                <strong>Commit SHA:</strong> {branch.commit.sha} <br />
                <strong>Protected:</strong> {branch.protected ? "Yes" : "No"}
                <br />
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

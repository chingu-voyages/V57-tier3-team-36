"use client";

import { usePagination } from "@/hooks/use-pagination";
import { getClosedPullRequestsForRepo } from "@/lib/github-repo-actions/github-repo-actions";
import { useMemo, useState } from "react";

export default function ClosedPRsListPage() {
  // We should differentiate between closed PRs and merged PRs?

  const { navigate, fetchResults, nextPage, previousPage } =
    usePagination<GitHubPullRequest[]>();

  const [isFilterMergedChecked, setIsFilterMergedChecked] = useState(false);
  const handleStatusChange = () => {
    setIsFilterMergedChecked((prev) => !prev);
  };

  const handleGetClosedPrsForRepoUsername = async (event: React.FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const repo = formData.get("repo") as string; // Github Repo

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    if (!submitter) return;
    // We should validate the data
    event.preventDefault();

    try {
      await navigate(
        getClosedPullRequestsForRepo,
        submitter.name,
        username,
        repo
      );
    } catch (error) {
      console.error("Error fetching pull requests:", error);
    }
  };

  const filteredPrStatuses = useMemo(() => {
    if (!fetchResults) return null;
    if (isFilterMergedChecked) {
      const filteredClosedResults = fetchResults!.filter(
        (pr) => pr.merged_at !== null
      );
      console.log({ filteredClosedResults });
      return filteredClosedResults;
    }
    return fetchResults;
  }, [isFilterMergedChecked, fetchResults]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Closed PRs for repo (by this user)</h2>
      <div className="p-4">
        <label htmlFor="isMerged" className="btn modal-button">
          Show Merged PRs only
        </label>
        <input
          type="checkbox"
          name="isMerged"
          checked={isFilterMergedChecked}
          onChange={handleStatusChange}
          className="modal-toggle"
          id="my-modal-6"
        />
      </div>
      <form
        onSubmit={handleGetClosedPrsForRepoUsername}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Enter GitHub Username:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter GitHub username"
          className="px-2 bg-black"
        />
        <label htmlFor="repo">Enter GitHub Repo:</label>
        <input
          name="repo"
          type="text"
          placeholder="Enter GitHub repo"
          className="px-2 bg-black"
        />
        <button type="submit" name="initial">
          Fetch All PRs for this repo
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
        {filteredPrStatuses && (
          <ul>
            {filteredPrStatuses.map((pr) => (
              <li key={pr.id} className="mb-4 border-1 p-2 rounded-md shadow">
                <a href={pr.html_url} target="_blank" className="text-blue-600">
                  <h3 className="text-lg font-bold">{pr.title}</h3>
                </a>
                <p className="text-sm text-gray-500">
                  Created at: {new Date(pr.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Closed at: {new Date(pr.closed_at ?? "").toLocaleDateString()}
                </p>
                <p>
                  {pr.merged_at
                    ? `Merged at: ${new Date(
                        pr.merged_at
                      ).toLocaleDateString()}`
                    : "Not merged"}
                </p>
                <p className="text-sm">
                  {pr.body
                    ? pr.body.substring(0, 100) + "..."
                    : "No description"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

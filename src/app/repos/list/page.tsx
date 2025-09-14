"use client";

import { usePagination } from "@/hooks/use-pagination";
import { getAllReposForUsername } from "@/lib/github-repo-actions/github-repo-actions";

import Link from "next/link";

export default function ListReposPage() {
  const { navigate, fetchResults, nextPage, previousPage } =
    usePagination<GitHubRepo[]>();
  const handleGetReposForUsername = async (event: React.FormEvent) => {
    // Get the name of the submit button that was clicked
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    if (!submitter) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username

    // We should validate the data
    event.preventDefault();

    try {
      await navigate(getAllReposForUsername, submitter.name, username);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">GitHub Repositories for a username</h2>
      <form
        onSubmit={handleGetReposForUsername}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Enter GitHub Username:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter GitHub username"
          className="px-2 bg-black"
        />
        <button type="submit" name="initial">
          Fetch Repos
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

      <ul id="repo-list" className="mt-8">
        {fetchResults &&
          fetchResults.map((repo) => (
            <li key={repo.id} className="mb-4 border-1 p-2 rounded-md shadow">
              <Link
                href={repo.html_url}
                target="_blank"
                className="text-blue-600"
              >
                <h3 className="text-lg font-bold">{repo.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">
                Created at:{" "}
                {repo.created_at
                  ? new Date(repo.created_at).toLocaleDateString()
                  : "Unknown"}
              </p>
              <p className="mt-2">{repo.description || "No description"}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

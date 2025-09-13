"use client";

import { getAllReposForUsername } from "@/lib/github-repo-actions/github-repo-actions";
import type { GithubRepoData } from "@/types/github-api-data";
import Link from "next/link";
import { useState } from "react";

export default function ListReposPage() {
  const [githubRepoData, setGithubRepoData] = useState<GithubRepoData[] | null>(
    null
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleGetReposForUsername = async (event: React.FormEvent) => {
    // Get the name of the submit button that was clicked
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    console.log("submitter", submitter?.name);
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username

    // We should validate the data
    event.preventDefault();

    try {
      const response = await getAllReposForUsername<GithubRepoData[]>(
        username,
        pageNumber
      );

      if (submitter?.name === "nextPage" && response.nextPage) {
        console.log("Next page available:", response.nextPage);
        setPageNumber((prev) => prev + 1);
      } else if (submitter?.name === "previousPage" && pageNumber > 1) {
        if (pageNumber === 1) return;
        setPageNumber((prev) => prev - 1);
      } else if (submitter?.name === "initiator") {
        setPageNumber((prev) => prev + 1); // Reset to first page on new search
        setHasNextPage(!!response.nextPage);
      }
      setGithubRepoData(response.data);
      setHasNextPage(!!response.nextPage);
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
          className="px-2"
        />
        <button type="submit" name="initiator">
          Fetch Repos
        </button>
        {hasNextPage && (
          <button type="submit" className="mt-2" name="nextPage">
            Fetch Next Page
          </button>
        )}
        {pageNumber > 1 && (
          <button type="submit" className="mt-2" name="previousPage">
            Fetch Previous Page
          </button>
        )}
      </form>

      <ul id="repo-list" className="mt-8">
        {githubRepoData &&
          githubRepoData.map((repo) => (
            <li key={repo.id} className="mb-4 border-1 p-2 rounded-md shadow">
              <Link
                href={repo.html_url}
                target="_blank"
                className="text-blue-600"
              >
                <h3 className="text-lg font-bold">{repo.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">
                Created at: {new Date(repo.created_at).toLocaleDateString()}
              </p>
              <p className="mt-2">{repo.description || "No description"}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

"use client";

import { usePagination } from "@/hooks/use-pagination";
import { getOpenPullRequestsForRepo } from "@/lib/github-repo-actions/github-repo-actions";
import Image from "next/image";
import Link from "next/link";

export default function ListPrsPage() {
  const { navigate, fetchResults, nextPage, previousPage } =
    usePagination<GitHubPullRequest[]>();
  const handleGetPrsForRepoUsername = async (event: React.FormEvent) => {
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    if (!submitter) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const repo = formData.get("repo") as string; // Github Repo

    // We should validate the data
    event.preventDefault();

    try {
      await navigate(
        getOpenPullRequestsForRepo,
        submitter.name,
        username,
        repo
      );
    } catch (error) {
      console.error("Error fetching pull requests:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Open PRs for repo (by this user)</h2>
      <form
        onSubmit={handleGetPrsForRepoUsername}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Enter GitHub Username:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter GitHub username"
          className="px-2"
        />
        <label htmlFor="repo">Enter GitHub Repo:</label>
        <input
          name="repo"
          type="text"
          placeholder="Enter GitHub repo"
          className="px-2"
        />
        <button type="submit">Fetch PRs for this repo</button>
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
      <ul id="pr-list" className="mt-8">
        {fetchResults &&
          fetchResults.map((pr) => (
            <li key={pr.id} className="mb-4 border-1 p-2 rounded-md shadow">
              <Link
                href={pr.html_url}
                target="_blank"
                className="text-blue-600"
              >
                <h3 className="text-lg font-bold">{pr.title}</h3>
              </Link>
              <p className="text-sm text-gray-500">
                Opened by: {pr.user.login} on{" "}
                {new Date(pr.created_at).toLocaleDateString()}
              </p>
              <Image
                src={pr.user.avatar_url}
                alt={`${pr.user.login}'s avatar`}
                className="w-10 h-10 rounded-full mt-2"
              />
              <div className="mt-4">
                <h3 className="text-md">Requested Reviewers</h3>
                {pr.requested_reviewers && pr.requested_reviewers.length > 0 ? (
                  <ul className="flex space-x-4">
                    {pr.requested_reviewers.map((reviewer) => (
                      <li key={reviewer.login} className="text-center">
                        <Image
                          src={reviewer.avatar_url}
                          alt={`${reviewer.login}'s avatar`}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                        <p className="text-sm">{reviewer.login}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviewers requested</p>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

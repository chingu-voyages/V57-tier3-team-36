"use client";

import { usePagination } from "@/hooks/use-pagination";
import { getContributorsForRepo } from "@/lib/github-repo-actions/github-repo-actions";

import Image from "next/image";

export default function ListContributorsPage() {
  const { navigate, fetchResults, nextPage, previousPage } =
    usePagination<GitHubContributor[]>();
  const handleFetchContributorsForRepo = async (event: React.FormEvent) => {
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    if (!submitter) return;

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const repo = formData.get("repo") as string; // Github Repo

    event.preventDefault();
    // We should validate the data
    try {
      await navigate(getContributorsForRepo, submitter.name, username, repo);
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleFetchContributorsForRepo}
        className="flex flex-col gap-4"
      >
        <label htmlFor="username">Enter GitHub Username:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter GitHub username"
          className="px-2 bg-black"
          defaultValue={"microsoft"}
        />
        <label htmlFor="repo">Enter GitHub Repo:</label>
        <input
          name="repo"
          type="text"
          placeholder="Enter GitHub repo"
          className="px-2 bg-black"
          defaultValue={"vscode"}
        />
        <button type="submit" name="initial">
          Fetch All Contributors for this repo
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
            {fetchResults.map((contributor) => (
              <li
                key={contributor.id}
                className="mb-4 border-1 p-2 rounded-md shadow"
              >
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <Image
                    src={contributor.avatar_url!}
                    width={40}
                    height={40}
                    alt={contributor.login!}
                    className="w-10 h-10 rounded-full inline-block mr-2"
                  />
                  {contributor.login} ({contributor.contributions}{" "}
                  contributions)
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

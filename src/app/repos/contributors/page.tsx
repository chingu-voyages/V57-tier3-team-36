"use client";

import { GithubRepoClient } from "@/lib/github-repo-client/github-repo-client";
import { useState } from "react";
type GithubContributorData = {
  id: number;
  login: string;
  contributions: number;
  html_url: string; // Contributor URL
  avatar_url: string; // Contributor Avatar URL
};
export default function ListContributorsPage() {
  const [repoContributorData, setRepoContributorData] = useState<
    GithubContributorData[] | null
  >(null);

  const handleFetchContributorsForRepo = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const repo = formData.get("repo") as string; // Github Repo

    // We should validate the data
    const githubRepoClient = new GithubRepoClient();
    try {
      const data = await githubRepoClient.getContributorsForRepo<
        GithubContributorData[]
      >(username, repo);
      console.log(data);
      setRepoContributorData(data);
      // You can set this data to state if you want to display it
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
          className="px-2"
        />
        <label htmlFor="repo">Enter GitHub Repo:</label>
        <input
          name="repo"
          type="text"
          placeholder="Enter GitHub repo"
          className="px-2"
        />
        <button type="submit">Fetch All Contributors for this repo</button>
      </form>
      <div>
        {repoContributorData && (
          <ul>
            {repoContributorData.map((contributor) => (
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
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
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

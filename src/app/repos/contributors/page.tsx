"use client";

import { getContributorsForRepo } from "@/lib/github-repo-actions/github-repo-actions";
import type { GitHubUserData } from "@/types/github-api-data";
import Image from "next/image";
import { useState } from "react";

export default function ListContributorsPage() {
  const [repoContributorData, setRepoContributorData] = useState<
    GitHubUserData[] | null
  >(null);

  const handleFetchContributorsForRepo = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const repo = formData.get("repo") as string; // Github Repo

    // We should validate the data

    try {
      const data = await getContributorsForRepo<GitHubUserData[]>(
        username,
        repo
      );
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
                  <Image
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

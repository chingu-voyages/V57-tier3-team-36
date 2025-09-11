"use client";
import { GithubRepoClient } from "@/lib/github-repo-client/github-repo-client";
import Link from "next/link";
import { useState } from "react";
type GithubRepoData = {
  id: number;
  name: string;
  created_at: string;
  description: string | null;
  html_url: string; // Repo URL
};

export default function ListReposPage() {
  const [githubRepoData, setGithubRepoData] = useState<GithubRepoData[] | null>(
    null
  );

  const handleGetReposForUsername = async (event: React.FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username

    // We should validate the data
    event.preventDefault();

    const githubRepoClient = new GithubRepoClient();
    try {
      const data = await githubRepoClient.getAllReposForUsername<
        GithubRepoData[]
      >(username);
      console.info(data);
      setGithubRepoData(data);
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
        <button type="submit">Fetch All Repos for this user</button>
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

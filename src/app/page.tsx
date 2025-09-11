"use client";

import { GithubRepoClient } from "@/lib/github-repo-client/github-repo-client";
import { useState } from "react";

type GithubRepoData = {
  id: number;
  name: string;
  created_at: string;
  description: string | null;
};

type GithubPullRequestData = {
  id: number;
  title: string;
  user: GitHubUserData;
};

type GitHubUserData = {
  login: string;
  avatar_url: string;
};

export default function Home() {
  const [githubRepoData, setGithubRepoData] = useState<GithubRepoData[] | null>(
    null
  );
  const [repoOpenPrData, setRepoOpenPrData] = useState<
    GithubPullRequestData[] | null
  >(null);

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

  const handleGetPrsForRepoUsername = async (event: React.FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const repo = formData.get("repo") as string; // Github Repo

    // We should validate the data
    event.preventDefault();
    const githubRepoClient = new GithubRepoClient();
    try {
      const data = await githubRepoClient.getOpenPullRequestsForRepo<
        GithubPullRequestData[]
      >(username, repo);
      console.log(data);
      setRepoOpenPrData(data);
    } catch (error) {
      console.error("Error fetching pull requests:", error);
    }
  };
  return (
    <main className="flex justify-center max-w-4xl mx-auto p-4 gap-8">
      <div>
        <h2 className="text-2xl font-bold">
          GitHub Repositories for a username
        </h2>
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
                <h3 className="text-lg font-bold">{repo.name}</h3>
                <p className="text-sm text-gray-500">
                  Created at: {new Date(repo.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2">{repo.description || "No description"}</p>
              </li>
            ))}
        </ul>
      </div>
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
          <button type="submit">Fetch All PRs for this repo</button>
        </form>
        <ul id="pr-list" className="mt-8">
          {repoOpenPrData &&
            repoOpenPrData.map((pr) => (
              <li key={pr.id} className="mb-4 border-1 p-2 rounded-md shadow">
                <h3 className="text-lg font-bold">{pr.title}</h3>
                <p className="text-sm text-gray-500">
                  Opened by: {pr.user.login}
                </p>
                <img
                  src={pr.user.avatar_url}
                  alt={`${pr.user.login}'s avatar`}
                  className="w-10 h-10 rounded-full mt-2"
                />
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}

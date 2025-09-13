"use client";

import { getBranchesForRepo } from "@/lib/github-repo-actions/github-repo-actions";
import { useState } from "react";

type GitHubBranchData = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
};
export default function ListBranchesPage() {
  const [githubRepoData, setGithubRepoData] = useState<
    GitHubBranchData[] | null
  >(null);
  const handleFetch = async (event: React.FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username") as string; // Github Username
    const reponame = formData.get("reponame") as string; // Github Repository Name

    // We should validate the data
    event.preventDefault();

    try {
      const response = await getBranchesForRepo<GitHubBranchData[]>(
        username,
        reponame
      );
      console.info(response);
      setGithubRepoData(response.data);
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
          className="px-2"
        />
        <label htmlFor="reponame">Enter GitHub Repository Name:</label>
        <input
          name="reponame"
          type="text"
          placeholder="Enter GitHub repository name"
          className="px-2"
        />
        <button type="submit">Fetch Branches</button>
      </form>
      <div>
        {githubRepoData && (
          <ul>
            {githubRepoData.map((branch: GitHubBranchData) => (
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

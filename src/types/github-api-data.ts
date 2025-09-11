export type GithubPullRequestData = {
  body: string | null;
  id: number;
  title: string;
  user: GitHubUserData;
  html_url: string; // PR URL
  created_at: string; // PR creation dateString
  requested_reviewers: GitHubUserData[]; // Array of requested reviewers
  updated_at: string; // PR last updated
  closed_at: string | null; // PR closed dateString or null if not closed
  merged_at: string | null; // PR merged dateString or null if not merged
};

export type GitHubUserData = {
  id: number;
  login: string;
  contributions: number;
  html_url: string; // Contributor URL
  avatar_url: string; // Contributor Avatar URL
};

export type GithubRepoData = {
  id: number;
  name: string;
  created_at: string;
  description: string | null;
  html_url: string; // Repo URL
};

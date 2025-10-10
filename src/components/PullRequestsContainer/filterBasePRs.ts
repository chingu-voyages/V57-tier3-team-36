import type { PRFilterState } from '@/types/PRFilterState';

export default function filterBasePRs(
  basePRs: GitHubPullRequest[],
  filters: PRFilterState,
  query: string,
  email: string
) {
  if (!basePRs) return [];

  const filteredPRs = basePRs.filter(pr => {
    const matchesQuery = query
      ? pr.title.toLowerCase().includes(query.trim().toLowerCase())
      : true;

    const matchesStatus = filters.prStatus
      ? pr.state === filters.prStatus
      : true;

    console.log(pr.user.email, email);
    // const matchesInvolves = filters.involvesMe ? pr.user.email === email : true;
    const matchesInvolves = true; // TODO

    // imitate matching by review progress as otherwise would require more API calls
    const matchesReview = (() => {
      if (!filters.reviewProgress) return true;
      if (filters.reviewProgress === 'none')
        return (
          pr.review_comments === 0 &&
          (!pr.requested_reviewers || pr.requested_reviewers.length === 0)
        );
      if (filters.reviewProgress === 'approved') return pr.merged_at !== null;
      if (filters.reviewProgress === 'changes_requested')
        return pr.review_comments > 0 && pr.state === 'open';
      return true;
    })();

    return matchesQuery && matchesStatus && matchesInvolves && matchesReview;
  });

  return filteredPRs;
}

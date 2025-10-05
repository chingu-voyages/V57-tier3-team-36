'use client';

import { usePullRequests } from '@/hooks/usePullRequests';
import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';
import { useState } from 'react';

export default function PullRequestsList() {
  const { pullRequests, pullRequestConflicts } = usePullRequests();
  const [highlightedPRs, setHighlightedPRs] = useState<Set<number>>(new Set());
  const [highlightedFiles, setHighlightedFiles] = useState<string[]>([]);

  const handleHighlight = (prNumber: number) => {
    const highlighted = new Set<number>([prNumber]);
    const allConflictingFiles = new Set<string>();

    // Find all PRs that share files with this one
    const conflictingFiles = pullRequestConflicts[prNumber.toString()];
    if (conflictingFiles) {
      conflictingFiles.forEach(file => allConflictingFiles.add(file));

      // Check each other PR to see if it has any of these files
      Object.entries(pullRequestConflicts).forEach(([otherPR, files]) => {
        const otherPRNum = parseInt(otherPR);
        if (otherPRNum !== prNumber) {
          const overlappingFiles = files.filter(file =>
            conflictingFiles.includes(file)
          );
          if (overlappingFiles.length > 0) {
            highlighted.add(otherPRNum);
          }
        }
      });
    }

    setHighlightedPRs(highlighted);
    setHighlightedFiles(Array.from(allConflictingFiles));
  };

  const handleClearHighlight = () => {
    setHighlightedPRs(new Set());
    setHighlightedFiles([]);
  };

  return (
    <ul
      data-label="PullRequestsList"
      className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
    >
      {pullRequests ? (
        pullRequests.map(props => (
          <PullRequestCard
            key={props.id}
            {...props}
            hasConflicts={Object.keys(pullRequestConflicts).includes(
              props.number.toString()
            )}
            isHighlighted={highlightedPRs.has(props.number)}
            conflictingFiles={
              highlightedPRs.has(props.number)
                ? pullRequestConflicts[props.number.toString()] || []
                : []
            }
            onHighlight={() => handleHighlight(props.number)}
            onClearHighlight={handleClearHighlight}
          />
        ))
      ) : (
        <div className="skeleton h-full w-full"></div>
      )}
    </ul>
  );
}

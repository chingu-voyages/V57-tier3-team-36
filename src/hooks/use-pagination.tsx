/* eslint-disable @typescript-eslint/no-explicit-any*/
import { GitHubPaginatedResponse } from "@/lib/base-github-api-client/base-github-api-client";
import { useState } from "react";

// A custom hook to manage pagination state and navigation for paginated GitHub API calls
export function usePagination<T>() {
  const [nextPage, setNextPage] = useState<number | undefined>(undefined);
  const [previousPage, setPreviousPage] = useState<number | undefined>(
    undefined
  );
  const [fetchResults, setFetchResults] = useState<T | null>(null);

  /**
   *
   * @param gitHubActionFunction one of the action functions from github-repo-actions.ts that supports pagination
   * @param direction initial | next | previous - the direction to navigate
   * @param args any extra arguments required by the gitHubActionFunction
   * @returns
   */
  async function navigate(
    // This should accept a function of any signature
    gitHubActionFunction: (
      ...args: any[]
    ) => Promise<GitHubPaginatedResponse<T>>,
    direction: "initial" | "next" | "previous" | string, // these refer to the names of the navigation HTML buttons in the UI - initial is the first load. We can refactor this.
    ...args: any[]
  ) {
    switch (direction) {
      case "initial":
        const initialResponse = await gitHubActionFunction(...args);
        setNextPage(initialResponse.pagination?.nextPage);
        setFetchResults(initialResponse.data);
        break;
      case "next":
        if (!nextPage) return;
        const navigateToNextPageResponse = await gitHubActionFunction(
          ...args,
          nextPage
        );
        setNextPage(navigateToNextPageResponse.pagination?.nextPage);
        setPreviousPage(navigateToNextPageResponse.pagination?.previousPage);
        setFetchResults(navigateToNextPageResponse.data);
        break;
      case "previous":
        if (!previousPage) return;
        const navigatedToPreviousPageResponse = await gitHubActionFunction(
          ...args,
          previousPage
        );
        setNextPage(navigatedToPreviousPageResponse.pagination?.nextPage);
        setPreviousPage(
          navigatedToPreviousPageResponse.pagination?.previousPage
        );
        setFetchResults(navigatedToPreviousPageResponse.data);
        break;
      default:
        throw new Error(
          "Invalid navigation direction: navigation direction must be 'initial', 'next', or 'previous'"
        );
    }
  }

  return {
    nextPage,
    previousPage,
    navigate,
    fetchResults,
  };
}

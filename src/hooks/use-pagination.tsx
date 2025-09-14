/* eslint-disable @typescript-eslint/no-explicit-any*/
import { GitHubPaginatedResponse } from "@/lib/base-github-api-client/base-github-api-client";
import { useState } from "react";

export function usePagination<T>() {
  const [nextPage, setNextPage] = useState<number | undefined>(undefined);
  const [previousPage, setPreviousPage] = useState<number | undefined>(
    undefined
  );
  const [fetchResults, setFetchResults] = useState<T | null>(null);

  async function navigate(
    // This should accept a function of any signature
    gitHubActionFunction: (
      ...args: any[]
    ) => Promise<GitHubPaginatedResponse<T>>,
    direction: "initial" | "next" | "previous" | string,
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

import { getAccessToken } from "@/lib/auth/getAccessToken";

export type GitHubPagination = {
  nextPage?: number;
  firstPage?: number;
  lastPage?: number;
  previousPage?: number;
};
export type GitHubPaginatedResponse<T> = {
  data: T;
  pagination?: GitHubPagination;
};
export function BaseGithubApiActions() {
  const baseUrl = "https://api.github.com";

  async function get<T>(path: string): Promise<T> {
    const bearerToken = await getBearerToken();
    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }

  async function getWithPagination<T>(
    path: string,
    pageNumber: number = 1
  ): Promise<GitHubPaginatedResponse<T>> {
    const bearerToken = await getBearerToken();
    const queryIndicator = path.includes("?") ? "&" : "?";
    const response = await fetch(
      `${baseUrl}${path}${queryIndicator}page=${pageNumber}`,
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    const linkHeader = response.headers.get("Link"); // Link gives us pagination info
    let nextPage: number | undefined;
    let previousPage: number | undefined;
    let firstPage: number | undefined;
    let lastPage: number | undefined;

    const data = await response.json();

    if (linkHeader) {
      const links = parseLinkHeader(linkHeader);
      if (!links) {
        // If no links are found, return the data without pagination
        return {
          data,
          pagination: { nextPage, firstPage, lastPage, previousPage },
        };
      }
      if (links.next) {
        const url = new URL(links.next);
        const pageParam = url.searchParams.get("page");
        if (pageParam) {
          nextPage = parseInt(pageParam, 10);
        }
      }
      if (links.prev) {
        const url = new URL(links.prev);
        const pageParam = url.searchParams.get("page");
        if (pageParam) {
          previousPage = parseInt(pageParam, 10);
        }
      }
      if (links.first) {
        const url = new URL(links.first);
        const pageParam = url.searchParams.get("page");
        if (pageParam) {
          firstPage = parseInt(pageParam, 10);
        }
      }
      if (links.last) {
        const url = new URL(links.last);
        const pageParam = url.searchParams.get("page");
        if (pageParam) {
          lastPage = parseInt(pageParam, 10);
        }
      }
    }

    return {
      data,
      pagination: { nextPage, firstPage, lastPage, previousPage },
    };
  }
  async function getBearerToken() {
    const accessToken = await getAccessToken();
    return `Bearer ${accessToken}`;
  }

  return { getWithPagination, get };
}

function parseLinkHeader(header: string): { [key: string]: string } {
  const links: { [key: string]: string } = {};
  const parts = header.split(",");
  parts.forEach((part) => {
    const section = part.split(";");
    if (section.length !== 2) {
      return;
    }
    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();
    links[name] = url;
  });

  return links;
}

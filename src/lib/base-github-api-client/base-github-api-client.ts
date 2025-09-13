import { getAccessToken } from "../auth/getAccessToken";

export function BaseGithubApiClient() {
  const baseUrl: string = "https://api.github.com";

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
    console.log(response.headers.get("Link"));
    return response.json();
  }

  async function getWithPagination<T>(
    path: string,
    pageNumber: number = 1
  ): Promise<{ data: T; nextPage?: number }> {
    const bearerToken = await getBearerToken();
    const response = await fetch(`${baseUrl}${path}?page=${pageNumber}`, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    const linkHeader = response.headers.get("Link"); // Link gives us pagination info
    let nextPage: number | undefined = undefined;

    if (linkHeader) {
      const links = parseLinkHeader(linkHeader);
      if (links && links.next) {
        const url = new URL(links.next);
        const pageParam = url.searchParams.get("page");
        if (pageParam) {
          nextPage = parseInt(pageParam, 10);
        }
      }
    }

    const data = await response.json();
    return { data, nextPage };
  }
  async function getBearerToken() {
    const accessToken = await getAccessToken();
    return `Bearer ${accessToken}`;
  }

  return { get, getWithPagination };
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

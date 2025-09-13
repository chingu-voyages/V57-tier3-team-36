export function BaseGithubApiClient() {
  const baseUrl: string = "https://api.github.com";
  const authorizationHeader = `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`;
  async function get<T>(path: string): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        Authorization: authorizationHeader,
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
    const composedPath = `${baseUrl}${path}?page=${pageNumber}`;
    console.info(`Fetching from: ${composedPath}`);
    const response = await fetch(composedPath, {
      headers: {
        Authorization: authorizationHeader,
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    const linkHeader = response.headers.get("Link");
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

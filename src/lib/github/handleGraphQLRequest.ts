import { getBearerAccessToken } from "@/lib/auth/getBearerAccessToken";

export async function handleGraphQLRequest(query: string, variables = {}) {
  const bearerToken = await getBearerAccessToken();

  if (!bearerToken) {
    throw new Error("Missing user access token");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const responseData = await response.json();

  if (responseData.errors) {
    console.error("GraphQL errors:", responseData.errors);
    throw new Error("GraphQL request returned errors");
  }

  return responseData.data;
}

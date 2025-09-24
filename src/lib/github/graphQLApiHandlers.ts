export const GraphQLApiHandlers = (
  requestHandler: <T>(
    query: string,
    variables?: Record<string, string | number | boolean>
  ) => Promise<T>
) => ({
  getUserWritableRepos: () =>
    requestHandler<{
      viewer: { repositories: { edges: Array<{ node: GitHubRepo }> } };
    }>(`
      query {
        viewer {
          repositories (first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
              edges {
                  node {
                      description,
                      name,
                      url,
                      viewerPermission,
                      id,
                      owner {
                          login
                      }
                  }
              }   
              pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      }
    `),
});

"use server";

import { apiHandlers } from "@/lib/github/apiHandlers";
import { handleServerRequest } from "@/lib/github/handleServerRequest";
import { GraphQLApiHandlers } from "./graphQLApiHandlers";
import { handleGraphQLRequest } from "./handleGraphQLRequest";

export async function createApi(
  isGraphqlRequest: boolean = false
): Promise<
  ReturnType<typeof apiHandlers> | ReturnType<typeof GraphQLApiHandlers>
> {
  if (isGraphqlRequest) {
    return GraphQLApiHandlers(handleGraphQLRequest);
  }
  return apiHandlers(handleServerRequest);
}

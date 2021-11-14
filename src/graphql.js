import { gql } from "graphql-tag"; // GraphQLのqueryにparseする為のヘルパー

export const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      name
      avatarUrl
    }
  }
`;

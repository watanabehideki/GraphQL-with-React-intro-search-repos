import React from "react";
import { ApolloProvider } from "react-apollo"; // コンポーネント間のコミュニケーションを成立させる為のコンポーネント
import { gql } from "graphql-tag"; // GraphQLのqueryにparseする為のヘルパー
import { Query } from "react-apollo"; // GraphQLのqueryを送信する為のコンポーネント
import client from "./client";

const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      name
      avatarUrl
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">Hello GraphQL</div>
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error ${error.message}`;

          return <div>{data.user.name}</div>;
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;

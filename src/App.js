import React from "react";
import { ApolloProvider } from "react-apollo"; // コンポーネント間のコミュニケーションを成立させる為のコンポーネント
import { Query } from "react-apollo"; // GraphQLのqueryを送信する為のコンポーネント
import client from "./client";
import { ME } from "./graphql";

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

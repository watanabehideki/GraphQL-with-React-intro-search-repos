import React, { useState } from "react";
import { ApolloProvider } from "react-apollo"; // コンポーネント間のコミュニケーションを成立させる為のコンポーネント
import { Query } from "react-apollo"; // GraphQLのqueryを送信する為のコンポーネント
import client from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "frontend",
};

function App() {
  const [variables, setVariables] = useState(VARIABLES);
  const { query, first, last, before, after } = variables;
  return (
    <ApolloProvider client={client}>
      <Query
        query={SEARCH_REPOSITORIES}
        variables={{ query, first, last, before, after }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error ${error.message}`;
          console.log({ data });
          return <div></div>;
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;

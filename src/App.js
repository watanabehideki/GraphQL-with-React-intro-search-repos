import React, { useState } from "react";
import { ApolloProvider } from "react-apollo"; // コンポーネント間のコミュニケーションを成立させる為のコンポーネント
import { Query } from "react-apollo"; // GraphQLのqueryを送信する為のコンポーネント
import client from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const DEFALUT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "frontend",
};

function App() {
  const [variables, setVariables] = useState(DEFALUT_STATE);
  const { query, first, last, before, after } = variables;
  console.log({ query });

  const handleChange = (event) => {
    setVariables({ ...DEFALUT_STATE, query: event.target.value }); // DEFALUT_STATEのqueryのみを更新
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ApolloProvider client={client}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input value={query} onChange={(event) => handleChange(event)} />
      </form>
      <Query
        query={SEARCH_REPOSITORIES}
        variables={{ query, first, last, before, after }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error ${error.message}`;
          const search = data.search;
          const repositoryCount = search.repositoryCount;
          const repositoryUnit =
            repositoryCount === 1 ? "Repository" : "Repositories";
          const title = `Github Repositories 検索結果 - ${repositoryCount} ${repositoryUnit}`;
          return <h2>{title}</h2>;
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;

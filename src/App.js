import React, { useState } from "react"
import { ApolloProvider } from "react-apollo" // コンポーネント間のコミュニケーションを成立させる為のコンポーネント
import { Query } from "react-apollo" // GraphQLのqueryを送信する為のコンポーネント
import client from "./client"
import { SEARCH_REPOSITORIES } from "./graphql"

import { StarButton } from "./components/StarButton"

const PER_PAGE = 5
const DEFALUT_STATE = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "",
}

function App() {
  const [variables, setVariables] = useState(DEFALUT_STATE)
  const { query, first, last, before, after } = variables

  const handleChange = (event) => {
    setVariables({ ...DEFALUT_STATE, query: event.target.value }) // DEFALUT_STATEのqueryのみを更新
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const goNext = (search) => {
    setVariables({
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null,
      query: query,
    })
  }

  const goPrevious = (search) => {
    setVariables({
      first: PER_PAGE,
      after: null,
      before: search.pageInfo.startCursor,
      query: query,
    })
  }

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
          if (loading) return "Loading..."
          if (error) return `Error ${error.message}`
          const search = data.search
          const repositoryCount = search.repositoryCount
          const repositoryUnit =
            repositoryCount === 1 ? "Repository" : "Repositories"
          const title = `Github Repositories 検索結果 - ${repositoryCount} ${repositoryUnit}`
          return (
            <>
              <h2>{title}</h2>
              <ul>
                {search.edges.map((edge) => {
                  const node = edge.node
                  return (
                    <li key={node.id}>
                      <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {node.name}
                      </a>
                      &nbsp;
                      <StarButton node={node} {...{query, first, last, before, after}}/>
                    </li>
                  )
                })}
              </ul>
              {search.pageInfo.hasPreviousPage ? (
                <button onClick={() => goPrevious(search)}>Previous</button>
              ) : null}
              {search.pageInfo.hasNextPage ? (
                <button onClick={() => goNext(search)}>Next</button>
              ) : null}
            </>
          )
        }}
      </Query>
    </ApolloProvider>
  )
}

export default App

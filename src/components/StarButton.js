import React from "react"
import { Mutation } from "react-apollo"
import { ADD_STAR, REMOVE_STAR, SEARCH_REPOSITORIES } from "../graphql"

export const StarButton = ({ node, query, first, last, before, after }) => {
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starOrStars = totalCount === 1 ? "star" : "stars"

  const StarStatus = ({ addOrRemoveStar }) => {
    return (
      <button
        onClick={() => {
          addOrRemoveStar({ variables: { input: { starrableId: node.id } } })
        }}
      >
        {totalCount}
        {starOrStars} | {viewerHasStarred ? "starred" : "-"}
      </button>
    )
  }
  return (
    <Mutation
      mutation={viewerHasStarred ? REMOVE_STAR : ADD_STAR}
      refetchQueries={(mutationResult) => {
        console.log({mutationResult})
        return [
          {
            query: SEARCH_REPOSITORIES,
            variables: { query, first, last, before, after },
          },
        ]
      }}
    >
      {(addOrRemoveStar) => <StarStatus addOrRemoveStar={addOrRemoveStar} />}
    </Mutation>
  )
}

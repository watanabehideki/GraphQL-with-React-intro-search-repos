import React from "react"
import { Mutation } from "react-apollo"
import { ADD_STAR, REMOVE_STAR } from "../graphql"

export const StarButton = ({ node }) => {
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
    <Mutation mutation={viewerHasStarred ? REMOVE_STAR : ADD_STAR}>
      {(addOrRemoveStar) => <StarStatus addOrRemoveStar={addOrRemoveStar} />}
    </Mutation>
  )
}

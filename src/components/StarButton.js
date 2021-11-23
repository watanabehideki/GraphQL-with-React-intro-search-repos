import React from "react"
import { Mutation } from "react-apollo"
import { ADD_STAR } from "../graphql"

export const StarButton = ({ node }) => {
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starOrStars = totalCount === 1 ? "star" : "stars"

  const StarStatus = ({ addStar }) => {
    return (
      <button
        onClick={() => {
          addStar({ variables: { input: { starrableId: node.id } } })
        }}
      >
        {totalCount}
        {starOrStars} | {viewerHasStarred ? "starred" : "-"}
      </button>
    )
  }
  return (
    <Mutation mutation={ADD_STAR}>
      {(addStar) => <StarStatus addStar={addStar} />}
    </Mutation>
  )
}

import React from "react"

export const StarButton = ({ node }) => {
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starOrStars = totalCount === 1 ? "star" : "stars"
  return (
    <button>
      {totalCount}
      {starOrStars} | {viewerHasStarred ? "starred" : "-"}
    </button>
  )
}

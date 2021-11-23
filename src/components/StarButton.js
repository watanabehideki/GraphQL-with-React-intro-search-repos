import React from "react"

export const StarButton = ({ node }) => {
  const totalCount = node.stargazers.totalCount
  return (
    <button>
      {totalCount}
      {totalCount === 1 ? "star" : "stars"}
    </button>
  )
}

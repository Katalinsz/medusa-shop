"use client"
import React from "react"

interface PaginationProps {
  row: number
  motifHeight: number
  onClick: (index: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  row,
  motifHeight,
  onClick,
}) => {
  const previousClick = () => onClick(row - 1)
  const nextClick = () => onClick(row + 1)

  return (
    <div className="flex justify-center items-center gap-4 mt-4 mb-6">
      <button
        onClick={previousClick}
        disabled={row <= 0}
        className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors text-sm font-medium"
      >
        ‹ Previous
      </button>
      <span className="text-sm text-gray-600 font-medium">
        Current row {motifHeight - row}
      </span>
      <button
        onClick={nextClick}
        disabled={row >= motifHeight - 1}
        className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors text-sm font-medium"
      >
        Next ›
      </button>
    </div>
  )
}

export default Pagination

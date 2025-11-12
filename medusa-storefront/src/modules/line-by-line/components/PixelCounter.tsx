"use client"
import React from "react"
import { Pixel } from "./type"

interface PixelCounterProps {
  color: string
  count: number
}

const PixelCounter: React.FC<PixelCounterProps> = ({ color, count }) => {
  return (
    <li
      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md border border-gray-200"
      style={{ backgroundColor: color }}
    >
      {count}
    </li>
  )
}

interface PixelCounterNavProps {
  row: Pixel[]
  colors: string[]
}

const PixelCounterNav: React.FC<PixelCounterNavProps> = ({ row, colors }) => {
  return (
    <nav className="mt-6 mb-4">
      <ul className="flex gap-2 justify-center flex-wrap">
        {row.map((pixel, i) => (
          <PixelCounter
            key={`pixel-counter-${i}`}
            count={pixel.count}
            color={colors[pixel.color]}
          />
        ))}
      </ul>
    </nav>
  )
}

export default PixelCounterNav

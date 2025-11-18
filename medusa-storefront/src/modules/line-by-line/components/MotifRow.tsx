"use client"
import React from "react"
import { Pixel } from "./type"

interface MotifRowProps {
  index: number
  isActive: boolean
  onClick: (index: number) => void
  pixels: Pixel[]
  colors: string[]
  rowNr: number
}

const MotifRow: React.FC<MotifRowProps> = ({
  index,
  isActive,
  onClick,
  pixels,
  colors,
  rowNr,
}) => {
  const handleClick = () => onClick(index)

  return (
    <div
      className={`flex items-center  cursor-pointer transition-colors ${
        isActive
          ? "bg-blue-50 border-2 border-blue-300 rounded-lg"
          : "hover:bg-gray-50 border border-transparent"
      }`}
      onClick={handleClick}
    >
      <div className="w-4 h-4  flex items-center justify-center text-xs font-medium bg-white mr-1">
        {rowNr}
      </div>

      {pixels.map((pixel, i) => (
        <div key={`pixel-${index}-${i}`} className="flex">
          {Array(pixel.count)
            .fill(colors[pixel.color])
            .map((color, j) => (
              <div
                key={`pixel-color-${index}-${i}-${j}`}
                className="w-4 h-4 border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
        </div>
      ))}

      <div className="w-4 h-4 border border-gray-300 flex items-center justify-center text-xs font-medium bg-white ml-1">
        {rowNr}
      </div>
    </div>
  )
}

export default MotifRow

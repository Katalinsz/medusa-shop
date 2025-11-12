"use client"
import React, { useState } from "react"
import { MotifData } from "./type"
import MotifRow from "./MotifRow"
import PixelCounterNav from "./PixelCounter"
import Pagination from "./Pagination"
import ExtensionTabs from "./ExtensionTabs"
import { arrayMoveImmutable as arrayMove } from "array-move"

interface MotifProps {
  input: MotifData
}

const Motif: React.FC<MotifProps> = ({ input }) => {
  const [currentMotif] = useState(input)
  const [colors, setColors] = useState(input.colors)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = (index: number) => {
    if (index >= 0 && index < currentMotif.height) {
      setSelectedIndex(index)
    }
  }

  const handleColorChange = (color: string, index: number) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-sm text-gray-600 mb-4">
        Width: {currentMotif.width} - Height: {currentMotif.height} - Selected
        row: {currentMotif.height - selectedIndex}
      </div>

      <div className="overflow-auto mb-6 border border-gray-200 rounded p-4 bg-white">
        <div
          className="mx-auto"
          style={{ width: (currentMotif.width + 2) * 16 + 40 }}
        >
          {currentMotif.rows.map((item, k) => (
            <MotifRow
              key={k}
              index={k}
              isActive={selectedIndex === k}
              onClick={handleClick}
              pixels={item.pixels}
              colors={colors}
              rowNr={currentMotif.height - k}
            />
          ))}

          <div className="flex items-center mt-2">
            <div className="w-4 h-4 border border-gray-300 flex items-center justify-center text-xs bg-gray-50"></div>
            {[...Array(currentMotif.width)].map((_, ind) => (
              <div
                key={`bottom-${currentMotif.width - ind}`}
                className="w-4 h-4 border border-gray-300 flex items-center justify-center text-xs bg-gray-50"
              >
                {currentMotif.width - ind}
              </div>
            ))}
          </div>
        </div>
      </div>

      <PixelCounterNav
        row={currentMotif.rows[selectedIndex]?.pixels || []}
        colors={colors}
      />

      <Pagination
        row={selectedIndex}
        motifHeight={currentMotif.height}
        onClick={handleClick}
      />

      <ExtensionTabs
        colors={colors}
        onHandleColorChange={handleColorChange}
        onSortEnd={onSortEnd}
      />
    </div>
  )
}

export default Motif

"use client"
import React, { useState } from "react"

interface ColorPickerProps {
  color: string
  onColorChange: (color: string, index: number) => void
  ind: number
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onColorChange,
  ind,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value, ind)
  }

  return (
    <div className="inline-block mr-2 relative">
      <div
        className="w-8 h-8 rounded border border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
        style={{ backgroundColor: color }}
        onClick={handleClick}
      />
      {displayColorPicker && (
        <div className="absolute z-10 mt-1">
          <div className="fixed inset-0" onClick={handleClose} />
          <input
            type="color"
            value={color}
            onChange={handleChange}
            className="w-12 h-12 border-0 cursor-pointer rounded"
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker

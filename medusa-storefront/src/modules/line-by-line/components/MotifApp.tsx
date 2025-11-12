"use client"
import React, { useState } from "react"
import Motif from "./Motif"
import motif1 from "../data/motif1.json"
import motif2 from "../data/motif2.json"

// Converter function for both motifs
function convertMotifData(data: any) {
  const colorMap: { [key: string]: number } = {
    "222": 0,
    b64: 1,
    dde: 2,
  }

  return {
    ...data,
    rows: data.rows.map((row: any) => ({
      ...row,
      pixels: row.pixels.map((pixel: any) => ({
        ...pixel,
        color: colorMap[pixel.color] || 0,
      })),
    })),
  }
}

// Type the motifs object properly
const motifs = {
  motif1: convertMotifData(motif1),
  motif2: convertMotifData(motif2),
}

function MotifApp() {
  const [currentMotif, setCurrentMotif] = useState(motifs.motif1)

  const handleMotifChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMotif = motifs[event.target.value as keyof typeof motifs]
    setCurrentMotif(selectedMotif)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Line by Line Motif Editor
        </h1>

        {/* Motif Selector */}
        <div className="mb-6 text-center">
          <label
            htmlFor="motif-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Pattern:
          </label>
          <select
            id="motif-select"
            onChange={handleMotifChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="motif1">Pattern 1</option>
            <option value="motif2">Pattern 2</option>
          </select>
        </div>

        <Motif input={currentMotif} />
      </div>
    </div>
  )
}

export default MotifApp

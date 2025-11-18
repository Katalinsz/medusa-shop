"use client"

import React, { useState, useEffect } from "react"

const KnittingMotifCard: React.FC = () => {
  const STITCHES = 120
  const ROWS = 8
  const SVG_WIDTH = 1000
  const SVG_HEIGHT = 500
  const PADDING = 50

  const [tension, setTension] = useState("50 - 2.6666666666667")
  const [showCustom, setShowCustom] = useState(false)
  const [customStitches, setCustomStitches] = useState("24")
  const [customRows, setCustomRows] = useState("30")
  const [dimensions, setDimensions] = useState({ width: 60, height: 12 })
  const [rectDimensions, setRectDimensions] = useState({
    width: 600,
    height: 120,
    x: 200,
    y: 180,
  })

  const calculateDimensions = (
    stitchesPer10cm: number,
    rowsPer10cm: number
  ) => {
    const width = (STITCHES / stitchesPer10cm) * 10
    const height = (ROWS / rowsPer10cm) * 10
    return { width, height }
  }

  const calculateRectDimensions = (width: number, height: number) => {
    const availableWidth = SVG_WIDTH - 2 * PADDING
    const availableHeight = SVG_HEIGHT - 2 * PADDING

    const scaleX = availableWidth / width
    const scaleY = availableHeight / height
    const scale = Math.min(scaleX, scaleY)

    const rectWidth = width * scale
    const rectHeight = height * scale
    const rectX = (SVG_WIDTH - rectWidth) / 2
    const rectY = (SVG_HEIGHT - rectHeight) / 2

    return { width: rectWidth, height: rectHeight, x: rectX, y: rectY }
  }

  useEffect(() => {
    if (tension.startsWith("O-")) {
      setShowCustom(true)
      const dims = calculateDimensions(
        parseFloat(customStitches),
        parseFloat(customRows)
      )
      setDimensions(dims)
      setRectDimensions(calculateRectDimensions(dims.width, dims.height))
    } else {
      setShowCustom(false)
      const [stitchesPer10cm, rowsPer10cm] = tension
        .split(" - ")
        .map(parseFloat)
      const dims = calculateDimensions(stitchesPer10cm, rowsPer10cm)
      setDimensions(dims)
      setRectDimensions(calculateRectDimensions(dims.width, dims.height))
    }
  }, [tension, customStitches, customRows])

  const handleCustomChange = () => {
    const stitches = parseFloat(customStitches) || 24
    const rows = parseFloat(customRows) || 30
    const dims = calculateDimensions(stitches, rows)
    setDimensions(dims)
    setRectDimensions(calculateRectDimensions(dims.width, dims.height))
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        🧶 Knitting Motif – Small Motifs
      </h2>

      <p id="product_reference" className="hidden">
        <label className="font-semibold">Reference:</label>{" "}
        <span className="editable"></span>
      </p>

      <p className="mb-3 text-gray-800">
        <strong>Specs:</strong> The motif is{" "}
        <span className="text-blue-600">{STITCHES} stitches</span> ×{" "}
        <span className="text-blue-600">{ROWS} rows</span>.
      </p>

      <p className="mb-4 text-gray-700">
        Check the size of this motif with different yarn tension. Choose a
        preset or write your own to calculate accurate size.
      </p>

      <label
        htmlFor="selectedTension"
        className="block font-bold text-gray-800 mb-2"
      >
        🧵 Select Yarn Tension:
      </label>

      <select
        id="selectedTension"
        value={tension}
        onChange={(e) => setTension(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="50 - 2.6666666666667">
          24 stitches, 30 rows to 10cm
        </option>
        <option value="54.545454545455 - 2.5">
          22 stitches, 32 rows to 10cm
        </option>
        <option value="41.379310344828 - 2.3529411764706">
          29 stitches, 34 rows to 10cm
        </option>
        <option value="O-120.000000 - 8.000000">Other</option>
      </select>

      {showCustom && (
        <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <p className="font-semibold mb-2">Enter your tension:</p>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm mb-1">Stitches per 10cm:</label>
              <input
                type="number"
                value={customStitches}
                onChange={(e) => setCustomStitches(e.target.value)}
                onBlur={handleCustomChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Rows per 10cm:</label>
              <input
                type="number"
                value={customRows}
                onChange={(e) => setCustomRows(e.target.value)}
                onBlur={handleCustomChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      )}

      <div className="border border-dashed border-gray-400 rounded-lg p-4 bg-gray-50 mt-4 text-center w-full max-w-full">
        <svg
          id="mysvg"
          viewBox="0 0 1000 500"
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
          className="block mx-auto"
        >
          <rect
            id="rect"
            x={rectDimensions.x}
            y={rectDimensions.y}
            width={rectDimensions.width}
            height={rectDimensions.height}
            className="fill-blue-500/10 stroke-pink-400 stroke-[6] opacity-90"
          ></rect>

          <text
            id="svg_width"
            x={rectDimensions.x + rectDimensions.width / 2}
            y={rectDimensions.y - 20}
            fill="black"
            fontSize={36}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            Width: {dimensions.width.toFixed(2)} cm
          </text>

          <text
            id="svg_height"
            x={rectDimensions.x - 20}
            y={rectDimensions.y + rectDimensions.height / 2}
            fill="black"
            fontSize={36}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            transform={`rotate(-90, ${rectDimensions.x - 20}, ${
              rectDimensions.y + rectDimensions.height / 2
            })`}
          >
            Height: {dimensions.height.toFixed(2)} cm
          </text>
        </svg>
      </div>
    </div>
  )
}

export default KnittingMotifCard

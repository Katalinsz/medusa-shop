import React from "react"

const KnittingMotifCard: React.FC = () => {
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
        <span className="text-blue-600">120 stitches</span> ×{" "}
        <span className="text-blue-600">8 rows</span>.
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

      <div id="buildyourform" className="mb-4"></div>

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
            x={200}
            y={180}
            width={600}
            height={120}
            className="fill-blue-500/10 stroke-pink-400 stroke-[6] opacity-90"
          ></rect>

          <text
            id="svg_width"
            x={500}
            y={160}
            fill="black"
            fontSize={36}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            Width: 60.00 cm
          </text>

          <text
            id="svg_height"
            x={190}
            y={240}
            fill="black"
            fontSize={36}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            transform="rotate(-90, 190, 240)"
          >
            Height: 12.00 cm
          </text>
        </svg>
      </div>
    </div>
  )
}

export default KnittingMotifCard

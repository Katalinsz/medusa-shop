import React, { useState } from "react"
import { Search, SlidersHorizontal, X, Grid3x3 } from "lucide-react"

interface SearchFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  widthRange: [number, number]
  setWidthRange: (range: [number, number]) => void
  heightRange: [number, number]
  setHeightRange: (range: [number, number]) => void
  categories: string[]
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  widthRange,
  setWidthRange,
  heightRange,
  setHeightRange,
  categories,
  selectedCategories,
  setSelectedCategories,
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false)

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setWidthRange([3, 128])
    setHeightRange([3, 128])
    setSelectedCategories([])
  }

  const activeFiltersCount =
    selectedCategories.length +
    (widthRange[0] !== 3 ||
    widthRange[1] !== 128 ||
    heightRange[0] !== 3 ||
    heightRange[1] !== 128
      ? 1
      : 0)

  const handleWidthMinChange = (value: number) => {
    setWidthRange([Math.min(value, widthRange[1]), widthRange[1]])
  }

  const handleWidthMaxChange = (value: number) => {
    setWidthRange([widthRange[0], Math.max(value, widthRange[0])])
  }

  const handleHeightMinChange = (value: number) => {
    setHeightRange([Math.min(value, heightRange[1]), heightRange[1]])
  }

  const handleHeightMaxChange = (value: number) => {
    setHeightRange([heightRange[0], Math.max(value, heightRange[0])])
  }

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search Bar and Filter Button */}
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, style, or technique..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap border-2 ${
              showFilters
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-emerald-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
          <button
            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-300 transition-all"
            title="Toggle view"
          >
            <Grid3x3 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Expandable Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in duration-300">
            {/* Dimensions Section */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Width Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Width:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={widthRange[0]}
                      onChange={(e) =>
                        handleWidthMinChange(Number(e.target.value))
                      }
                      min="3"
                      max="128"
                      className="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-center font-medium text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={widthRange[1]}
                      onChange={(e) =>
                        handleWidthMaxChange(Number(e.target.value))
                      }
                      min="3"
                      max="128"
                      className="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-center font-medium text-sm"
                    />
                    <span className="text-sm text-gray-500">stitch</span>
                  </div>
                </div>

                {/* Height Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Height:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={heightRange[0]}
                      onChange={(e) =>
                        handleHeightMinChange(Number(e.target.value))
                      }
                      min="3"
                      max="128"
                      className="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-center font-medium text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={heightRange[1]}
                      onChange={(e) =>
                        handleHeightMaxChange(Number(e.target.value))
                      }
                      min="3"
                      max="128"
                      className="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-center font-medium text-sm"
                    />
                    <span className="text-sm text-gray-500">rows</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Results Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all"
              >
                Filter Results
              </button>
            </div>

            {/* Categories Section */}
            <div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize text-sm ${
                      selectedCategories.includes(category)
                        ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-500"
                        : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {!showFilters && selectedCategories.length > 0 && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">
              Active filters:
            </span>
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-1 capitalize"
              >
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className="hover:bg-emerald-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

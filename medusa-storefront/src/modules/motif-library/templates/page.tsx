"use client"

import { useState, useMemo } from "react"
import { Search, Heart, Filter, X } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"

interface MotifLibraryProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  countryCode: string
}

const categories = [
  "repetitive",
  "cats",
  "funny",
  "cars",
  "love",
  "nature",
  "animal",
]

export default function MotifLibrary({
  products,
  region,
  countryCode,
}: MotifLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [widthRange, setWidthRange] = useState([3, 128])
  const [heightRange, setHeightRange] = useState([3, 128])
  const [tempWidthRange, setTempWidthRange] = useState([3, 128])
  const [tempHeightRange, setTempHeightRange] = useState([3, 128])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [likedMotifs, setLikedMotifs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 12

  const toggleLike = (id: string) => {
    setLikedMotifs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  // Filter products based on search, categories, and dimensions
  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products.filter((product) => {
      const matchesSearch = searchQuery
        ? product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      const matchesCategory =
        selectedCategories.length > 0
          ? selectedCategories.some(
              (cat) =>
                product.metadata?.category === cat ||
                product.tags?.some((tag) => tag.value === cat)
            )
          : true

      const width = product.metadata?.width as number
      const height = product.metadata?.height as number

      const matchesWidth = width
        ? width >= widthRange[0] && width <= widthRange[1]
        : true

      const matchesHeight = height
        ? height >= heightRange[0] && height <= heightRange[1]
        : true

      return matchesSearch && matchesCategory && matchesWidth && matchesHeight
    })
  }, [products, searchQuery, selectedCategories, widthRange, heightRange])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
      setCurrentPage(1)
      return newCategories
    })
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setWidthRange([3, 128])
    setHeightRange([3, 128])
    setTempWidthRange([3, 128])
    setTempHeightRange([3, 128])
    setCurrentPage(1)
  }

  const applyDimensionFilters = () => {
    setWidthRange(tempWidthRange)
    setHeightRange(tempHeightRange)
    setCurrentPage(1)
  }

  const formatPrice = (amount: number, currencyCode: string) => {
    try {
      return convertToLocale({ amount, currency_code: currencyCode })
    } catch (error) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
      }).format(amount / 100)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium"
            >
              <Filter size={18} />
              Filters
              {selectedCategories.length > 0 && (
                <span className="bg-white text-teal-600 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {selectedCategories.length}
                </span>
              )}
            </button>
          </div>

          {/* Search & Filters */}
          <div
            className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
              <div className="flex-1 min-w-0 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search motifs..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Width Filter */}
                <div className="flex-1 lg:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width:
                  </label>
                  <input
                    type="text"
                    value={`${tempWidthRange[0]} - ${tempWidthRange[1]} stitch`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                  />
                  <div className="mt-2 space-y-1">
                    <input
                      type="range"
                      min="3"
                      max="128"
                      value={tempWidthRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value)
                        setTempWidthRange([
                          Math.min(newMin, tempWidthRange[1]),
                          tempWidthRange[1],
                        ])
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <input
                      type="range"
                      min="3"
                      max="128"
                      value={tempWidthRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value)
                        setTempWidthRange([
                          tempWidthRange[0],
                          Math.max(newMax, tempWidthRange[0]),
                        ])
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>
                </div>

                {/* Height Filter */}
                <div className="flex-1 lg:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height:
                  </label>
                  <input
                    type="text"
                    value={`${tempHeightRange[0]} - ${tempHeightRange[1]} rows`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                  />
                  <div className="mt-2 space-y-1">
                    <input
                      type="range"
                      min="3"
                      max="128"
                      value={tempHeightRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value)
                        setTempHeightRange([
                          Math.min(newMin, tempHeightRange[1]),
                          tempHeightRange[1],
                        ])
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <input
                      type="range"
                      min="3"
                      max="128"
                      value={tempHeightRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value)
                        setTempHeightRange([
                          tempHeightRange[0],
                          Math.max(newMax, tempHeightRange[0]),
                        ])
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={applyDimensionFilters}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap"
              >
                Filter Results
              </button>

              {(searchQuery ||
                selectedCategories.length > 0 ||
                widthRange[0] !== 3 ||
                widthRange[1] !== 128 ||
                heightRange[0] !== 3 ||
                heightRange[1] !== 128) && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-colors whitespace-nowrap"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? "bg-teal-600 text-white"
                      : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                  }`}
                >
                  {category}
                  {selectedCategories.includes(category) && (
                    <X size={14} className="inline ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Motif Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {currentProducts.length} of {filteredProducts.length} motifs
          </p>
          {filteredProducts.length > 0 && (
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => {
            const creator =
              (product.metadata?.creator as string) || "Unknown Artist"
            const firstVariant = product.variants?.[0]
            const inventoryQuantity = firstVariant?.inventory_quantity
            const isOutOfStock =
              inventoryQuantity !== undefined && inventoryQuantity <= 0
            const isNew =
              product.created_at &&
              new Date(product.created_at) >
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            const description = product.description || ""

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:-translate-y-1"
              >
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Thumbnail
                      thumbnail={product.thumbnail}
                      images={product.images}
                      size="full"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Full Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-4 text-center text-white">
                      <h3 className="text-lg font-semibold truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm font-medium mb-2">By {creator}</p>
                      {description && (
                        <p className="text-xs overflow-y-auto max-h-20">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {isNew && (
                        <span className="bg-blue-600 text-white px-2 py-0.5 text-xs rounded-full font-medium">
                          NEW
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className="bg-red-500 text-white px-2 py-0.5 text-xs rounded-full font-medium">
                          OUT
                        </span>
                      )}
                    </div>
                  </div>
                </LocalizedClientLink>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product.id!)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-20"
                >
                  <Heart
                    size={20}
                    className={`${
                      likedMotifs.includes(product.id!)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    } transition-colors duration-300`}
                  />
                </button>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum
              if (totalPages <= 7) {
                pageNum = i + 1
              } else if (currentPage <= 4) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i
              } else {
                pageNum = currentPage - 3 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-teal-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

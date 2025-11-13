"use client"
import { useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import SearchFilter from "../components /SearchFilter"
import MotifCard from "../components /Motif-card"
import Pagination from "../components /pagination"

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
  "geometric",
  "floral",
  "abstract",
  "vintage",
  "modern",
]

export default function MotifLibrary({
  products,
  region,
  countryCode,
}: MotifLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [widthRange, setWidthRange] = useState<[number, number]>([3, 128])
  const [heightRange, setHeightRange] = useState<[number, number]>([3, 128])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [likedMotifs, setLikedMotifs] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const itemsPerPage = 12

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, widthRange, heightRange])

  // Load liked motifs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("likedMotifs")
    if (saved) {
      setLikedMotifs(JSON.parse(saved))
    }
  }, [])

  // Save liked motifs to localStorage
  useEffect(() => {
    localStorage.setItem("likedMotifs", JSON.stringify(likedMotifs))
  }, [likedMotifs])

  const toggleLike = (id: string) => {
    setLikedMotifs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  // Enhanced filter logic
  const filteredProducts =
    products?.filter((product) => {
      // Search filter - check title, description, and metadata
      const matchesSearch =
        searchQuery === "" ||
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.metadata?.keywords
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => {
          const styleMatch =
            product.metadata?.style?.toString().toLowerCase() ===
            cat.toLowerCase()
          const categoryMatch =
            product.metadata?.category?.toString().toLowerCase() ===
            cat.toLowerCase()
          const typeMatch =
            product.metadata?.type?.toString().toLowerCase() ===
            cat.toLowerCase()
          const tagMatch = product.tags?.some((tag) =>
            tag.value?.toLowerCase().includes(cat.toLowerCase())
          )
          return styleMatch || categoryMatch || typeMatch || tagMatch
        })

      // Dimension filters
      const productWidth = Number(product.metadata?.width) || 0
      const productHeight = Number(product.metadata?.height) || 0

      const matchesWidth =
        productWidth === 0 ||
        (productWidth >= widthRange[0] && productWidth <= widthRange[1])

      const matchesHeight =
        productHeight === 0 ||
        (productHeight >= heightRange[0] && productHeight <= heightRange[1])

      return matchesSearch && matchesCategories && matchesWidth && matchesHeight
    }) || []

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchQuery("")
    setWidthRange([3, 128])
    setHeightRange([3, 128])
    setSelectedCategories([])
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen  from-emerald-50 via-white to-teal-50">
      {/* Search and Filters */}
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        widthRange={widthRange}
        setWidthRange={setWidthRange}
        heightRange={heightRange}
        setHeightRange={setHeightRange}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Pattern Library
            </h2>
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-emerald-600">
                {currentProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-emerald-600">
                {filteredProducts.length}
              </span>{" "}
              motifs
              {filteredProducts.length !== products?.length && (
                <span className="text-gray-500">
                  {" "}
                  (filtered from {products?.length} total)
                </span>
              )}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white rounded-xl p-1.5 shadow-md border border-emerald-100">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-emerald-50"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-emerald-50"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Motif Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {currentProducts.map((product) => (
                <MotifCard
                  key={product.id}
                  product={product}
                  region={region}
                  isLiked={likedMotifs.includes(product.id!)}
                  onToggleLike={toggleLike}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </>
        ) : (
          /* No Results Message */
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No motifs found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any patterns matching your criteria.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Try these tips:
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Check your spelling or try different keywords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Remove some category filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Expand the width and height ranges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Clear all filters to browse everything</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleClearAllFilters}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

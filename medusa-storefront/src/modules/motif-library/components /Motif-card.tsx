"use client"
import { HttpTypes } from "@medusajs/types"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface MotifCardProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isLiked: boolean
  onToggleLike: (id: string) => void
  viewMode?: "grid" | "list"
}

export default function MotifCard({
  product,
  region,
  isLiked,
  onToggleLike,
  viewMode = "grid",
}: MotifCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get the first image or fallback
  const imageUrl =
    product.thumbnail || product.images?.[0]?.url || "/placeholder.png"

  // Get artist name from metadata
  const artistName = (product.metadata?.artist as string) || "Unknown Artist"

  // Get dimensions
  const width = (product.metadata?.width as string | number) || "N/A"
  const height = (product.metadata?.height as string | number) || "N/A"

  // Truncate description
  const description = product.description || ""
  const truncatedDescription =
    description.length > 80 ? description.substring(0, 80) + "..." : description

  // Get price
  const price = product.variants?.[0]?.calculated_price?.calculated_amount
  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: region.currency_code || "USD",
      }).format(price / 100)
    : "Price N/A"

  return (
    <div
      className={`group bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        viewMode === "list" ? "flex flex-row" : "flex flex-col"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link
        href={`/products/${product.handle}`}
        className={`relative bg-gray-100 overflow-hidden ${
          viewMode === "list" ? "w-48 flex-shrink-0" : "w-full aspect-square"
        }`}
      >
        <Image
          src={imageUrl}
          alt={product.title || "Motif"}
          fill
          sizes={
            viewMode === "list"
              ? "192px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay with Artist and Likes */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-sm font-medium mb-1">By {artistName}</p>
            <div className="flex items-center gap-2 text-xs">
              <Heart className="w-3 h-3 fill-current" />
              <span>{(product.metadata?.likes as number) || 0} likes</span>
            </div>
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleLike(product.id!)
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
            isLiked
              ? "bg-red-500 text-white shadow-lg scale-110"
              : "bg-white/90 text-gray-700 hover:bg-white hover:scale-110"
          }`}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isLiked ? "fill-current" : ""
            }`}
          />
        </button>

        {/* Dimensions Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-full">
          {width}×{height}
        </div>
      </Link>

      {/* Card Content */}
      <div
        className={`p-4 flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}
      >
        <Link href={`/products/${product.handle}`} className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>

          {truncatedDescription && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {truncatedDescription}
            </p>
          )}
        </Link>
      </div>
    </div>
  )
}

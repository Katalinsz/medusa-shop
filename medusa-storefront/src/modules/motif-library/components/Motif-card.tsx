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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  })

  // Get the first image or fallback
  const imageUrl =
    product.thumbnail || product.images?.[0]?.url || "/placeholder.png"

  // Get artist name from metadata
  const artistName = (product.metadata?.artist as string) || "Unknown Artist"

  // Get dimensions from metadata or use actual image dimensions
  const width =
    (product.metadata?.width as string | number) || imageDimensions.width
  const height =
    (product.metadata?.height as string | number) || imageDimensions.height

  // Calculate aspect ratio
  const aspectRatio = width && height ? Number(width) / Number(height) : 1

  // Determine card size class based on aspect ratio and dimensions
  const getCardSizeClass = () => {
    if (!width || !height) return "medium-card"

    const numWidth = Number(width)
    const numHeight = Number(height)

    // Very wide images
    if (aspectRatio > 2) return "wide-card"
    // Very tall images
    if (aspectRatio < 0.5) return "tall-card"
    // Large area images
    if (numWidth * numHeight > 80000) return "large-card"
    // Small area images
    if (numWidth * numHeight < 20000) return "small-card"

    return "medium-card"
  }

  const cardSizeClass = getCardSizeClass()

  // Get dynamic height based on card size
  const getImageHeight = () => {
    switch (cardSizeClass) {
      case "wide-card":
        return "h-40" // Shorter height for wide images
      case "tall-card":
        return "h-80" // Taller height for portrait images
      case "large-card":
        return "h-72" // Larger height for big motifs
      case "small-card":
        return "h-48" // Smaller height for small motifs
      default:
        return "h-64" // Default medium height
    }
  }

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

  // Handle image load to get actual dimensions
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    const img = event.currentTarget
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })
  }

  return (
    <div
      className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        viewMode === "list"
          ? "flex flex-row"
          : `flex flex-col ${cardSizeClass === "wide-card" ? "col-span-2" : ""}`
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Dynamic sizing based on motif dimensions */}
      <Link
        href={`/products/${product.handle}`}
        className={`
          relative bg-gray-50 overflow-hidden transition-all duration-300
          ${
            viewMode === "list"
              ? "w-48 flex-shrink-0 h-48"
              : `w-full ${getImageHeight()} flex-shrink-0`
          }
          ${!imageLoaded ? "animate-pulse bg-gray-200" : ""}
        `}
      >
        <Image
          src={imageUrl}
          alt={product.title || "Motif"}
          fill
          sizes={
            viewMode === "list"
              ? "192px"
              : cardSizeClass === "wide-card"
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          }
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          onLoad={handleImageLoad}
          style={{
            objectFit: "contain",
          }}
        />

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}

        {/* Hover Overlay with Artist and Likes */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 flex items-end ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="p-3 text-white w-full">
            <p className="text-sm font-medium mb-1 truncate">By {artistName}</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 fill-current" />
                <span>{(product.metadata?.likes as number) || 0}</span>
              </div>
              
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
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
            isLiked
              ? "bg-red-500 text-white shadow-lg scale-110"
              : "bg-white/80 text-gray-700 hover:bg-white hover:scale-110 hover:shadow-md"
          }`}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isLiked ? "fill-current scale-110" : ""
            }`}
          />
        </button>

        {/* Size Indicator * /}
        <div
          className={`absolute bottom-2 right-2 px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
            cardSizeClass === "small-card"
              ? "bg-blue-500/90 text-white"
              : cardSizeClass === "large-card"
              ? "bg-orange-500/90 text-white"
              : cardSizeClass === "wide-card"
              ? "bg-purple-500/90 text-white"
              : cardSizeClass === "tall-card"
              ? "bg-indigo-500/90 text-white"
              : "bg-gray-500/90 text-white"
          }`}
        >
          {cardSizeClass === "small-card"
            ? "S"
            : cardSizeClass === "large-card"
            ? "L"
            : cardSizeClass === "wide-card"
            ? "W"
            : cardSizeClass === "tall-card"
            ? "T"
            : "M"}
        </div>*/}
      </Link>

     
    </div>
  )
}

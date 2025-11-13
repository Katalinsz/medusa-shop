import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Link from "next/link"
import { Plus } from "lucide-react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div className="flex items-start gap-3">
          <Text
            className="text-medium text-ui-fg-subtle whitespace-pre-line flex-1"
            data-testid="product-description"
          >
            {product.description}
          </Text>

          {/* Simple Plus Button Link */}
          <Link
            href="/line-by-line"
            className="flex items-center justify-center w-8 h-8 bg-ui-bg-base hover:bg-ui-bg-base-hover   transition-all duration-200 hover:shadow-md hover:scale-110 flex-shrink-0"
            title="View line by line"
          >
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo

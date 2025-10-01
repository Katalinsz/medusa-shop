// src/app/[countryCode]/(main)/products/[handle]/page.tsx
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import HatProductTemplate from "@modules/products/templates-hat"


type Props = {
  params: { countryCode: string; handle: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Which categories should use the special template?
const SPECIAL_CATEGORY_HANDLES = ["Hat Patterns"] // change to your handle(s) or use ids

function isInSpecialCategory(product: any) {
  const handles = new Set(SPECIAL_CATEGORY_HANDLES.map((s) => s.toLowerCase()))
  console.log("Product categories:", product.categories)
  console.log("Handles set:", handles)
  const ret = (product.categories ?? []).some(
    (c: any) => handles.has((c.name ?? "").toLowerCase())
  )
  console.log("isInSpecialCategory result:", ret)
  return ret
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) return []

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return { country, products: response.products }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)
  if (!region) notFound()

  const product = await listProducts({
    countryCode: params.countryCode,
    // ensure categories are included if you want to use them in metadata
    queryParams: { handle},//, expand: "categories,images,variants"},
  }).then(({ response }) => response.products[0])

  if (!product) notFound()

  return {
    title: `${product.title} | Knitted for You`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Knitted for You`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({params, searchParams}: Props) {
  console.log("In product page", params, searchParams)
  //const params = await props.params
  const region = await getRegion(params.countryCode)

  const url = typeof searchParams?.url === "string" ? searchParams.url : undefined
  console.log("URL param:", url)

  if (!region) notFound()
  console.log("params: ", params)
    
  const product = await listProducts({
    countryCode: params.countryCode,
    // IMPORTANT: expand categories so we can branch by category
     queryParams: {
      handle: params.handle,
     // expand: "categories,images,variants,tags", // ✅ ensure categories present
    },
  }).then(({ response }) => response.products[0])


  if (!product) notFound()
  product.images[0].url = url ?? product.images[0].url  
  console.log(product)
  const useHatTemplate = isInSpecialCategory(product)

  return useHatTemplate ? (
    <HatProductTemplate
      product={product}
      region={region}
      countryCode={params.countryCode}
    />
  ) : (
    <ProductTemplate
      product={product}
      region={region}
      countryCode={params.countryCode}
    />
  )
}

// src/api/api/pattern/add/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import type { IProductModuleService, ISalesChannelModuleService, IPricingModuleService } from "@medusajs/framework/types"
import { linkProductsToSalesChannelWorkflow } from "@medusajs/medusa/core-flows"
import { createProductVariantsWorkflow } from "@medusajs/medusa/core-flows"


const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY ?? "eur"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const productModule = req.scope.resolve(Modules.PRODUCT) as IProductModuleService
  const scModule = req.scope.resolve(Modules.SALES_CHANNEL) as ISalesChannelModuleService

  const {
    title, description, handle,
    status = "published",
    options = [{ title:"Size", values:["S","M","L"] }],                              // e.g. [{ title:"Size" }]
    variants = [],                             // e.g. [{ title:"Default", prices:[{currency_code:"eur",amount:1999}], options:{ Size:"Default" } }]
    //accept images and thumbnail from the client
    images = [] as Array<string | { url: string; rank?: number; metadata?: Record<string, any> }>,
    thumbnail,
    width,
    height,
    metadata = {},
  } = req.body

  // 1) Create product (published)
  const product = await productModule.createProducts({ title, description, handle, status, thumbnail, width, height, metadata })

   // 5) Link to default sales channel so the Store API can see it
  const channels = await scModule.listSalesChannels({})
  console.log("Found sales channels:", channels);
  const def = channels.find((c: any) => c.is_default) ?? channels[0]
  await linkProductsToSalesChannelWorkflow(req.scope).run({ input: { id: def.id, add: [product.id] } })  // :contentReference[oaicite:2]{index=2}

  // 2) Create product options WITH values 
  if (options.length) {
    await productModule.createProductOptions(
      options.map((o: any) => ({
        title: o.title,
        product_id: product.id,
        values: o.values,          // <-- keep the values here
        
      }))
    )
  }

  // 4) Attach images (array of URLs or objects)
  if (images?.length) {
    // normalize to [{ url, rank?, metadata? }]
    const normalized = images.map((img: any, i: number) =>
      typeof img === "string"
        ? { url: img, rank: i }        // keep order as rank
        : { url: img.url, rank: img.rank ?? i, metadata: img.metadata }
    )

    await productModule.createProductImages(
      normalized.map((img) => ({
        product_id: product.id,
        url: img.url,
        rank: img.rank,
        metadata: img.metadata,
      }))
    )
  }
  
  // 3) Prepare variants
  const prepared = variants.map((v: any) => {
    /*const hasStorePrice = (v.prices ?? []).some(
      (p: any) => (p.currency_code ?? "").toLowerCase() === DEFAULT_CURRENCY
    )
    if (!hasStorePrice) {
      throw new Error(`Variant "${v.title}" needs a price in ${DEFAULT_CURRENCY}`)
    }*/

    const hasStorePrice = v.prices.some(
      (p: any) => (p.currency_code ?? "").toLowerCase() === DEFAULT_CURRENCY
    )

    if (!hasStorePrice) {
      // inject a default standard price
      v.prices.push({
        currency_code: "eur",
        amount: 299,
      })
    }

    console.log("Prepared variant price:", v.prices);
    return {
      title: v.title,
      sku: v.sku,
      manage_inventory: v.manage_inventory ?? false,  // avoid out-of-stock hiding
      prices: v.prices,
      // 👇 IMPORTANT: pass the options **as an object map**, e.g. { Size: "Default" }
      options: v.options ?? {},
      product_id: product.id,
    }
  })

  const { result } = await createProductVariantsWorkflow(req.scope).run({
    input: { product_variants: prepared },
  })

  console.log("Created variants with prices:", result)
  res.status(201).json({ product_id: product.id, status: "published", sales_channel_id: def.id })
}

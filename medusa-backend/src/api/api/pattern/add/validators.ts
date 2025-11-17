import { z } from "zod"

export const PostApiPatternAddSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  handle: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  // default to published in the handler; allow override if sent
  status: z.enum(["draft", "published"]).optional(),

  // at least one option so variants can bind to it
  options: z.array(z.object({
    title: z.string(),
    values: z.array(z.string()).min(1),
  })).min(1),

  // require at least one variant, each with at least one price
  variants: z.array(z.object({
    title: z.string(),
    sku: z.string().optional(),
    manage_inventory: z.boolean().optional(),
    prices: z.array(z.object({
      currency_code: z.string().length(3),      // e.g. "usd" / "eur"
      amount: z.number().int().positive(),      // minor units (1999 = 19.99)
    })).min(1),
    // map of option TITLE -> value (we’ll resolve titles to option_ids server-side)
    options: z.record(z.string(), z.string()).optional(),
  })).min(1),
})

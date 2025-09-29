import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  // TODO: your create logic here
  console.log("req.body:", req.body)
  res.status(200).json({ ok: true, path: req.path })
}

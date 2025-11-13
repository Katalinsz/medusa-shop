import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { generatePdfCustomerWorkflow } from "../../../workflows/generate-motif-pdf-customer";
import { z } from "zod";

import { PostStorePdfSchema } from "./validators";

type PostStorePdfReq = z.infer<typeof PostStorePdfSchema>;

export async function POST(
  req: AuthenticatedMedusaRequest<PostStorePdfReq>,

  res: MedusaResponse
) {
  let motifData;
  try {
    const response = await fetch(
      `https://motif.knittedforyou.com/img/Motif/${req.body.motifId}.json`
    );

    if (!response.ok) {
      return res.status(404).send("Motif not found");
    }

    motifData = await response.json();
  } catch (error) {
    return res.status(404).send("Motif not found");
  }

  const {
    result: { pdfBuffer },
  } = await generatePdfCustomerWorkflow(req.scope).run({
    input: {
      motifData: motifData,
      motifOwnerName: req.body.motifOwnerName,
      motifName: req.body.motifName,
    },
  });

  const buffer = Buffer.from(pdfBuffer);

  res.set({
    "Content-Type": "application/pdf",

    "Content-Disposition": `inline; filename="motif-document.pdf"`,

    "Content-Length": buffer.length,
  });

  res.send(buffer);
}

import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

import { generateMotifPdfCustomerStep } from "./steps/generate-motif-pdf-customer";

type MotifData = {
  width: number;
  height: number;
  colors: string[];
  rows: { index: number; pixels: { color: number | false; count: number }[] }[];
};
type GeneratePdfWorkflowInput = {
  motifData: MotifData;
  motifOwnerName: string;
  motifName: string;
};

export const generatePdfCustomerWorkflow = createWorkflow(
  "generate-pdf-customer",
  function (input: GeneratePdfWorkflowInput) {
    const pdfBuffer = generateMotifPdfCustomerStep(input);
    return new WorkflowResponse({ pdfBuffer: pdfBuffer.buffer });
  }
);

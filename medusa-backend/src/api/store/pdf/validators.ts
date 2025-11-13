import { z } from "zod";

export const PostStorePdfSchema = z.object({
  motifId: z.string(),
  motifOwnerName: z.string(),
  motifName: z.string(),
});

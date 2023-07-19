import { z } from 'zod';

export const UpdateRequestBodySchema = z.object({
  title: z.string(),
  body: z.string(),
  productId: z.string(),
  status: z.enum(["IN_PROGRESS", "SHIPPED","DEPRECATED"]).optional(),
  version: z.string().optional()
});

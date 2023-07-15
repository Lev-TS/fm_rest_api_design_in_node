import { z } from 'zod';

export const ProductRequestBodySchema = z.object({
  name: z.string().min(1),
});

import { z } from 'zod';

export const UpdateRequestBodySchema = z.object({
  title: z.string(),
});

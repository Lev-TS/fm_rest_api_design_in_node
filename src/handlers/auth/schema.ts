import { z } from 'zod';

export const AuthRequestBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

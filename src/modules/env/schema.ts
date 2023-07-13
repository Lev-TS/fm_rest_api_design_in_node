import { z } from "zod";

export const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  JTW_SECRET: z.string(),
  PORT: z.number(),
});

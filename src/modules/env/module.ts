import dotenv from "dotenv";

import { EnvSchema } from "./schema";

dotenv.config();

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT && Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  JTW_SECRET: process.env.JTW_SECRET,
});

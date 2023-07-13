import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export const JwtPayloadSchema = UserSchema.or(z.string());

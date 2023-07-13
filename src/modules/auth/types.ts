import { Request } from "express";
import { z } from "zod";

import { UserSchema } from "./schema";

export type User = z.infer<typeof UserSchema>;

export interface ProtectedRouteRequest extends Request {
  user: z.infer<typeof UserSchema>;
}

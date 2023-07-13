import { Request } from 'express';
import { z } from 'zod';

export interface JWTUserPayload {
  id: string;
  username: string;
}

export interface ProtectedRouteRequest extends Request {
  user: JWTUserPayload;
}

import { raiseKnownError } from '@/lib';
import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (req, _, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(raiseKnownError('INVALID_BODY'));
    }

    next();
  };

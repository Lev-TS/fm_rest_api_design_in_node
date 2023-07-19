import { env } from '@/env/module';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const handleError: ErrorRequestHandler = (error, _, res, next) => {
  if (!error) {
    return next();
  }

  if (error.isKnown) {
    env.NODE_ENV === 'development' && console.warn('📣', '\x1b[31m', `Error: ${error.body.message}`);
    return res.status(error.body.status).json({ message: error.body.message });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    // TODO: handle prisma errors
  }

  if (error instanceof ZodError) {
    // TODO: Handle zod errors
  }

  console.error('🧨', '\x1b[31m', `Error: ${JSON.stringify(error)}`);

  res.status(500).json({ message: 'Internal server error' });
};

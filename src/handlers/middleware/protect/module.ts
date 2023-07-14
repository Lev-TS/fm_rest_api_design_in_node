import { type RequestHandler } from 'express';

import { raiseKnownError, verifyJWT } from '@/lib';

import type { ProtectedRouteRequest } from './types';

export const protect: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    next(raiseKnownError('MISSING_TOKEN'));
    return;
  }

  try {
    const payload = verifyJWT(token);

    if (typeof payload === 'string' || typeof payload?.username !== 'string' || typeof payload?.id !== 'string') {
      return next(raiseKnownError('INVALID_TOKEN'));
    }

    (req as ProtectedRouteRequest).user = { id: payload.id, username: payload.username };

    next();
  } catch (error) {
    next(raiseKnownError('INVALID_TOKEN'));
  }
};

export { type ProtectedRouteRequest };

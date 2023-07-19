import { type RequestHandler } from 'express';

import { raiseKnownError, verifyJWT } from '@/lib';

export const protect: RequestHandler = (req, _, next) => {
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

    req.protectedRouteContext = { ...req.protectedRouteContext, user: { id: payload.id, username: payload.username } };

    next();
  } catch (error) {
    next(raiseKnownError('INVALID_TOKEN'));
  }
};
